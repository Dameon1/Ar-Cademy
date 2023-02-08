import { useState, useEffect } from "react";

export default function AtomicSandbox(props) {
  let { sandboxLinks } = props;
  let sandboxButtonTitles = props.sandboxLinks.map((x) => x.label);
  const [sandboxContent, setSandboxContent] = useState();

  useEffect(() => {
    setSandboxContent(sandboxLinks[0].url);
  }, [sandboxLinks]);

  function setFilter(index) {
    if (sandboxContent !== sandboxLinks[index]) {
      let newContent = sandboxLinks[index];
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
      <div className="filtersListStyle">
        <SandboxButtons data={sandboxButtonTitles} onClick={onMyFrameLoad} />
      </div>
      <>
        <div className="sandboxIframe">
          <iframe
            className="sandboxIframe"
            onLoad={onMyFrameLoad}
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