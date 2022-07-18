import Arweave from 'arweave';
import {
  buildLayers,
  Chunk,
  generateLeaves,
  generateProofs,
  MAX_CHUNK_SIZE,
  MIN_CHUNK_SIZE,
} from 'arweave/node/lib/merkle';
import Transaction from 'arweave/node/lib/transaction';
import chunker from 'stream-chunker';

/**
 * Generates the Arweave transaction chunk information from the piped data stream.
 */
export async function generateTransactionChunksAsync(source) {
  //let chunked = chunker(MAX_CHUNK_SIZE, { flush: true })(source);
  console.log("Generating transaction chunks...", MIN_CHUNK_SIZE);
  //console.log("source: ", source);
  //return async (source: AsyncIterable<Buffer>): Promise<NonNullable<Transaction['chunks']>> => {
  const chunks: Chunk[] = [];

  /**
   * @param chunkByteIndex the index the start of the specified chunk is located at within its original data stream.
   */
  async function addChunk(chunkByteIndex: number, chunk): Promise<Chunk> {
    //let buffChunk = Buffer.from(chunk)
    const buffer = new ArrayBuffer(chunk);
    const view = new Uint8Array(chunk);
        //view[0] = chunk;

    const dataHash = await Arweave.crypto.hash(view);
    const chunkRep = {
      dataHash,
      minByteRange: chunk.bytesLoaded - chunk.byteLength,
      maxByteRange: chunk.bytesLoaded,
    };
    chunks.push(chunkRep);
    console.log("chunkRep: ", chunkRep);
    return chunkRep;
  }

  let chunkStreamByteIndex = 0;
  let previousDataChunk: Buffer | undefined;
  let expectChunkGenerationCompleted = false;


  async function generate(chunkedSource: AsyncIterable<Buffer>) {
    console.log("chunk", chunkedSource)
    for await (const chunk of chunkedSource) {
      if (expectChunkGenerationCompleted) {
        throw Error('Expected chunk generation to have completed.');
      }
      if (chunk.byteLength >= MIN_CHUNK_SIZE && chunk.byteLength <= MAX_CHUNK_SIZE) {
        console.log("chunk.byteLength >= MIN_CHUNK_SIZE && chunk.byteLength <= MAX_CHUNK_SIZE", chunk)
        await addChunk(chunkStreamByteIndex, chunk);
      }
      else if (chunk.byteLength < MIN_CHUNK_SIZE) {
        if (previousDataChunk) {
          // If this final chunk is smaller than the minimum chunk size, rebalance this final chunk and
          // the previous chunk to keep the final chunk size above the minimum threshold.
          console.log(chunk,"-------------------------------", previousDataChunk);
          await addChunk(chunkStreamByteIndex, chunk);
          console.log("final chunk", chunk)
          // const remainingBytes = Buffer.concat(
          //   [previousDataChunk, chunk],
          //   previousDataChunk.byteLength + chunk.byteLength,
          // );
          // const rebalancedSizeForPreviousChunk = Math.ceil(remainingBytes.byteLength / 2);
          // const previousChunk = chunks.pop()!;
          // const rebalancedPreviousChunk = await addChunk(
          //   previousChunk.minByteRange,
          //   remainingBytes.slice(0, rebalancedSizeForPreviousChunk),
          // );
          // await addChunk(
          //   rebalancedPreviousChunk.maxByteRange,
          //   remainingBytes.slice(rebalancedSizeForPreviousChunk),
          // );
        expectChunkGenerationCompleted = true;

        }
        else {
          // This entire stream should be smaller than the minimum chunk size, just add the chunk in.
          console.log("the end")
        }
        console.log("space")
        expectChunkGenerationCompleted = true;
      }
      else if (chunk.byteLength > MAX_CHUNK_SIZE) {
        throw Error('Encountered chunk larger than max chunk size.');
      }
      else {
        console.log("ddChunk(chunk")
        await addChunk(chunkStreamByteIndex, chunk);
      }
      console.log("somewhere")
      chunkStreamByteIndex += chunk.byteLength;
      previousDataChunk = chunk;
    }
  }
  
  //------------------------------------
  await generate(source);

  const decoder = new TextDecoder("utf-8");
  const queuingStrategy = new CountQueuingStrategy({ highWaterMark: 1 });
  let result = "";
  
  const writableStream = new WritableStream({
    // Implement the sink
    write(chunk) {
      return new Promise((resolve, reject) => {

        //const view = new DataView(buffer);
        //console.log(view);
        //const view = new Uint8Array(buffer);
        //view[0] = chunk;
        addChunk(chunkStreamByteIndex, chunk)
        console.log("chunk added?")

        //const decoded = decoder.decode(view);
        // const listItem = document.createElement('li');
        //listItem.textContent = "Chunk decoded: " + decoded;
        //list.appendChild(listItem);
        //console.log(decoded);
        //result += decoded;
        //resolve();
      });
    },
    close() {
      const listItem = document.createElement('li');
      listItem.textContent = "[MESSAGE RECEIVED] " + result;
      //list.appendChild(listItem);
    },
    abort(err) {
      console.log("Sink error:", err);
    }
  }, queuingStrategy);

  function sendMessage(chunk, writableStream) {
    // defaultWriter is of type WritableStreamDefaultWriter
    const defaultWriter = writableStream.getWriter();
    const encoder = new TextEncoder();
    console.log("current source: ", source)

    defaultWriter.ready
      .then(() => {
        return defaultWriter.write(chunk);
      })
      .then(() => {
        console.log("Chunk written to sink.", chunk);
      })
      .catch((err) => {
        console.log("Chunk error:", err);
      });
    // Call ready again to ensure that all chunks are written
    //   before closing the writer.
    defaultWriter.ready
      .then(() => {
        defaultWriter.close();
      })
      .then(() => {
        console.log("All chunks written");
      })
      .catch((err) => {
        console.log("Stream error:", err);
      });
  }

  console.log("message sent")
  //await generate(source);
  console.log("chunks1", chunks)

  const buffer2 = new ArrayBuffer(source[0]);
  const view2 = new Uint8Array(buffer2);
      view2[0] = source[0];

  const dataHash2 = await Arweave.crypto.hash(view2);
  //);
  let mockChunks = {
    dataHash: dataHash2,
    minByteRange: 0,
    maxByteRange: 0,
    type: "leaf",
    id: dataHash2
  }
  console.log("chunks2", mockChunks)
  //chunks.push(mockChunks)

  console.log(source[0])
 // await addChunk(chunkStreamByteIndex, mockChunks)
  //console.log(something)
  console.log("chunks",chunks)
  //sendMessage(source, writableStream);

  

  // 
   const leaves = await generateLeaves(chunks);
    console.log("leaves", leaves)
  const root = await buildLayers(leaves);
  const proofs = generateProofs(root);
  //console.log(leaves, root, proofs)

  return {
    data_root: root.id,
    chunks,
    proofs,
  };
  //return null
}
