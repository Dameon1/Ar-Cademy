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
  
  //return async (source: AsyncIterable<Buffer>): Promise<NonNullable<Transaction['chunks']>> => {
  const chunks: Chunk[] = [];

  /**
   * @param chunkByteIndex the index the start of the specified chunk is located at within its original data stream.
   */

  async  function addChunk(chunkByteIndex: number, chunk) {
    const buffer = new ArrayBuffer(chunk);
    const view = new Uint8Array(buffer);
        view[chunkByteIndex] = chunk;
    const dataHash = await Arweave.crypto.hash(view);
    const chunkRep = {
      dataHash,
      minByteRange: chunk.bytesLoaded - chunk.byteLength,
      maxByteRange: chunk.bytesLoaded,
    };
    chunks.push(chunkRep);
    return chunkRep;
  }

  let chunkStreamByteIndex = 0;
  let previousDataChunk: Buffer | undefined;
  let expectChunkGenerationCompleted = false;

  // async function generate(chunkedSource: AsyncIterable<Buffer>) {
  //   console.log("chunk", chunkedSource)
  //   for await (const chunk of chunkedSource) {
  //     addChunk(chunkStreamByteIndex, chunk);
  //     const buffer2 = new ArrayBuffer(32);
  //     const view2 = new Uint8Array(buffer2);
  //     view2[0] = source[0];
  
  //     const dataHash2 = await Arweave.crypto.hash(view2);
  //     let mockChunks2 = {
  //       dataHash: dataHash2,
  //       minByteRange: chunk.byteLength,
  //       maxByteRange: chunk.byteLength,
  //     };

  //     console.log("mockChunks: ", chunks);
  //     console.log("somewhere")
  //     chunkStreamByteIndex ++;
  //     previousDataChunk = chunk;
  //   }
  // }

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
  chunks.push(mockChunks);

  async function generateLeaves(chunks){
    //addChunk(chunkStreamByteIndex,mockChunks)
    return chunks.map(
        async ( chunk ) => {
          console.log(chunk)
          console.log("minByteRange: ", chunk.minByteRange)
          console.log("maxByteRange: ", chunk.maxByteRange)
          return {
          type: "leaf",
            id: await Arweave.crypto.hash(chunk.dataHash),
            dataHash: chunk.dataHash,
            minByteRange: chunk.minByteRange,
            maxByteRange: chunk.maxByteRange,
          };
        }
      )
  }
  
 
  const leaves = await generateLeaves(chunks)
  const root =  await buildLayers(leaves);
  const proofs = generateProofs(root);
  return  {
    data_root: root.id,
    chunks,
    proofs,
  };
}