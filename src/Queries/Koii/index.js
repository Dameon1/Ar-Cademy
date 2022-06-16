export function koiiCollectiblePer(address) {
    return {
      query: `query {
    transactions(
    owners: ["${address}"]
      tags: [
          { name: "Network", values: ["Koi", "Koii"]},
          { name: "Content-Type", values: ["image/png", "image/jpeg"]},
          { name: "Contract-Src", values: ["I8xgq3361qpR8_DvqcGpkCYAUTMktyAgvkm6kGhJzEQ", "r_ibeOTHJW8McJvivPJjHxjMwkYfAKRjs-LjAeaBcLc", "14l2t0DtenMRKPasR6Xi3pmQm3rqopD4cUr6Q5oD8lc"]}
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