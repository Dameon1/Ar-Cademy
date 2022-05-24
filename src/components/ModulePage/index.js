import React, { useContext } from "react";

import { Topics } from "../../Topics";
import { Videos } from "../../Videos";
import { Link } from "react-router-dom";
import { MainContext } from "../../context";
function ModulePage() {
  const { isLoading } = useContext(MainContext)

  let module = new URL(window.location.href).pathname.split('/').at(-1);

  const videoIds = Topics[module].videosById;

  let topicCards = videoIds.map((videoId, index) => {
    let videoObject = Videos[videoId];
    return (
      <Link key={videoObject.videoId || index} to={`/Ar-Cademy/modules/${module}/${videoId}`} className="pageBoxes">
        <li>
          <h2 className="">{videoObject.videoTitle}</h2>
          <div className="">
            <img
              src={videoObject.videoImage}
              alt="Path Thumbnail"
            />
          </div>
          <div>
            <h2 className='moduleHeaders'>{videoObject.title}</h2>
            <p>{videoObject.description}</p>
          </div>
        </li>
      </Link>
    );
  });

  return (
    <div className="">
      <section className="">
        <h1 className="">
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