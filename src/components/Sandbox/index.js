import React, { useEffect, useState } from "react";

import './sanbox.css';

export default function Sandbox(props) {
  const [isLoading, setIsLoading] = useState(false)
  const [sandboxContent, setSandboxContent] = useState(props.sandboxContent);
  const sandboxTypes = ["repl", "arcode", "graphql", "arcodeArweave"];
  console.log(props.sandboxLinks, "sandboxLinks")
  useEffect(() => {
    setIsLoading(true)
  }, [])

  function setFilter(newContent) {
    if (sandboxContent !== newContent) {
      setSandboxContent(props.sandboxLinks[newContent])
    }
  }
  function SandboxButtons() {
    return sandboxTypes.map((sandboxType, i) => {
      return (
        <button
          key={i}
          className="sandboxButton"
          onClick={() => setFilter(sandboxType)}
        >
          {sandboxType}
        </button>
      );
    });

  }

  return (
    <div className="sandbox">
      <div className="sanboxHeaderContainer">
        <p className="sandboxHeader" >Filter by IDE</p>
        <div>
          <div className="filtersListStyle">
            {isLoading && <SandboxButtons />}
            {/* sandboxTypes.map((type, i) => (
             <button key={i} className="sandboxButton" layout='fill' onClick={() => setFilter(type)}>{type}</button> */}
          </div>
        </div>
      </div>
      <iframe frameBorder="0" width="100%" height="100%" title={props.title} src={sandboxContent}></iframe>
    </div>
  );
}


