let schema ={
Modules : {
    title,
    description,
    moduleImage,
},
Topics: {
 
    //TODO: get the link to the videoID
    videos: [VideoID, VideoID, VideoID],
},
Videos: {
    id,
    Title,
    description,
    videoImage,
    author:{AuthorID},
},

Author: {
    id,
    website,
    description,
    image,
    linkDID,
    Videos: [VideoID, VideoID, VideoID],
},
}

// Atomic NFTs thru KOII and add PORT support for verifying views
const createdVideos = {
    //CREATE VIDEO UPLOAD FOR RETRIEVAL
    title,
    img,
    description,
    //creator by ID
    creator,
    creatorID,
    //video by ID
    video,
    videoID,
    notes
}