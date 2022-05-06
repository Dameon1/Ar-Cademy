import React, { useState, useEffect, useContext, useRef } from "react";
import Editor from "../Editor/Editor";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { Creators } from '../../creators'
export default function Classroom(props) {

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (!isLoading) {
    return (
      <section className="classroom-section">
        <VideoPlayer src={Creators[props.dev].video} dev={props.dev} />
        <Editor title="replit" ide={Creators[props.dev].editors[props.ide]} />
        {/* TODO <InstructionModal />

        {/* <YoutubePlayer
          index={index}
          completedVideos={this.props.completedVideos}
          completed={() => this.handleCompletedCourses()}
          video={this.props.overview.videos[index]}
          title={this.props.overview.title}
          creatorLink={this.props.overview.videos[index].creator.youtube}
          creatorName={this.props.overview.videos[index].creator.name}
          nextBtnClicked={() => this.nextBtnClicked()}
        /> */}

      </section>
    );
  }
  return null;
}

