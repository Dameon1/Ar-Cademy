import React from "react";
//import PassportCard from "../PassportCard";
import Card from "../Cards";
import { Link } from "react-router-dom";

export function ProfileContentContainer(props) {
  let content = props.contentObjects;
  let cards = content.map(content => {
    return (
      <Link key={content.uid} to={`/playground/${content.uid}`} className="cardLinks">
        <Card content={content} />
      </Link>)
  })
  return (
    <div className="contentScrollContainer">
      <h1>{props.contentType}:</h1>
      <div className="hs">
        {cards}
      </div>
    </div >
  )
}

export default ProfileContentContainer;