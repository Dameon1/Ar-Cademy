import {
    buildQuery,
    arweave,
    createPostInfo,
    tagSelectOptions,
    contentTypeSelectOptions,
  } from "../../utils";
  import { reject, concat, sortWith, descend, prop, takeLast } from "ramda";
  
  import MainContext from "../../context";
  
  import {
    imagesByOwner,
    excludeTransferred,
    includeTransferred,
    // transfer,
    // assetDetails,
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
  
  


  //funtion to search for videos
  export async function getUserVideos(addr, type, filtertag) {
    return (
      Promise.all([
        imagesByOwner(addr, type, filtertag),
      ])
        .then((results) => results)
        .then(sortWith([descend(prop("timestamp"))]))
    );
  }