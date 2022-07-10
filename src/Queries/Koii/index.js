



//Koii standard
// { name: "Contract-Src", values: ["I8xgq3361qpR8_DvqcGpkCYAUTMktyAgvkm6kGhJzEQ"]}

//Koii atomic
// { name: "Contract-Src", values: ["r_ibeOTHJW8McJvivPJjHxjMwkYfAKRjs-LjAeaBcLc"]}

//Koii unknown
// { name: "Contract-Src", values: ["14l2t0DtenMRKPasR6Xi3pmQm3rqopD4cUr6Q5oD8lc"]}



export function koiiCollectiblePer(address) {
    return {
      query: `query {
    transactions(
    owners: ["${address}"]
      tags: [
          { name: "Network", values: ["Koi", "Koii"]},
          { name: "Content-Type", values: ["image/png", "image/jpeg"]},
          { name: "Contract-Src", values: ["r_ibeOTHJW8McJvivPJjHxjMwkYfAKRjs-LjAeaBcLc"]}
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