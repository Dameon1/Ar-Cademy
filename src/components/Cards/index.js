import { Suspense, lazy } from 'react';
const AsyncImageLoader = lazy(() => import("src/components/AsyncImageLoader"));

export function Card(props) {
  let { content } = props;
  let cardDescriptionLength = content.description.length;
  cardDescriptionLength > 140 ? content.description = (content.description.slice(0, 140) + ' ...') : console.log(cardDescriptionLength);

  return (
    <div className="card">
      <div className="cardImageContainer">
        <Suspense fallback={<div>Loading...</div>}>
          <AsyncImageLoader src={content.videoImage} alt={content.videoTitle} />
        </Suspense>
      </div>
      <h2 className="cardTitle">{content.videoTitle}</h2>
      <p className="cardText">{content.description}</p>
    </div>
  )
}

export default Card;