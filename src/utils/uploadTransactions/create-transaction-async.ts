import Arweave from 'arweave';
import { CreateTransactionInterface } from 'arweave/node/common';
import Transaction, { TransactionInterface } from 'arweave/node/lib/transaction';
import { bufferTob64Url } from 'arweave/node/lib/utils';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { pipeline } from 'stream/promises';
import { generateTransactionChunksAsync } from './generate-transaction-chunks-async';

import { arweave } from '../api';

/**
 * Creates an Arweave transaction from the piped data stream.
 */
export async function createTransactionAsync(
  attributes,
  jwk,
) {
    //const chunks = await pipeline(source, generateTransactionChunksAsync());
    const chunks = await generateTransactionChunksAsync(attributes); 
    const txAttrs = Object.assign({}, attributes);
     txAttrs.owner ??= jwk?.n;
     txAttrs.last_tx ??= await arweave.transactions.getTransactionAnchor();

     const lastChunk = attributes[attributes.length - 1];
     const dataByteLength = lastChunk.maxByteRange;
     txAttrs.reward ??= await arweave.transactions.getPrice(dataByteLength, txAttrs.target);
     let ar =  arweave.ar.winstonToAr(txAttrs.reward)
     txAttrs.data_size = dataByteLength.toString();

     const tx = new Transaction(txAttrs as TransactionInterface);

     tx.chunks = chunks;
     tx.data_root = bufferTob64Url(chunks.data_root);
     console.log("tx:",tx)
     return tx;
  };
