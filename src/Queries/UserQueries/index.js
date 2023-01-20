import {
  buildQuery,
  arweave,
  createPostInfo,
  tagSelectOptions,
  contentTypeSelectOptions,
} from "../../utils";
import {} from "ramda";
import {
  reject,
  concat,
  sortWith,
  descend,
  prop,
  takeLast,
  take,
  compose,
  propEq,
  find,
  map,
  pluck,
  path,
  reduce,
  values,
  filter,
} from "ramda";

export async function videosByOwner(addr, type) {
  console.log("addr: ", addr, type);
  let images = await fetch("https://arweave.net/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
  query {
    transactions(first: 100, 
      owners: ["${addr}"], 
      tags: [
        {name: "Type", values: ["${type}"]}
        { name: "App-Name", values: "SmartWeaveContract" },
        {name:"Platform-Uploader",values:"Arcademy-Test3"}
        { name: "Content-Type", values: "application/x.arweave-manifest+json" }
      ]) 
      {
      edges {
        node {
          id
          tags {
            name
            value
          }
          owner {
            address
          }
          block {
            timestamp
          }
        }
      }
    }
  }    
      `,
    }),
  })
    .then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(new Error("ERROR: STATUS " + res.status))
    )
    .then((res) => {
      console.log("res", res);
      return res;
    })
    .then(
      compose(
        map(transformTx),
        pluck("node"),
        path(["data", "transactions", "edges"])
      )
    );
  console.log("images", images);
  return await images;
}

//funtion to search for videos
export async function getUserVideos(addr, type, filtertag) {
  return Promise.all([videosByOwner(addr, type, filtertag)])
    .then((results) => results)
    .then(sortWith([descend(prop("timestamp"))]));
}

//
function transformTx(node) {
  return {
    id: node.id,
    title: prop("value", find(propEq("name", "Title"), node.tags)),
    type: prop("value", find(propEq("name", "Type"), node.tags)),
    videoImageId: prop(
      "value",
      find(propEq("name", "Video-Image-Id"), node.tags)
    ),
    description: prop("value", find(propEq("name", "Description"), node.tags)),
    owner: node.owner.address,
    timestamp: node?.block?.timestamp || Date.now() / 1000,
  };
}
