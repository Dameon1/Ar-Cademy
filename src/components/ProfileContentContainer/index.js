import { KoiiCard } from "../Cards";
import Stamp from "../Stamp";
//import image from "../../favicon.ico";
import Poap from "../Cards/Media/Poap";
import NearNFTS from "../Cards/Media/NearNFTS";
import StampedAssets from "../Cards/Media/StampedAssets";
import CreatedAtomicAssets from "../Cards/Media/CreatedAtomicAssets";
import Koii from "../Cards/Media/Koii";
import EthereumNFTS from "../Cards/Media/EthereumNFTS";


export function ProfileContentContainer(props) {
  let content;


  // Switch to display contents based on type
  switch (props.contentType) {

    // Koii NFTS
    case "koii":
        if (props.contentObjects.length === 0) {
        return null;
      }
      content = props.contentObjects.map((content, i) => {
        return (
          <div key={i} className="cardLinks">
            <Koii content={content} />
            {/* <p>Koii</p>
            <KoiiCard key={item.uid} content={item} /> */}
          </div>
        );
      });
      break;

    // POAPS 
    case "POAPS":
      if (props.contentObjects.length === 0) {
        return null;
      }
      content = props.contentObjects.map((content, i) => {
        return (
          <div key={i} className="cardLinks">
            <Poap content={content} />
          </div>
        );
      });
      break;
    

    // Ethereum NFTS  
    case "ERC_NFTS":
      if (props.contentObjects.length === 0) {
        return null;
      }
      content = props.contentObjects.map((content, i) => {
        let dataObject = JSON.parse(content.metadata);
        console.log("dataObject", dataObject);
        if (dataObject === null) {
          return null;
        }
        let { image } = dataObject;
        console.log("image", image);
        if (image === undefined) {
          image =
            "https://metadata.ens.domains/mainnet/0xd07dc4262bcdbf85190c01c996b4c06a461d2430/343467/image";
        }

        image = image.replace("ipfs://ipfs", "https://ipfs.io/ipfs/");
        image = image.replace("ipfs://", "https://ipfs.io/ipfs/");

        return (
          <div key={i} className="cardLinks">
            <EthereumNFTS content={content} EthImage={image} data={dataObject}/>
            {/* <div className="card">
              <div className="cardImageContainer">
                <img src={image} alt={dataObject.name} className="cardImage" />
              </div>
              <h3 className="cardTitle">{dataObject.name}</h3>
              <a href={`https://opensea.io/assets/ethereum/${content.token_address}/${content.token_id}`} className="textNoDec" target="_blank" rel="noreferrer">View on OpenSea</a>
            </div> */}
          </div>
        );
      });
      break;

    case "GALAXY_CREDS":
      if (props.contentObjects.length === 0) {
        return;
      }
      content = props.contentObjects.map(async (content, i) => {
        return (
          <div key={i} className="cardLinks">
            <div className="card">
              <div className="cardImageContainer">
                {/* <img
                  src={image}
                  alt={dataObject.name}
                  className="cardImage"
                /> */}
              </div>
              <h3 className="cardTitle">{content.name}</h3>
              <h4>{content.id}</h4>
            </div>
          </div>
        );
      });
      break;

    // Stamped Atomic Assets
    case "STAMPS":
      if (props.contentObjects.length === 0) {
        return null;
      }
      content = props.contentObjects.map((content, i) => {
        let { description, title } = content;
        let type = content.stampedAssetType;
        if (description) {
          let cardDescriptionLength = description.length;
          if (cardDescriptionLength > 14) {
            description = description.slice(0, 14) + " ...";
          }
        }

        if (type === "image") {
          return (
            <div key={i} className="cardLinks">
              <StampedAssets content={content} />
              {/* <div className="card">
                <h5>{title}</h5>
                <div className="cardImageContainer">
                  <img
                    src={`https://arweave.net/${content.stampedAsset}`}
                    alt={"dataObject.name"}
                    className="cardImage"
                  />
                </div>
                <p>{description}</p>
                <Stamp txId={content.stampedAsset} />
              </div> */}
            </div>
          );
        } else {
          return null;
        }
      });
      break;

    // Created Atomic Assets
    case "permapages_img":
      if (props.contentObjects.length === 0) {
        return null;
      }
      content = props.contentObjects.map((content, i) => {
        let { description, title } = content;
        if (description) {
          let cardDescriptionLength = description.length;
          if (cardDescriptionLength > 14) {
            description = description.slice(0, 14) + " ...";
          }
        }
        return (
          <div key={i} className="cardLinks">
            <CreatedAtomicAssets content={content} />
            {/* <div className="card">
              <h5>{title}</h5>
              <div className="cardImageContainer">
                <img
                  className="cardImage"
                  src={`https://arweave.net/${content.id}`}
                  alt={content.title}
                  onError={() => this.src = "assets/img.png"}
                ></img>
              </div>
              <p>{description}</p>
              <Stamp txId={content.id} />
            </div> */}
          </div>
        );
      });
      break;

      // Near NFTS
      case "NFTS":
        if (props.contentObjects.length === 0) {
          return null;
        }
        content = props.contentObjects.map((content, i) => {
          return (
            <div key={i} className="cardLinks">
              <NearNFTS content={content} />
            
            </div>
          );
        });
        break;
    default:
      console.log(props.contentType);
  }

  return (
    <>
      <h1>{props.label}:</h1>
      <div className="contentScrollContainer">
        <div className="hs">{content}</div>
      </div>
    </>
  );
}

export default ProfileContentContainer;
