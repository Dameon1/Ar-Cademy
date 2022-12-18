import { Suspense, lazy } from 'react';
import {KoiiCard} from "./KoiiCards";
import MediaCards from "./MediaCards";
import AsyncImageLoader from 'src/components/AsyncImageLoader';

function Card(props) {
  let { content } = props;
  let cardDescriptionLength = content.description.length;
  if (cardDescriptionLength > 140){
    content.description = (content.description.slice(0, 140) + ' ...')
  }
  
   // const moduleCards = modules.map((module, index) => {
  //   return (
  //     <li key={module} className="moduleContent">
  //       <h4>{modules[index]}</h4>
  //       <p>{Modules[module].description}</p>
  //       <img
  //         src={Modules[module].moduleImage}
  //         className="heroImage"
  //         alt={`Follow of ${Modules[module].title}`}
  //       />
  //       <Row justify="center">
  //         <Button
  //           className="nav-link identity-link buttonText"
  //           onClick={() => navigate(`/modules/${module}`)}
  //           iconRight={<AiOutlineArrowRight size={18} />}
  //         >
  //           Explore
  //         </Button>
  //       </Row>
  //     </li>
  //   );
  // });

  return (
    <div className="card">
      <div className="cardImageContainer">
        <img src={content.videoImage} alt={content.videoTitle} className="cardImage" />
        {/* <Suspense fallback={<div>Loading...</div>}>
          <AsyncImageLoader src={content.videoImage} alt={content.videoTitle} />
        </Suspense> */}
      </div>
      <h3 className="cardTitle">{content.videoTitle}</h3>
      <p className="cardText">{content.description}</p>
    </div>
  )
}

export { Card, KoiiCard, MediaCards }