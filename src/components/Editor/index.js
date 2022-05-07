import React from "react";
import "./editor.css";
export default function Repl(props) {

  return (
    <div className="repl">
      <iframe frameBorder="0" width="100%" height="700px" title="https://www.youtube.com/watch?v=1k8craCGpgs?autoplay=1" src={props.ide}></iframe>
    </div>
  );
}
 