import { Link } from "react-router-dom";
import { Authors } from "../../Authors";
import { Videos } from "../../Videos";
import PassportCard from "../../components/PassportCard";
import "./profile.css";
import { Card } from "../../components/Cards";

export default function Profile() {
  let profileId = new URL(window.location.href).pathname.split("/").at(-1);
  let profileObject = Authors[profileId];
  let videoIds = Authors[profileId].createdVideosByID;
  let videoObjects = videoIds.map((videoId) => Videos[videoId]);

  let cards = videoObjects.map((content) => {
    return (
      <Link
        key={content.uid}
        to={`/playground/${content.uid}`}
        className="cardLinks"
      >
        <Card content={content} />
      </Link>
    );
  });

  return (
    <>
      <h1>Profile</h1>
      <div className="passportContainer">
        <PassportCard profileObject={profileObject} />
      </div>

      <div>
        <h1>Videos</h1>
        <div className="contentScrollContainer">
          <div className="hs">{cards}</div>
        </div>
      </div>
    </>
  );
}
