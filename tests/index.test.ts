import Arweave from 'arweave';
import { CreateTransactionInterface } from 'arweave/node/common';
import { JWKInterface } from 'arweave/node/lib/wallet';
import { createReadStream } from 'fs';
import { readFile } from 'fs/promises';
// @ts-ignore
import { Readable } from 'stream';
import { pipeline } from 'stream/promises';
import { createTransactionAsync } from '../src/utils/uploadTransactions/create-transaction-async';
import { generateTransactionChunksAsync } from '../src/utils/uploadTransactions/generate-transaction-chunks-async';
import { uploadTransactionAsync } from '../src/utils/uploadTransactions/upload-transaction-async';

describe('createTransactionAsync', () => {
  let wallet: JWKInterface;

  beforeAll(async () => {
    wallet = await arweave.wallets.generate();
  });

  const arweave = new Arweave({
    host: 'arweave.net',
    protocol: 'https',
    port: 443,
    logging: false,
    timeout: 15000,
  });

  it('should create transactions that match arweave-js', async () => {
    const filePath = './package-lock.json';
    const fileStream = createReadStream(filePath);

    const txAttrs = <Partial<CreateTransactionInterface>>{
      last_tx: 'MOCK_TX_ID',
      reward: '1',
    };

    // These test are remade for pre chunking from the client side.

    const tx = await  createTransactionAsync(txAttrs, wallet);

    const nativeTx = await arweave.createTransaction({ ...txAttrs, data: await readFile(filePath) }, wallet);

    await arweave.transactions.sign(tx, wallet);
    await arweave.transactions.sign(nativeTx, wallet);

    // Reset the data field from the `arweave-js` transaction as streamed transactions will not have this field.
    nativeTx.data = new Uint8Array(0);

    expect(tx).toMatchObject(nativeTx);
  });
});

describe('uploadTransactionAsync', () => {
  const arweave = new Arweave({
    host: 'arweave.net',
    protocol: 'https',
    port: 443,
    logging: false,
    timeout: 15000,
  });

  it('should successfully seed existing large transaction', async () => {
    jest.setTimeout(120 * 1000);

    const existingTxId = '<EXISTING-TX-ID>';
    const txDataFilePath = './Big-File.zip';

    const tx = await arweave.transactions.get(existingTxId);

    const txDataStreamForChunks = createReadStream(txDataFilePath);
    tx.chunks = await generateTransactionChunksAsync(txDataStreamForChunks);

    const txDataStreamForUpload = createReadStream(txDataFilePath);
    const uploadOp = pipeline(txDataStreamForUpload, uploadTransactionAsync(tx, arweave, false));

    await expect(uploadOp).resolves.not.toThrow();
  });
});

