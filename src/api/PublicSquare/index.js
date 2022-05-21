const fs = require('fs')
const Arweave = require('arweave/node')
const argv = require('yargs').argv

const arweave = Arweave.init({
  host: argv.arweaveHost ? argv.arweaveHost : 'arweave.net',
  port: argv.arweavePort ? argv.arweavePort : 443,
  protocol: argv.arweaveProtocol ? argv.arweaveProtocol : 'https'
})

async function post(msg) {
  let tx = await arweave.createTransaction({ data: msg }, wallet)

  tx.addTag('App-Name', 'Arcademy')
  tx.addTag('Content-Type', 'video/mp4')
  tx.addTag('Version', '1')
  tx.addTag('Type', 'post')

  await arweave.transactions.sign(tx, wallet)

  const response = await arweave.transactions.post(tx)

  console.log(tx)

  console.log("Transaction submission response: " + response.status)

}

if (!argv.walletFile) {
  console.log("ERROR: Please specify a wallet file to load using argument " +
    "'--wallet-file <PATH>'.")
  process.exit()
}

const raw_wallet = fs.readFileSync(argv.walletFile)
const wallet = JSON.parse(raw_wallet)

if (!argv.message) {
  console.log("Please specify a post body with --message 'Your body post.'")
}

post(argv.message)