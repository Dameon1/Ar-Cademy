  
  //basic query to get all videos
  export function query() {
    return `
    query {
        transactions(first: 5, tags: [
            { name: "Platform-Uploader", values: "Arcademy-Test1" },
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
        console.log("data",data.transactions.edges)
        return data;
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
    
