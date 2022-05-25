import React from 'react';
import { Authors } from '../../Authors';
import { Videos } from '../../Videos';
//import Card from '../Cards';
import PassportCard from '../PassportCard';
//import ContentVideoCards from '../ContentVideoCards';
//import ContentSandboxCards from '../ContentSandboxCards';
import ProfileContentContainer from '../ProfileContentContainer';

// grab profile ID from URL
// grab user from contract? or tags? complete video? <- title, descript, sandbox attachment
// grab user from Authors, get Videos from author, (get Tags from author?)
export default function Profile() {

  let profileId = new URL(window.location.href).pathname.split('/').at(-1);
  let authorObject = Authors[profileId];
  let videoIds = authorObject.createdVideosByID;
  let videoObjects = videoIds.map(videoId => Videos[videoId]);

  //temporary
  //let contentIds = authorObject.createdContentByID;

  //console.log(authorObject, videoIds);
  // let videoTitles = videoObjects.map(videoObject => videoObject.videoTitle);
  // let videoDescriptions = videoObjects.map(videoObject => videoObject.description);
  // let videoSrcs = videoObjects.map(videoObject => videoObject.videoSrc);
  // let videoSandboxSrcs = videoObjects.map(videoObject => videoObject.videoSandboxSrc);


  return (
    <div>
      {//passport , videos, sandbox
      }

      <h1>Profile</h1>
      <PassportCard authorObject={authorObject} />
      <ProfileContentContainer contentObjects={videoObjects} contentType={"Videos"} />
      {/* <ProfileContentContainer sandbox="sandbox" /> */}
      {/* <Passport />
      <ContentVideoCards />
      <ContentSandboxCards /> */}
    </div>
  );
}