import { Authors } from '../../Authors';
import { Videos } from '../../Videos';
import PassportCard from '../../components/PassportCard';
import TestProfile from '../../components/TestProfile';
import ProfileContentContainer from '../../components/ProfileContentContainer';
import './profile.css'

export default function Profile() {

  let profileId = new URL(window.location.href).pathname.split('/').at(-1);
  let profileObject = Authors[profileId];
  let videoIds = Authors[profileId].createdVideosByID;
  let videoObjects = videoIds.map(videoId => Videos[videoId]);

  return (
    <div>
      <h1>Profile</h1>
      <div className="passportContainer">
        {/* <TestProfile profileObject={profileObject} /> */}
        <PassportCard profileObject={profileObject} />
      </div>
      <ProfileContentContainer contentObjects={videoObjects} contentType={"Videos"} />
    </div>
  );
}