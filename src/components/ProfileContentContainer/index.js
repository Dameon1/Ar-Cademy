import { KoiiCard } from "../Cards";

export function ProfileContentContainer(props) {

  let content;

  switch (props.label) {
    case "koii":
      content = props.contentObjects.map((item, i) => {
        return (
          <div key={i} className="cardLinks">
            <a
              href={`https://koi.rocks/content-detail/${item.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="textNoDec"
            >
              <KoiiCard key={item.uid} content={item} />
            </a>
          </div>
        );
      });
      break;
    case "POAPS":
      content = props.contentObjects.map((content, i) => {
        return (
          <div key={i} className="cardLinks">
            <div className="card">
              <div className="cardImageContainer">
                <img
                  src={content.event.image_url}
                  alt={content.videoTitle}
                  className="cardImage"
                />
              </div>
              <h3 className="cardTitle">{content.event.name}</h3>
            </div>
          </div>
        );
      });
      break;
    case "ERC_NFTS":
      content = props.contentObjects.map((content, i) => {
        let dataObject = JSON.parse(content.metadata);
        let {image} = dataObject

        if (image === undefined) {
          image = "https://metadata.ens.domains/mainnet/0xd07dc4262bcdbf85190c01c996b4c06a461d2430/343467/image"
        }       
        image = image.replace("ipfs://ipfs", "https://ipfs.io/ipfs/")
        image = image.replace("ipfs://", "https://ipfs.io/ipfs/")
       
        return (
          <div key={i} className="cardLinks">
            <div className="card">
              <div className="cardImageContainer">
                <img
                  src={image}
                  alt={dataObject.name}
                  className="cardImage"
                />
              </div>
              <h3 className="cardTitle">{dataObject.name}</h3>
            </div>
          </div>
        );
      });
      break;
      case "GALAXY_CREDS":
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
