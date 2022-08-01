import Arweave from 'arweave';
import {
  buildLayers,
  Chunk,
  chunkData,
  //generateLeaves,
  
  generateProofs,
  MAX_CHUNK_SIZE,
  MIN_CHUNK_SIZE,
  intToBuffer,
} from 'arweave/node/lib/merkle';
import Transaction from 'arweave/node/lib/transaction';

/**
 * Generates the Arweave transaction chunk information from the piped data stream.
 */
export async function generateTransactionChunksAsync(source) {
  
  
  console.log(source, 'source');
  
  //const something = await chunkData(source)
  //console.log("source: ", source);
  //return async (source: AsyncIterable<Buffer>): Promise<NonNullable<Transaction['chunks']>> => {
  const chunks: Chunk[] = [];

  /**
   * @param chunkByteIndex the index the start of the specified chunk is located at within its original data stream.
   */


  async  function addChunk(chunkByteIndex: number, chunk) {
    const buffer = new ArrayBuffer(chunk);
    const view = new Uint8Array(buffer);
        view[chunkByteIndex] = chunk;
    //console.log(view, 'view');
    const dataHash = await Arweave.crypto.hash(view);
    const chunkRep = {
      dataHash,
      minByteRange: chunk.bytesLoaded - chunk.byteLength,
      maxByteRange: chunk.bytesLoaded,
    };
    chunks.push(chunkRep);
    //console.log(chunkRep, 'chunkRep');
    return chunkRep;
  }

  let chunkStreamByteIndex = 0;
  let previousDataChunk: Buffer | undefined;
  let expectChunkGenerationCompleted = false;

  async function generate(chunkedSource: AsyncIterable<Buffer>) {
    console.log("chunk", chunkedSource)
    for await (const chunk of chunkedSource) {
      addChunk(chunkStreamByteIndex, chunk);
      const buffer2 = new ArrayBuffer(32);
      const view2 = new Uint8Array(buffer2);
      view2[0] = source[0];
  
      const dataHash2 = await Arweave.crypto.hash(view2);
      //console.log(chunk)
      let mockChunks = {
        dataHash: dataHash2,
        minByteRange: chunk.byteLength,
        maxByteRange: chunk.byteLength,
      };

      console.log("mockChunks: ", chunks);
      //chunks.push(mockChunks);

      // if (expectChunkGenerationCompleted) {
      //   throw Error('Expected chunk generation to have completed.');
      // }
      // if (chunk.byteLength >= MIN_CHUNK_SIZE && chunk.byteLength <= MAX_CHUNK_SIZE) {
      //   await addChunk(chunkStreamByteIndex, chunk);
      // }
      // else if (chunk.byteLength < MIN_CHUNK_SIZE) {
      //   if (previousDataChunk) {
      //     // If this final chunk is smaller than the minimum chunk size, rebalance this final chunk and
      //     // the previous chunk to keep the final chunk size above the minimum threshold.
      //     console.log(chunk,"-------------------------------", previousDataChunk);
      //     await addChunk(chunkStreamByteIndex, chunk);
      //     console.log("final chunk", chunk)
      //   expectChunkGenerationCompleted = true;

      //   }
      //   else {
      //     // This entire stream should be smaller than the minimum chunk size, just add the chunk in.
      //     console.log("the end")
      //   }
      //   console.log("space")
      //   expectChunkGenerationCompleted = true;
      // }
      // else if (chunk.byteLength > MAX_CHUNK_SIZE) {
      //   throw Error('Encountered chunk larger than max chunk size.');
      // }
      // else {
      //   console.log("ddChunk(chunk")
      //   await addChunk(chunkStreamByteIndex, chunk);
      // }
      console.log("somewhere")
      chunkStreamByteIndex ++;
      previousDataChunk = chunk;
    }
  }

  //generate(source);
  // for await (const chunk of source) {
  //   console.log("chunk: ", chunk)
  //   addChunk(chunkStreamByteIndex, chunk);
  //   chunkStreamByteIndex ++;
  //   previousDataChunk = chunk;
  // }



  const buffer2 = new ArrayBuffer(32);
  const view2 = new Uint8Array(buffer2);
  view2[0] = source[0];
  
  const dataHash2 = await Arweave.crypto.hash(view2);
  let mockChunks = {
    dataHash: dataHash2,
    minByteRange: 0,
    maxByteRange: 200000,
  }

  console.log("mockChunks: ", chunks);
  //chunks.push(mockChunks);
  
  await generate(source);
  console.log("genLeaveChunks",chunks)

  async function generateLeaves(chunks){
     return chunks.map(
        async ({ dataHash, minByteRange, maxByteRange }) => {
          return {
           type: "leaf",
            id: await Arweave.crypto.hash(dataHash),
            dataHash: dataHash,
            minByteRange,
            maxByteRange,
          };
        }
      )
  }

  console.log(chunks, "chunksLast");
 
  const leaves = await generateLeaves(chunks)
  console.log(await leaves, "leaves");
  const root =  await buildLayers(leaves);
  const proofs = generateProofs(root);
  console.log("proofs:", proofs,"root.id",root.id);
  return {
    data_root: root.id,
    chunks,
    proofs,
  };
  //console.log(proofs)
  //return null
}


// function sendMessage(chunk, writableStream) {
//   // defaultWriter is of type WritableStreamDefaultWriter
//   const defaultWriter = writableStream.getWriter();
//   const encoder = new TextEncoder();
//   console.log("current source: ", source)

//   defaultWriter.ready
//     .then(() => {
//       return defaultWriter.write(chunk);
//     })
//     .then(() => {
//       console.log("Chunk written to sink.", chunk);
//     })
//     .catch((err) => {
//       console.log("Chunk error:", err);
//     });
//   // Call ready again to ensure that all chunks are written
//   //   before closing the writer.
//   defaultWriter.ready
//     .then(() => {
//       defaultWriter.close();
//     })
//     .then(() => {
//       console.log("All chunks written");
//     })
//     .catch((err) => {
//       console.log("Stream error:", err);
//     });
// }

// const decoder = new TextDecoder("utf-8");
//   const queuingStrategy = new CountQueuingStrategy({ highWaterMark: 1 });
//   let result = "";
  
//   const writableStream = new WritableStream({
//     // Implement the sink
//     write(chunk) {
//       return new Promise((resolve, reject) => {

//         //const view = new DataView(buffer);
//         //console.log(view);
//         //const view = new Uint8Array(buffer);
//         //view[0] = chunk;
//         addChunk(chunkStreamByteIndex, chunk)
//         console.log("chunk added?")

//         //const decoded = decoder.decode(view);
//         // const listItem = document.createElement('li');
//         //listItem.textContent = "Chunk decoded: " + decoded;
//         //list.appendChild(listItem);
//         //console.log(decoded);
//         //result += decoded;
//         //resolve();
//       });
//     },
//     close() {
//       const listItem = document.createElement('li');
//       listItem.textContent = "[MESSAGE RECEIVED] " + result;
//       //list.appendChild(listItem);
//     },
//     abort(err) {
//       console.log("Sink error:", err);
//     }
//   }, queuingStrategy);