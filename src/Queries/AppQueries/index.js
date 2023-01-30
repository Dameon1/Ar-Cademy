import {
  take,
  compose,
  prop,
  propEq,
  find,
  map,
  pluck,
  path,
  reduce,
  values,
  filter,
} from "ramda";



//function to return the data on all uploads from sequencer in a format we can use
function transformTx(node) {
  return {
    //id: node.id,
    title: prop("value", find(propEq("name", "Title"), node.tags)),
    //topic: prop("value", find(propEq("name", "Topic"), node.tags)),
    videoImageId: prop(
      "value",
      find(propEq("name", "Video-Image-Id"), node.tags)
    ),
    videoId: prop("value", find(propEq("name", "Video-Id"), node.tags)),
    // description: prop("value", find(propEq("name", "Description"), node.tags)),
    owner: prop(
      "value",
      find(propEq("name", "Uploader-Contract-Owner"), node.tags)
    ),
    id: prop("value", find(propEq("name", "Uploader-Tx-Id"), node.tags)),
    Topic: prop("value", find(propEq("name", "Topic:"), node.tags)),
    description: prop("value", find(propEq("name", "Description"), node.tags)),
    // timestamp: node?.block?.timestamp || Date.now() / 1000,
  };
}

//function to get the data from the query for all uploads
export async function getRecentUploadData(id) {
  return fetch(`https://arweave.net/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: query() }),
  })
    .then((res) => res.json())
    .then(({ data }) => {
      return data.transactions.edges.map((x) => transformTx(x.node));
    });
}

//basic query to get all videos by sequencer upload
export function query() {
  return `
    query {
        transactions(first: 25, tags: [
            { name: "Platform-Uploader", values: "Arcademy-Test3" },
            { name: "Education", values: "true" },
            { name: "Blockchain", values: "true" },
            { name: "Uploader", values: "RedStone"},
            { name: "App-Name", values: "SmartWeaveContract" },
            { name: "Content-Type", values: "application/x.arweave-manifest+json" }
        ]) {
          edges {
            node {
              id
              block {
                id
                height
              }
              tags {
                name
                value
              }
            }
          }
        }
      }
      
    `;
}

//function to get the data from the query for all uploads by topic
export async function getDataByTopic(topic) {
  return fetch(`https://arweave.net/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: topicQuery(topic) }),
  })
    .then((res) => res.json())
    .then(({ data }) => {
      console.log("Topic-----------------------------", data);
      console.log(
        "Transformed Topic-----------------------------",
        data.transactions.edges.map((x) => transformTx(x.node))
      );
      return data.transactions.edges.map((x) => transformTx(x.node));
    });
}

//basic query to get topic videos by sequencer upload
export function topicQuery(topic) {
  console.log(topic, typeof topic)
  return `
    query {
        transactions(first: 25, tags: [
            { name: "Platform-Uploader", values: "Arcademy-Test3" },
            { name: "Education", values: "true" },
            { name: "Topic:", values: "${topic}" },
            { name: "Blockchain", values: "true" },
            { name: "Uploader", values: "RedStone"},
            { name: "App-Name", values: "SmartWeaveContract" },
            { name: "Content-Type", values: "application/x.arweave-manifest+json" }
        ]) {
          edges {
            node {
              id
              block {
                id
                height
              }
              tags {
                name
                value
              }
            }
          }
        }
      }
      
    `;
}