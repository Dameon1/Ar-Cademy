import React from "react";
import PassportCard from "../PassportCard";
import Card from "../Cards";

export function ProfileContentContainer(props) {
  let content = props.contentObjects;
  let cards = content.map(content => {
    return <Card key={content.uid} content={content} />
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