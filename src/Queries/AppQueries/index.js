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

  //basic query to get all videos sequencer upload
  export function query() {
    return `
    query {
        transactions(first: 5, tags: [
            { name: "Platform-Uploader", values: "Arcademy-Test3" },
            { name: "Education", values: "true" },
            { name: "Blockchain", values: "true" },
            {name: "Uploader", values: "RedStone"},
            { name: "App-Name", values: "SmartWeaveContract" },
            { name: "Content-Type", values: "application/x.arweave-manifest+json" }
            { name: "SocialId", values: "Dameon1" },
            
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

  //function to return the data on all uploads from sequencer in a format we can use
  function transformTx(node) {
    return {
      //id: node.id,
      title: prop("value", find(propEq("name", "Title"), node.tags)),
      //topic: prop("value", find(propEq("name", "Topic"), node.tags)),
      videoImageId: prop("value", find(propEq("name", "Video-Image-Id"), node.tags)),
      videoId: prop("value", find(propEq("name", "Video-Id"), node.tags)),
      // description: prop("value", find(propEq("name", "Description"), node.tags)),
      owner: prop("value", find(propEq("name", "Uploader-Contract-Owner"), node.tags)),
      id: prop("value", find(propEq("name", "Uploader-Tx-Id"), node.tags)),
      // timestamp: node?.block?.timestamp || Date.now() / 1000,
    };
  }

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
        console.log("data",data)
        console.log("data",data.transactions.edges.map(x => transformTx(x.node)))
        return data.transactions.edges.map(x => transformTx(x.node))
      }
      );
    
  }

//   export async function listAssets(count) {
//     return (
//       fetch("https://arweave.net/graphql", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           query: `
//   query {
//     transactions(first: 100, tags: [
//       {name: "Type", values: ["image"]}
//     ]) {
//       edges {
//         node {
//           id
//           tags {
//             name
//             value
//           }
//         }
//       }
//     }
//   }
//         `,
//         }),
//       })
//         .then((res) => res.json())
//         .then((res) => {
//             console.log(res.data.transactions.edges)
//             return res.data.transactions.edges
//         })
//         )
//   }  
    
