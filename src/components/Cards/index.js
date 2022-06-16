import { Suspense, lazy } from 'react';
import {KoiiCard} from "./KoiiCards";


function Card(props) {
  const AsyncImageLoader = lazy(() => import("src/components/AsyncImageLoader"));
  let { content } = props;
  console.log("content", content);
  let cardDescriptionLength = content.description.length;
  cardDescriptionLength > 140 ? content.description = (content.description.slice(0, 140) + ' ...') : console.log(cardDescriptionLength);

  return (
    <div className="card">
      <div className="cardImageContainer">
        <Suspense fallback={<div>Loading...</div>}>
          <AsyncImageLoader src={content.videoImage} alt={content.videoTitle} />
        </Suspense>
      </div>
      <h3 className="cardTitle">{content.videoTitle}</h3>
      <p className="cardText">{content.description}</p>
    </div>
  )
}

export { Card, KoiiCard};