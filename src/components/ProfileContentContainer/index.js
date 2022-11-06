import { KoiiCard } from "../Cards";
import Stamp from "../Stamp";
import image from "../../favicon.ico";

export function ProfileContentContainer(props) {
  let content;
  console.log(props.label,"   ",props)
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
                    e.target.src = image
                  }}
                />
              </div>
              <h3 className="cardTitle">{content.event.name}</h3>
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
            {console.log(image)}
            <div className="card">
              <div className="cardImageContainer">
                <img src={image} alt={dataObject.name} className="cardImage" />
              </div>
              <h3 className="cardTitle">{dataObject.name}</h3>
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
        let type = content.stampedAssetType;
        if (type === "image") {
          return (
            <div key={i} className="cardLinks">
              <div className="card">
                <div className="cardImageContainer">
                  <img
                    src={`https://arweave.net/${content.stampedAsset}`}
                    alt={"dataObject.name"}
                    className="cardImage"
                  />
                </div>

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
        return (
          <div key={i} className="cardLinks">
            <div className="card">
              <div className="cardImageContainer">
                {/* <img
                  src={`https://arweave.net/${content.id}`}
                  alt={"dataObject.name"}
                  
                /> */}
                <img
                  className="cardImage"
                  src={`https://arweave.net/${content.id}`}
                  alt={content.title}
                  onError={() => console.log("this.src = 'assets/img.png'")}
                ></img>
              </div>
              <h3>{content.title}</h3>
              <Stamp txId={content.id} />
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
