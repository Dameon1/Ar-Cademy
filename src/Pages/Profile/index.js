import { Authors } from '../../Authors';
import { Videos } from '../../Videos';
import PassportCard from '../../components/PassportCard';
import ProfileContentContainer from '../../components/ProfileContentContainer';
import './profile.css'

export default function Profile() {

  let profileId = new URL(window.location.href).pathname.split('/').at(-1);
  let authorObject = Authors[profileId];
  let videoIds = authorObject.createdVideosByID;
  let videoObjects = videoIds.map(videoId => Videos[videoId]);

  return (
    <div>
      <h1>Profile</h1>
      <PassportCard authorObject={authorObject} />
      <ProfileContentContainer contentObjects={videoObjects} contentType={"Videos"} />
    </div>
  );
}