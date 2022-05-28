import Account from 'arweave-account';



const opts = {
  cacheIsActivated: true,
  cacheSize: 100,
  cacheTime: 60
};

const account = new Account(opts);

let ArweaveAccount = async (type, string) => {
  let user;

  switch (type) {
    case 'get':
      user = await account.get("aIUmY9Iy4qoW3HOikTy6aJww-mM4Y-CUJ7mXoPdzdog");
      break;
    case 'search':
      user = await account.search(string);
      break;
    case 'find':
      user = await account.find(string);
      break;
    default:
      console.log(`Not a supported ${type}.`);
  }
  console.log(user)
  return user;
}


export default ArweaveAccount;