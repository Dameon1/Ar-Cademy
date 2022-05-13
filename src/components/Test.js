import React from 'react';
//import { buildQuery, arweave, createPostInfo, delayResults, getPostInfos } from './../lib/api.js';
import ProgressSpinner from '../components/ProgressSpinner';

import { getPostInfos } from '../lib/api.js';

export const Test = () => {
  const [postInfos, setPostInfos] = React.useState([]);
  const [isSearching, setIsSearching] = React.useState(false);

  React.useEffect(() => {
    setIsSearching(true)
    getPostInfos().then(posts => {
      setPostInfos(posts);
      setIsSearching(false);
    });
  }, [])

  return (
    <div>
      <h1>Test</h1>
      <Child isSearching={isSearching}
        postInfos={postInfos} />
    </div>
  )
}

const Child = (props) => {
  return (
    <div>
      <h1>Child</h1>
      {props.isSearching && <ProgressSpinner />}
      {props.postInfos.map(postInfo =>
        <Posts key={postInfo.txid} postInfo={postInfo} length={props.postInfos} />)}
    </div>
  )
}

const Posts = (props) => {

  const [postMessage, setPostMessage] =
    React.useState('s'.repeat(Math.max([props.length].length - 75, 0)));
  const [statusMessage, setStatusMessage] = React.useState("");

  React.useEffect(() => {
    let newPostMessage = "";
    let newStatus = "";
    if (!props.postInfo.message) {
      setStatusMessage("loading...");
      let isCancelled = false;

      const getPostMessage = async () => {
        const response = await props.postInfo.request;
        if (!response) {
          newStatus = props.postInfo.error;
        } else if (response.status && (response.status === 200 || response.status === 202)) {
          props.postInfo.message = response.data;
          newStatus = "";
          newPostMessage = response.data;
        } else {
          newStatus = "missing data";
        }

        if (isCancelled)
          return;
        setStatusMessage(newStatus);
        setPostMessage(newPostMessage);
      }

      getPostMessage();
      return () => isCancelled = true;
    }

  }, [props.postInfo]);
  console.log(props.postInfo)
  return (
    <div>
      <p>{props.postInfo.height}</p>
    </div >
  )

}



export default Test;