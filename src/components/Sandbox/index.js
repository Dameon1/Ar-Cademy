import {useState, useContext, useEffect } from "react";
import MainContext from '../../context';
import './sandbox.css';

export default function Sandbox(props) {
  const { isLoading, setIsLoading } = useContext(MainContext);
  const [sandboxContent, setSandboxContent] = useState(props.sandboxContent);

  let sandboxButtonTypes = Object.keys(props.sandboxLinks);
  let src = props.sandboxLinks[sandboxButtonTypes[0]];

  useEffect(() => {
    setSandboxContent(src);
  }, [props.sandboxContent]);


  function setFilter(newContent) {
    if (sandboxContent !== newContent) {
      setSandboxContent(props.sandboxLinks[newContent])
    }
  }
 
  function noscroll() {
    window.scrollTo(0, 0);
  }
  
  function onMyFrameLoad() {
    // add listener to disable scroll
    window.addEventListener('scroll', noscroll);
    setTimeout(function () {
      // Remove the scroll disabling listener (to enable scrolling again) unforeseen consequence is multiple listeners being called in succession
      window.removeEventListener('scroll', noscroll);
    }, 2000);
  }

  // function SandboxButtons() {
  //   return sandboxTypes.map((sandboxType, i) => {
  //     return (
  //       <button key={i} className="sandboxButton"
  //               onClick={() => setFilter(sandboxType)}>
  //         {sandboxType}
  //       </button>
  //     );
  //   });
  // }


  function SandboxButtons(data) {
    console.log(data.data,"data")
    return data.data.map((sandboxType, i) => {
      return (
        <button key={i} className="sandboxButton"
        onClick={() => setFilter(sandboxType)}>
          {sandboxType}
        </button>
    )})
  }

  return (
    <div className="sandbox">
      <div className="sandboxHeaderContainer">
        <p className="sandboxHeader" >Filter by IDE</p>
          <div className="filtersListStyle">
            <SandboxButtons data={sandboxButtonTypes}/>
          </div>
      </div>
      <div className="sandboxIframe">
      <iframe onLoad={onMyFrameLoad} frameBorder="0" width="100%" height="100%" scrolling="no" title={props.title} src={sandboxContent}></iframe>
      </div>
    </div>
  );
}


