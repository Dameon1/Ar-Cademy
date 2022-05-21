
export const ArConnect = () => {
  window.addEventListener("arweaveWalletLoaded", (d) => {
    console.log(d)
  });
  const getPermission = async () => await window.arweaveWallet.connect(
    ['ACCESS_ADDRESS', "SIGN_TRANSACTION", "ACCESS_ALL_ADDRESSES", "ACCESS_PUBLIC_KEY", "SIGNATURE"])
  //const currentAddress = async() => await window.arweaveWallet.getActiveAddress();

  const currentAddress = async () => await window.arweaveWallet.getActiveAddress()

  return (
    <div className="arConnectContainer">
      <button onClick={() => getPermission()}>ArConnect</button>
      <br />
      <button onClick={() => currentAddress()}>
        LOG ADDR TO CONSOLE</button>
      <br />
      <button onClick={() => window.arweaveWallet.disconnect()}>
        Disconnect Wallet
      </button>
    </div>
  )
}


export default ArConnect;
