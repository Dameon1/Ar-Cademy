import { useState, useEffect } from "react";
//import "./sandbox.css";

export default function AtomicSandbox(props) {
  console.log(props);
  let { sandboxLinks } = props;
  let sandboxButtonTitles = props.sandboxLinks.map((x) => x.label);
  console.log(sandboxButtonTitles);
  const [sandboxContent, setSandboxContent] = useState();
  // sandboxButtonTitles = Object.keys(sandboxButtonTypes);
  //let initialProp = sandboxButtonTypes[0];

  useEffect(() => {
    setSandboxContent(sandboxLinks[0].url);
  }, [sandboxLinks]);

  function setFilter(index) {
    console.log(index, sandboxContent);
    if (sandboxContent !== sandboxLinks[index]) {
      console.log(sandboxLinks[index]);
      let newContent = sandboxLinks[index];
      console.log("setFilter", index, sandboxContent);
      setSandboxContent(newContent.url);
    }
  }

  // These two function are to keep the iFrame from autoscrolling the page on load.
  function noscroll() {
    window.scrollTo(0, 0);
  }

  function onMyFrameLoad() {
    // add listener to disable scroll
    window.addEventListener("scroll", noscroll);
    setTimeout(function () {
      // Remove the scroll disabling listener (to enable scrolling again) unforeseen consequence is multiple listeners being called in succession
      window.removeEventListener("scroll", noscroll);
    }, 1000);
  }

  function SandboxButtons(data) {
    return sandboxButtonTitles.map((sandboxType, i) => {
      return (
        <button key={i} className="sandboxButton" onClick={() => setFilter(i)}>
          {sandboxType}
        </button>
      );
    });
  }

  return (
    <div className="sandbox">
      <p className="sandboxHeader">Filter Tabs</p>
      <div className="filtersListStyle">
        <SandboxButtons data={sandboxButtonTitles} onClick={onMyFrameLoad} />
      </div>
      <>
        <div className="sandboxIframe">
          <iframe
            className="sandboxIframe"
            onLoad={onMyFrameLoad}
            frameBorder="0"
            width="100%"
            height="100%"
            title={props.title}
            src={sandboxContent}
          ></iframe>
        </div>
      </>
    </div>
  );
}
