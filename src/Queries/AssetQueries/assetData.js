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
  import { WarpFactory } from "warp-contracts/web";
  import Account from "arweave-account";
  
  const account = new Account({
    cacheIsActivated: true,
    cacheSize: 100,
    cacheTime: 60,
  });
  const warp = WarpFactory.forMainnet();

  function query(id) {
    return `
  query {
    transaction(id: "${id}") {
      id
      owner {
        address
      }
      tags {
        name
        value
      }
      block {
        timestamp
      }
    }
  }
    
    `; 
  }
export async function getAssetData(id) {
    return fetch(`https://arweave.net/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: query(id) }),
    })
      .then((res) => res.json())
      .then(({ data }) => ({
        title: prop(
          "value",
          find(propEq("name", "Title"), data.transaction.tags)
        ),
        id: prop(
          "value",
          find(propEq("name", "Video-Id"), data.transaction.tags)
        ),
        videoImage: prop(
          "value",
          find(propEq("name", "Video-Image-Id"), data.transaction.tags)
        ),
        externalLinks: prop(
          "value",
          find(propEq("name", "External-Links"), data.transaction.tags)
        ),
  
        description: prop(
          "value",
          find(propEq("name", "Description"), data.transaction.tags)
        ),
        type: prop("value", find(propEq("name", "Type"), data.transaction.tags)),
        topics: pluck(
          "value",
          filter((t) => t.name.includes("Topic:"), data.transaction.tags)
        ),
        owner: data.transaction.owner.address,
        timestamp: data.transaction?.block?.timestamp || Date.now() / 1000,
      })
      );
    //.then(_ => ({ title: 'Test', description: 'Description' }))
  }