import Arweave from 'arweave';
export const arweave = Arweave.init({})


export const GalaxyCredsQuerie = async (node) => {
    console.log(node)
    // const ownerAddress = node.owner.address;
    // const height = node.block ? node.block.height : -1;
    // const timestamp = node.block ? parseInt(node.block.timestamp, 10) * 1000 : -1;
    // const postInfo = {
    //   txid: node.id,
    //   owner: ownerAddress,
    //   height: height,
    //   length: node.data.size,
    //   timestamp: timestamp,
    // }
    
    // postInfo.request = await arweave.api.get(`/${node.id}`, { timeout: 10000 })
    let getQuery = JSON.stringify(buildQuery(node.id))
    let galaxyCredInfo = await fetch(`https://graphigo.prd.galaxy.eco/${getQuery}`)
    console.log(galaxyCredInfo)
    return galaxyCredInfo;
   }
  
  
   export const buildQuery = (id) => {
   
    const queryObject = { query: ` credMetaData {
        credential(id: ${id}) {
            name
            description
            credType
            chain
            curatorAddress
            referenceLink
            subgraph {
              endpoint
              query
              expression
            }
          }
    }`}
    console.log('queryObject: ', queryObject)
    return queryObject;
  }
  
  export default GalaxyCredsQuerie