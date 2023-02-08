import { useState, useEffect } from "react";
import { Topics } from "../../Topics";
import { Videos } from "../../Videos";
import { Grid } from "@nextui-org/react";
import { AtomicMediaCard, MediaCard } from "../../components/Cards";
import { useNavigate } from "react-router-dom";
import { getDataByTopic } from "../../Queries/AppQueries";

function ModulePage() {
  const navigate = useNavigate();
  const module = window.location.hash.split("/").at(-1);
  const videoIds = Topics[module].videosById;
  const [uploadedVideoContent, setUploadedVideoContent] = useState([]);

  //Todo: need to change this at the contract level, until then this lowers for search
  const searchableString = (string) => {
    return string.charAt(0).toLowerCase() + string.substring(1).toLowerCase();
  };

  useEffect(() => {
    getDataByTopic(searchableString(module)).then((data) => {
      setUploadedVideoContent(data);
    });
  }, [module]);

  const AtomicMediaCards = uploadedVideoContent.map((video, index) => {
    return (
      <Grid xs={6} sm={3} md={2} key={index}>
        <AtomicMediaCard video={video} onClick={() => navigate(`/AtomicPlayground/${video.id}`)} />
      </Grid>
    );
  });

  const MediaCards = videoIds.map((videoId, index) => {
    let video = Videos[videoId];
    return (
      <Grid xs={6} sm={3} md={2} key={index}>
        <MediaCard video={video}  onClick={() => navigate(`/playground/${videoId}`)} />
      </Grid>
    );
  });

  return (
    <>
      <div>
        <h1>{module}</h1>
        <Grid.Container gap={2} justify="flex-start">
          {AtomicMediaCards}
          {MediaCards}
        </Grid.Container>
      </div>
    </>
  );
}

export default ModulePage;
