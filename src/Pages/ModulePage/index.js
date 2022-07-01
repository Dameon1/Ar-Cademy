
import { Topics } from "../../Topics";
import { Videos } from "../../Videos";
import { Link } from "react-router-dom";

import {Card} from "../../components/Cards";

function ModulePage() {

  const module = new URL(window.location.href).pathname.split('/').at(-1);
  const videoIds = Topics[module].videosById;


  let topicCards = videoIds.map((videoId, index) => {
    let videoObject = Videos[videoId];
    return (
      <Link key={videoObject.videoId || index} to={`/playground/${videoId}`} className="cardLinks">
        <Card content={videoObject} />
      </Link>
    );
  });

  return (
    <div className="">
      <section className="">
        <h1 className="">
          {console.log(module)}
          {module}
        </h1>
        <p>
          {module.description}
        </p>
      </section>
      <section className="">
        <ul className="moduleCards">
          {topicCards}
        </ul>
      </section>
    </div>
  );
}

export default ModulePage;