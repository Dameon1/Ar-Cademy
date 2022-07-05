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
    console.log(content)
    return (
      <div key={i} className="cardLinks">
        <a href={`https://koi.rocks/content-detail/${content.id}`}   >
          <KoiiCard key={content.uid} content={content} />
        </a>
      </div>)
  })

  return (
    <div className="contentScrollContainer">
      <h1>{props.contentType}:</h1>
      <div className="hs">
        {props.label === "koii" && koiiCards}
        {props.label === "AuthorVideos" && cards}
      </div>
    </div >
  )
}

export default ProfileContentContainer;