// Description: This function is used to fetch all the user content from the ARK API, Uploads, and Arcademy
import { Authors } from "../Authors";
import { Videos } from "../Videos";
import { getUserVideos } from "../Queries/UserQueries";

async function retryFetch(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    console.log("retrying fetch");
    return retryFetch(url);
  }
}

async function getArcademyVideos(addr) {
  let videoIds;
  let videoObjects;
  if (Authors[addr] !== undefined) {
    videoIds = Authors[addr].createdVideosByID;
  } else {
    videoIds = [];
  }
  if (videoIds.length > 0) {
    videoObjects = videoIds.map((id) => Videos[id]);
  } else {
    videoObjects = [];
  }
  return videoObjects;
}

export default async function getAllUserContent(addr) {
  let user = {};
  let ARCADEMY_VIDEOS = await getArcademyVideos(addr);
  let UPLOADED_VIDEOS = await getUserVideos(addr, "video", "");
  let EVM = retryFetch(
    `https://ark-core.decent.land/v2/evm-nft/arweave/eth/${addr}/true`
  );
  let POLY = retryFetch(
    `https://ark-core.decent.land/v2/evm-nft/arweave/polygon/${addr}/true`
  );
  let BSC = retryFetch(
    `https://ark-core.decent.land/v2/evm-nft/arweave/bsc/${addr}/true`
  );
  let FTM = retryFetch(
    `https://ark-core.decent.land/v2/evm-nft/arweave/fantom/${addr}/true`
  );
  let AVAX = retryFetch(
    `https://ark-core.decent.land/v2/evm-nft/arweave/avalanche/${addr}/true`
  );
  let ARK = retryFetch(
    `https://ark-core.decent.land/v2/profile/arweave/${addr}`
  );
  let POAPS = retryFetch(`https://ark-core.decent.land/v2/oat/arweave/${addr}`);
  return Promise.all([
    EVM,
    POLY,
    BSC,
    FTM,
    AVAX,
    ARK,
    POAPS,
    ARCADEMY_VIDEOS,
    UPLOADED_VIDEOS,
  ]);
  // .then((res) => {
  //   console.log("res", res);
  //   user.EVM = res[0];
  //   user.POLY = res[1];
  //   user.BSC = res[2];
  //   user.FTM = res[3];
  //   user.AVAX = res[4];
  //   user.ARK = res[5].res;
  //   user.POAPS = res[6].POAPS;
  //   user.ARCADEMY_VIDEOS = res[7];
  //   user.UPLOADED_VIDEOS = UPLOADED_VIDEOS;
  //   console.log("Setting ARCADEMY_VIDEOS", user.ARCADEMY_VIDEOS);
  //   console.log("Setting UPLOADED_VIDEOS", user.UPLOADED_VIDEOS);
  //   console.log("setting EVM data", user.EVM);
  //   console.log("setting POLY data", user.POLY);
  //   console.log("setting BSC data", user.BSC);
  //   console.log("setting FTM data", user.FTM);
  //   console.log("setting AVAX data", user.AVAX);
  //   console.log("setting ARWEAVE data", user.ARK);
  //   console.log("setting POAPS data", user.POAPS);
  //   return user;
  // })
  // .then((user) => {
  //   console.log("user111111", user);
  //   return user;
  // })
  // .catch((err) => {
  //   console.log("error", err);
  // });
}
