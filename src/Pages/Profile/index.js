import { Link } from "react-router-dom"; 
import { Authors } from '../../Authors';
import { Videos } from '../../Videos';
import PassportCard from '../../components/PassportCard';
import ProfileContentContainer from '../../components/ProfileContentContainer';
import './profile.css'
import { Card } from '../../components/Cards';
export default function Profile() {

  let profileId = new URL(window.location.href).pathname.split('/').at(-1);
  let profileObject = Authors[profileId];
  let videoIds = Authors[profileId].createdVideosByID;
  let videoObjects = videoIds.map(videoId => Videos[videoId]);

  let cards = videoObjects.map(content => {
    return (
      <Link key={content.uid} to={`/playground/${content.uid}`} className="cardLinks">
        <Card content={content} />
      </Link>)
  })

  return (
    <div>
      <h1>Profile</h1>
      <div className="passportContainer">
        {/* <TestProfile profileObject={profileObject} /> */}
        <PassportCard profileObject={profileObject} />
      </div>

      <div className="contentScrollContainer">
        <h1>Videos</h1>
        <div className="hs">
          {cards}
        </div>
      </div >
    </div>
  );
}