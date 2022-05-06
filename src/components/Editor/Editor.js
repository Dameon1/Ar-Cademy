import React from "react";

export default function Repl(props) {

  return (
    <div className="repl">
      <iframe frameBorder="0" width="100%" height="700px" src={props.ide}></iframe>
    </div>
  );
}
