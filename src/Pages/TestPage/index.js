import {
  
  tagSelectOptions,
  contentTypeSelectOptions,
} from "../../utils";
import { reject, concat, sortWith, descend, prop } from "ramda";

import MainContext from "../../context";

import {
  imagesByOwner,
  excludeTransferred,
  includeTransferred,
  // transfer,
  // assetDetails,
} from "../../lib/imgLib/asset";

import {  useState, useContext } from "react";
import {
  Button,
  Spacer,
  Dropdown,
} from "@nextui-org/react";

import AtomicImages from "./AtomicImages";

export default function TestPage() {
  const [label, setLabel] = useState("Optional Label Selection");
  const { addr } = useContext(MainContext);
  const [images, setImages] = useState([]);
  const [type, setType] = useState("Type Selection");
  const toProperCase = (string) => {
    return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
  };
  

  async function getImages(addr, type, filtertag) {
    const transferredImages = await excludeTransferred(addr);
    return (
      Promise.all([
        imagesByOwner(addr, type, filtertag),
        includeTransferred(addr),
      ])
        .then((results) => concat(results[0], results[1]))
        .then(reject((a) => transferredImages[a.id] === 100))
        // sort!
        .then(sortWith([descend(prop("timestamp"))]))
    );
  }

  async function runFilterQuery(addr, type, filtertag) {
    if (addr) {
      let newImages = await getImages(addr, type, filtertag);
      setImages(newImages);
    }
  }

  return (
    <>
      <div className="text-container acctViewTextContainer">
        <h2>Search Arweave Related Content</h2>
        <p className="pText">**Sign in to an arweave account to use*.</p>
      </div>
      <div className={"containerStyle"}>
        <Dropdown>
          <Dropdown.Button
            css={{
              color: "black",
              border: "2px solid #008c9e",
              fontSize: "0.75em",
              padding: "0.3em",
              backgroundColor: "white",
              transition: "all 0.2s ease-in-out",
            }}
            className=" button buttonText"
          >
            <p className="pText">{toProperCase(type)}</p>
          </Dropdown.Button>
          <Dropdown.Menu onAction={(key) => setType(key)}>
            {contentTypeSelectOptions.map((v) => {
              return (
                <Dropdown.Item key={v.value}>
                  <p className="pText">{v.label}</p>
                </Dropdown.Item>
              ); // proper/title case
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Spacer x={1} />
        <Dropdown>
          <Dropdown.Button
            css={{
              color: "black",
              border: "2px solid #008c9e",
              fontSize: "0.75em",
              padding: "0.3em",
              backgroundColor: "white",
              transition: "all 0.2s ease-in-out",
            }}
            className="button buttonText"
          >
            <p className="pText">{label}</p>
          </Dropdown.Button>
          <Dropdown.Menu onAction={(key) => setLabel(key)}>
            {tagSelectOptions.map((v) => {
              return (
                <Dropdown.Item key={v.value}>
                  <p className="pText">{v.label}</p>
                </Dropdown.Item>
              ); // proper/title case
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Spacer x={1} />
        <Button
          css={{
            color: "black",
            border: "2px solid #008c9e",
            fontSize: "0.75em",
            padding: "0.3em",
            backgroundColor: "white",
            transition: "all 0.2s ease-in-out",
          }}
          onPress={async () => runFilterQuery(addr, type, label)}
          className=" button buttonText"
        >
          <p className="pText">Search</p>
        </Button>
      </div>

      {images && <AtomicImages images={images} />}
    </>
  );
}
