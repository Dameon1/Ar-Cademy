import {useState, useContext, useEffect} from "react";
//import PassportCard from "../PassportCard";
import {Card, KoiiCard} from "../Cards";
import { Link } from "react-router-dom";
import { Loading } from '@nextui-org/react';
import MainContext from "../../context";

export function ProfileContentContainer(props) {
  const { isLoading, setIsLoading, addr } = useContext(MainContext);
  const [label,setlabel] = useState(props.label);
  let content = props.contentObjects;

  useEffect(() => {
    setIsLoading(true);
    setlabel(props.label);
    setIsLoading(false);
  }
  , [addr, content, setIsLoading,props.label])


  let cards = content.map(content => {
    return (
      <Link key={content.uid} to={`/playground/${content.uid}`} className="cardLinks">
        <Card content={content} />
      </Link>)
  })

  let koiiCards = content.map((content,i) => {
    return (
      <Link key={i} to={`/playground/${content.uid}`} className="cardLinks">
        <KoiiCard key={content.uid} content={content} />
      </Link>)
  })

  return (
    <div className="contentScrollContainer">
      <h1>{props.contentType}:</h1>
      <div className="hs">
        {isLoading && <Loading />}
        {label ? koiiCards : cards }
      </div>
    </div >
  )
}

export default ProfileContentContainer;