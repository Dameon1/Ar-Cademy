import Account from "arweave-account";
import { prop, propEq, find, head, split } from "ramda";

const account = new Account();

const ANS = "HrPi8hFc7M5dbrtlELfTKwPr53RRrDBgXGdDkp0h-j4";
const CACHE = "https://cache.permapages.app";

export async function getProfile(addr) {
  const res = await account.get(addr);
  return res;
}

export async function accountByANS(name) {
  return fetch(`${CACHE}/${ANS}`)
    .then((res) =>
      res.ok ? res.json() : Promise.reject("CONTRACT NOT FOUND!")
    )
    .then(prop("users"))
    .then(find(propEq("currentLabel", head(split(".", name)))))
    .then((user) => (user ? user : {}));
}

export async function getProfilePicture(id) {
  const res = await account.get(id);
  return res.profile.avatar
    // .then((res) =>
    //   res.ok ? res : Promise.reject("CONTRACT NOT FOUND!")
    // );
    // return res
  // if (res.ok) {
  //   if (res.profile.avatar !== undefined) {
  //     console.log(res);
  //     return res.profile.avatar;
  //   } else {
  //     return "1";
  //   }
  // } else {
  //   return "2";
  // }
  //console.log(newArray)
  //return newArray;

  //console.log(res)
}
