import { buildQuery, arweave, createPostInfo, tagSelectOptions } from '../../utils'

import { useEffect, useState } from 'react'
//import Select from 'react-select'
import { Button, Grid, Loading, Text, Spacer, Input,Dropdown, Tooltip,Container, Row, Col } from '@nextui-org/react';

const wait = (ms) => new Promise((res) => setTimeout(res, ms))

export default function TestPage() {
  const defaultLabel = "Optional Label Selection"
  const [videos, setVideos] = useState([]);
  const [label, setLabel] = useState("Optional Label Selection")
  
  useEffect(() => {
    async function getPostInfo(topicFilter = null, depth = 0) {
        try {
          const query = buildQuery(topicFilter)
          const results = await arweave.api.get('graphql', query)
            .catch(err => {
              console.error('GraphQL query failed')
              throw new Error(err);
            });
            
          const edges = results.data.data.transactions.edges
          const posts = await Promise.all(
            edges.map(async edge => await createPostInfo(edge.node))
          )
          let sorted = posts.sort((a, b) => new Date(b.request.data.createdAt) - new Date(a.request.data.createdAt))
          sorted = sorted.map(s => s.request.data)
          setVideos(sorted)
        } catch (err) {
          await wait(2 ** depth * 10)
          getPostInfo(topicFilter, depth + 1)
          console.log('error: ', err)
        }
      }
    //getPostInfo()
  },[])

   async function getPostInfo(topicFilter) {
    
    const query = buildQuery(topicFilter)
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
          console.log("results: ", results)
      const posts = await Promise.all(
        edges.map(async edge => await createPostInfo(edge.node))
      )
      let sorted = posts.sort((a, b) => new Date(b.request.data.createdAt) - new Date(a.request.data.createdAt))
      sorted = sorted.map(s => s.request.data)
    setVideos(sorted)
    //scursor = last(edges).cursor
    return edges.map((edge) => createPostInfo(edge.node));
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
  

  async function runFilterQuery(data) {
    getPostInfo(data ? data.value : null)
  }

  return (
    <>
    <div className={"containerStyle"}>
         <Dropdown >
          <Dropdown.Button  >
            {label}
          </Dropdown.Button>
          <Dropdown.Menu onAction={(key) =>setLabel(key)} >
          {/* // onAction={(key: anay) => { clean(); setCurrency() }}> */}
            {(tagSelectOptions).map((v) => {
              return (<Dropdown.Item key={v.label} >{v.label}</Dropdown.Item>) // proper/title case
            })}
          </Dropdown.Menu>
        </Dropdown>
      <Button onPress={async () => runFilterQuery(label)}>Search</Button>
      </div>
      {
        videos.map((video,i) => (
          <div key={i}>
          <div className={"videoContainerStyle"} key={video.URI}>
            <video key={video.URI} width="720px" height="405" controls className={"videoStyle"}>
              <source src={video.URI} type="video/mp4"/>
            </video>
            </div><div>
            <div className={"titleContainerStyle"}>
              <h3 className={"titleStyle"}>{video.title}</h3>
              <a className={"iconStyle"}  target="_blank" rel="noreferrer" href={video.URI}>
                <img src="/arrow.svg" />
              </a>
            </div>
            <p className={"descriptionStyle"}>{video.description}</p>
          </div>
          </div>))
      }
   </>
  )
}

