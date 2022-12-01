import { KoiiCard } from "../Cards";
import Stamp from "../Stamp";
import image from "../../favicon.ico";

export function ProfileContentContainer(props) {
  let content;
  switch (props.label) {
    case "koii":
      if (props.contentObjects.length === 0) {
        return null;
      }
      content = props.contentObjects.map((item, i) => {
        return (
          <div key={i} className="cardLinks">
            <KoiiCard key={item.uid} content={item} />
          </div>
        );
      });
      break;

    case "POAPS":
      if (props.contentObjects.length === 0) {
        return null;
      }
      content = props.contentObjects.map((content, i) => {
        return (
          <div key={i} className="cardLinks">
            <div className="card">
              <div className="cardImageContainer">
                <img
                  src={content.event.image_url}
                  alt={content.videoTitle}
                  className="cardImage"
                  onError={(e) => {
                    e.target.src = image;
                  }}
                />
              </div>
              <h3 className="cardTitle">{content.event.name}</h3>
              <a href={`https://app.poap.xyz/token/${content.tokenId}`} className="textNoDec" target="_blank" rel="noreferrer">View on Poap.app</a>
            </div>
          </div>
        );
      });
      break;

    case "ERC_NFTS":
      if (props.contentObjects.length === 0) {
        return null;
      }
      content = props.contentObjects.map((content, i) => {
        let dataObject = JSON.parse(content.metadata);
        if (dataObject === null) {
          return null;
        }
        let { image } = dataObject;

        if (image === undefined) {
          image =
            "https://metadata.ens.domains/mainnet/0xd07dc4262bcdbf85190c01c996b4c06a461d2430/343467/image";
        }

        image = image.replace("ipfs://ipfs", "https://ipfs.io/ipfs/");
        image = image.replace("ipfs://", "https://ipfs.io/ipfs/");

        return (
          <div key={i} className="cardLinks">
            <div className="card">
              <div className="cardImageContainer">
                <img src={image} alt={dataObject.name} className="cardImage" />
              </div>
              <h3 className="cardTitle">{dataObject.name}</h3>
              <a href={`https://opensea.io/assets/ethereum/${content.token_address}/${content.token_id}`} className="textNoDec" target="_blank" rel="noreferrer">View on OpenSea</a>
            </div>
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
              <div className="card">
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
              </div>
            </div>
          );
        } else {
          return null;
        }
      });
      break;

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
            <div className="card">
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
            </div>
          </div>
        );
      });
      break;

      case "NFTS":
        if (props.contentObjects.length === 0) {
          return null;
        }
        content = props.contentObjects.map((content, i) => {
          let  { name, image } = content;
          if (image === undefined) {
            image = "assets/img.png";
          }
           let tokenId = content.token_id.split(":")[0];
          return (
            <div key={i} className="cardLinks">
              <div className="card">
                <div className="cardImageContainer">
                  <img src={image} alt={name} className="cardImage" />
                </div>
                <h3 className="cardTitle">{name}</h3>
                <a href={`https://paras.id/token/x.paras.near::${tokenId}/${tokenId}%3A1`} className="textNoDec" target="_blank" rel="noreferrer">View on Paras</a>
              
              </div>
            </div>
          );
        });
        break;
    default:
      console.log(props.label);
  }

  return (
    <>
      <h1>{props.contentType}:</h1>
      <div className="contentScrollContainer">
        <div className="hs">{content}</div>
      </div>
    </>
  );
}

export default ProfileContentContainer;
