import React, { useState, useEffect } from "react";
import Editor from "../Editor";
import VideoPlayerContainer from "../VideoPlayerContainer";
import { Creators } from '../../Creators';
import "./playground.css";

export default function Playground(props) {
  let topic = new URL(window.location.href).pathname.split('/').at(-1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (!isLoading) {
    return (
      <section>
        <div  className="playground-section">
        <VideoPlayerContainer />
        <Editor title="replit" ide={Creators[topic].editors["repl"]} />
        {/* TODO <InstructionModal />
      
        /> */}
      </div>  
      </section>
    );
  }
  return null;
}

