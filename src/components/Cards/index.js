import React from "react";
//import PassportCard from "../PassportCard";

export function Card(props) {
  let content = props.content;
  return (
    <div className="smallContentBox">
      <div className="smallContentImg">
        <img alt="sometext2" className="" src={content.videoImage}></img>
      </div>
      <p>{content.title}</p>
      <p>{content.description}</p>
    </div>
  )
}

export default Card;