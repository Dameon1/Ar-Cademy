let schema = {
    Modules: {
        title,
        description,
        moduleImage,
    },
    Topics: {
        title,
        description,
        img,
        videoID,
        creator,
        videos: [VideoID, VideoID, VideoID],
    },
    Videos: {
        videoSrc: [txID],
        videoImage,
        videoTitle,
        author,
        authorWebsite,
        description,
        id,
        authorID,
        sandboxLinks: {
            preferred,
            repl,
            arcodeArweave,
            arcode,
            graphql,
        }
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