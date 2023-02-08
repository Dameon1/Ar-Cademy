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
}
