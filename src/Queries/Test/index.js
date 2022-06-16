export function arweaveSavePer(address) {
    return {
      query: `query {
    transactions(
    owners: ["${address}"]
      tags: [
          { name: "User-Agent", values: "ArweaveChrome/2.3.1"},
          ]
      first: 30
    ) {
      edges {
        node {
          id
          owner { address }
          tags { name value }
          block { timestamp }
        }
      }
    }
  }`,
    };
  }