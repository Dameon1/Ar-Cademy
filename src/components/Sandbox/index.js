import React from "react";
import "./sandbox.css";
export default function Sandbox(props) {

  return (
    <div className="repl">
      <iframe frameBorder="0" width="100%" height="100%" title={props.title} src={props.sandboxContent}></iframe>
    </div>
  );
}
