import {
  buildQuery,
  arweave,
  createPostInfo,
  tagSelectOptions,
} from "../../utils";
import { reject, concat, sortWith, descend, prop, takeLast } from "ramda";

import MainContext from "../../context";

import {
  imagesByOwner,
  transfer,
  excludeTransferred,
  includeTransferred,
  assetDetails,
} from "../../lib/imgLib/asset";

import { useEffect, useState, useContext } from "react";
//import Select from 'react-select'
import {
  Button,
  Grid,
  Loading,
  Text,
  Spacer,
  Input,
  Dropdown,
  Tooltip,
  Container,
  Row,
  Col,
} from "@nextui-org/react";

import AtomicImages from './AtomicImages';
const wait = (ms) => new Promise((res) => setTimeout(res, ms));

export default function TestPage() {
  const defaultLabel = "Type Selection";
  const [videos, setVideos] = useState([]);
  const [label, setLabel] = useState("Optional Label Selection");
  const { addr } = useContext(MainContext);
  const [images, setImages] = useState([]);

  let profile;
  let items = {};
  let showTransfer = false;
  let transferData = { id: "0", title: "unknown" };

  let showConnect = false;
  let showHelp = false;
  let canTransfer = false;
  let showTransfering = false;
  let showError = false;
  let errorMessage = "An Error Occuried!";

  function handleCopy(id) {
    items[id] = false;
    return () => {
      setTimeout(() => (items[id] = false), 2000);
      navigator.clipboard.writeText(id);
      items[id] = true;
    };
  }

  function tweetLink(title, id) {
    return `https://twitter.com/intent/tweet?text=${encodeURI(
      "🪧 STAMP\n\n" + title.replace("#", "no ") + "\n\n🐘"
    )}&url=https://img.arweave.dev/%23/show/${id}`;
  }

  function connected() {
    canTransfer = true;
  }

  async function handleTransfer(e) {
    if (!profile.addr) {
      showConnect = true;
      return;
    }

    showTransfer = false;
    showTransfering = true;
    transferData = e.detail;
    try {
      const result = await transfer({
        asset: transferData.id,
        title: transferData.title,
        caller: profile.addr,
        addr: transferData.addr,
        percent: transferData.percent,
      });

      if (result.ok) {
        showTransfering = false;
        transferData = { id: "0", title: "unknown" };
        setImages(getImages(addr));
      } else {
        showTransfering = false;
        transferData = { id: "0", title: "unknown" };
        errorMessage = result.message;
        showError = true;
      }
    } catch (e) {
      showTransfering = false;
      errorMessage = e.message;
      showError = true;
    }
  }

  async function getImages(addr,type) {
    const transferredImages = await excludeTransferred(addr);
    console.log(transferredImages);
    return (
      Promise.all([imagesByOwner(addr), includeTransferred(addr)])
        .then((results) => concat(results[0], results[1]))
        .then(reject((a) => transferredImages[a.id] === 100))
        // sort!
        .then(sortWith([descend(prop("timestamp"))]))
    );
  }

  useEffect(() => {
    async function getPostInfo(topicFilter = null, depth = 0) {
      try {
        const query = buildQuery(topicFilter);
        const results = await arweave.api.get("graphql", query).catch((err) => {
          console.error("GraphQL query failed");
          throw new Error(err);
        });

        const edges = results.data.data.transactions.edges;
        const posts = await Promise.all(
          edges.map(async (edge) => await createPostInfo(edge.node))
        );
        let sorted = posts.sort(
          (a, b) =>
            new Date(b.request.data.createdAt) -
            new Date(a.request.data.createdAt)
        );
        sorted = sorted.map((s) => s.request.data);
        setVideos(sorted);
      } catch (err) {
        await wait(2 ** depth * 10);
        getPostInfo(topicFilter, depth + 1);
        console.log("error: ", err);
      }
    }
    //getPostInfo()
  }, []);

  async function getPostInfo(topicFilter) {
    const query = buildQuery(topicFilter);
    const res = await fetch("https://arweave.net/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
    // const results = await arweave.api.post("/graphql", query).catch((err) => {
    // 	console.error("GraphQL query failed");
    // 	throw new Error(err);
    // });
    const results = await res.json();
    const edges = results.data.transactions.edges;
    console.log("edges: ", edges);
    const posts = await Promise.all(
      edges.map(async (edge) => await createPostInfo(edge.node))
    );
    let sorted = posts.sort(
      (a, b) =>
        new Date(b.request.data.createdAt) - new Date(a.request.data.createdAt)
    );
    sorted = sorted.map((s) => s.request.data);
    setVideos(sorted);
    console.log("videos", videos);
    //scursor = last(edges).cursor
    return posts;
  }
  // async function getPostInfo(topicFilter = null, depth = 0) {
  //   try {
  //     const query = buildQuery(topicFilter)
  //     const results = await arweave.api.post('graphql',  query)
  //       .catch(err => {
  //         console.error('GraphQL query failed')
  //         throw new Error(err);
  //       });
  //     console.log("results: ", results)
  //     const edges = results.data.data.transactions.edges
  //     const posts = await Promise.all(
  //       edges.map(async edge => await createPostInfo(edge.node))
  //     )
  //     let sorted = posts.sort((a, b) => new Date(b.request.data.createdAt) - new Date(a.request.data.createdAt))
  //     sorted = sorted.map(s => s.request.data)
  //     setVideos(sorted)
  //   } catch (err) {
  //     await wait(2 ** depth * 10)
  //     getPostInfo(topicFilter, depth + 1)
  //     console.log('error: ', err)
  //   }
  // }

  async function runFilterQuery(addr) {
    console.log("what?");
    let newQuery = await getImages(addr ? addr : null);
    let res = await newQuery;
    setImages(res);
    console.log(res);
  }

  return (
    <>
      <div className={"containerStyle"}>
        {console.log("working")}
        <Dropdown>
          <Dropdown.Button>{defaultLabel}</Dropdown.Button>
          <Dropdown.Menu onAction={(key) => setLabel(key)}>
            {/* // onAction={(key: anay) => { clean(); setCurrency() }}> */}
            {tagSelectOptions.map((v) => {
              return <Dropdown.Item key={v.label}>{v.label}</Dropdown.Item>; // proper/title case
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Button>{label}</Dropdown.Button>
          <Dropdown.Menu onAction={(key) => setLabel(key)}>
            {/* // onAction={(key: anay) => { clean(); setCurrency() }}> */}
            {tagSelectOptions.map((v) => {
              return <Dropdown.Item key={v.label}>{v.label}</Dropdown.Item>; // proper/title case
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Button onPress={async () => runFilterQuery(addr)}>Search</Button>
      </div>
      {images && (<AtomicImages images={images} />)}

      {videos.map((video, i) => (
        <div key={i}>
          <div className={"videoContainerStyle"} key={video.URI}>
            <video
              key={video.URI}
              width="720px"
              height="405"
              controls
              className={"videoStyle"}
            >
              <source src={video.URI} type="video/mp4" />
            </video>
          </div>
          {console.log("video: ", video)}
          {/* <div>
            <div className={"titleContainerStyle"}>
              <h3 className={"titleStyle"}>{video.title}</h3>
              <a
                className={"iconStyle"}
                target="_blank"
                rel="noreferrer"
                href={video.URI}
              >
              </a>
            </div>
            <p className={"descriptionStyle"}>{video.description}</p>
          </div> */}
        </div>
      ))}
    </>
  );
}
