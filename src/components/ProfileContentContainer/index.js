import { Card, KoiiCard } from "../Cards";
import { Link } from "react-router-dom";


export function ProfileContentContainer(props) {

  let cards = props.contentObjects.map(content => {
    return (
      <Link key={content.uid} to={`/playground/${content.uid}`} className="cardLinks">
        <Card content={content} />
      </Link>)
  })

  let koiiCards = props.contentObjects.map((content, i) => {
    return (
      <div key={i} className="cardLinks">
        <a href={`https://koi.rocks/content-detail/${content.id}`} target="_blank"
          rel="noopener noreferrer" className="textNoDec" >
          <KoiiCard key={content.uid} content={content} />
        </a>
      </div>)
  })

  return (
    <>
      <h1>{props.contentType}:</h1>
      <div className="contentScrollContainer">
        <div className="hs">
          {props.label === "koii" && koiiCards}
        </div>
      </div>
    </>
  )
}

export default ProfileContentContainer;