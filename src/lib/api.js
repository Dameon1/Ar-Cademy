import Arweave from 'arweave';
export const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
  timeout: 100000,
  logging: false,
});

export const isWellFormattedAddress = (input) => {
  const re = /^[a-zA-Z0-9_]{43}$/;
  return re.test(input);
}
export async function getPostInfos() {
  const query = buildQuery();
  const results = await arweave.api.post('/graphql', query)
    .catch(err => {
      console.error('GraphQL query failed');
      throw new Error(err);
    });
  const edges = results.data.data.transactions.edges;
  console.log(edges);
  return await delayResults(100, edges.map(edge => createPostInfo(edge.node)));
}

export const createPostInfo = (node) => {
  const ownerAddress = node.owner.address;
  const height = node.block ? node.block.height : -1;
  const timestamp = node.block ? parseInt(node.block.timestamp, 10) * 1000 : -1;
  const postInfo = {
    txid: node.id,
    owner: ownerAddress,
    height: height,
    length: node.data.size,
    timestamp: timestamp,
  }
  return postInfo;
}

export const buildQuery = () => {
  const queryObject = {
    query: `{
   transactions(first: 100,
     tags: [
       {
         name: "App-Name",
         values: ["PublicSquare"]
       },
       {
         name: "Content-Type",
         values: ["text/plain"]
       }
     ]
   ) {
     edges {
       node {
         id
         owner {
           address
         }
         data {
           size
         }
         block {
           height
           timestamp
         }
         tags {
           name,
           value
         }
       }
     }
   }
 }`}
  return queryObject;
}

// in miliseconds
var units = {
  year: 24 * 60 * 60 * 1000 * 365,
  month: 24 * 60 * 60 * 1000 * 365 / 12,
  day: 24 * 60 * 60 * 1000,
  hour: 60 * 60 * 1000,
  minute: 60 * 1000,
  second: 1000
}

var rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

export const getRelativeTime = (ts1, ts2) => {
  var elapsed = ts1 - ts2
  // "Math.abs" accounts for both "past" & "future" scenarios
  for (var u in units)
    if (Math.abs(elapsed) > units[u] || u === 'second')
      return rtf.format(Math.round(elapsed / units[u]), u)
}

export const getPostTime = (timestamp) => {
  if (timestamp < 0) {
    return "pending...";
  }
  return getRelativeTime(timestamp, Date.now());
}

export const abbreviateAddress = (address) => {
  if (!address)
    return address;
  const firstFive = address.substring(0, 5);
  const lastFour = address.substring(address.length - 4);
  return `${firstFive}..${lastFour}`;
}

export const getTopicString = (input) => {
  let dashedTopic = (input || '')
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
  return dashedTopic;
}

export const delay = (t) => {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, t);
  });
}

export const delayResults = (milliseconds, results) => {
  return delay(milliseconds).then(function () {
    return results;
  });
}