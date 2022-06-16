export function ardriveDrivesPer(address) {
    return {
      query: `query {
    transactions(
    owners: ["${address}"]
      tags: [
          { name: "App-Name", values: "ArDrive-Web"},
          { name: "Entity-Type", values: "drive"},
          { name: "Drive-Privacy", values: "public"}
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