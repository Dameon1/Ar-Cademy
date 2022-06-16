import { Suspense, lazy, useState, useContext, useEffect } from 'react';
import {arweave} from "../../../utils/api";
import MainContext from '../../../context';

export function KoiiCard(props) {
    const {isLoading, setIsLoading, addr} = useContext(MainContext);
    const [nftData, setNftData] = useState();
    let { content } = props;
    console.log("content", content);
    let cardDescriptionLength = content.description.length;
    
   


    useEffect(() => {
        setIsLoading(true);
        setNftData(content)
        setIsLoading(false);
      }, [addr, content, setIsLoading])
    

  cardDescriptionLength > 140 ? content.description = (content.description.slice(0, 140) + ' ...') : console.log(cardDescriptionLength);
        return (
            <div className="card">
            {/* <iframe title="Koii NFT image"
                    preload="true"
                    frameBorder="0"
                    width="100%" 
                    src={`https://koi.rocks/embed/${content.id}`} >
            </iframe> */}
            {/* Thumbnail */}
            <img onError={(e) => {
                e.target.src = 'https://pbs.twimg.com/profile_images/1424786684194041859/lkDa9l1U_400x400.png'}} src={`https://koii.live/${content.id}.png`} objectFit="cover"/>
            <h3 className="cardTitle">{content.videoTitle}</h3>
            <p className="cardText">{content.description}</p>
          </div>
        )
      }
     


export default KoiiCard;