import { useState, useContext } from "react";
import { FaTwitter, FaGithub, FaGlobe } from "react-icons/fa";
import {
  Button,
  Grid,
  Loading,
  Text,
  Spacer,
  Image,
  Row,
  Col,
  Tooltip,
  Link,
} from "@nextui-org/react";
import { icons } from "../../static";
import {
  AvatarS,
  Bio,
 
} from "../../static/styles/Profile";

import MainContext from "../../context";



function ARKdisplay(props) {
  console.log(props)
  const { theme } = useContext(MainContext);
  const lensLabel = props.content.LENS_HANDLES[0]?.replace("@", "")

  return (
    <div style={{ padding: "5px" }}>
      <AvatarS
        src={`https://arweave.net/${props.content.ANS.avatar}`}
        sx={{ width: 100, height: 100 }}
      />
      
        {props.content.ANS.currentLabel && <h2>{props.content.ANS.currentLabel}</h2>}
        
        <Bio>{props.content.ANS.bio}</Bio>
        <Row wrap="wrap" align="center" justify="space-around">
          {props.content.ANS.links.twitter && (
            <>
              <Tooltip content={`${props.content.ANS.links.twitter}`}>
                <Link
                  href={`https://twitter.com/${props.content.ANS.links.twitter}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaTwitter
                    className="socialImageLinks"
                    size={25}
                    aria-hidden="true"
                  />
                </Link>
              </Tooltip>
            </>
          )}

          {props.content.ANS.links.github && (
            <Tooltip content={`${props.content.ANS.links.github}`}>
              <Link
                href={`https://github.com/${props.content.ANS.links.github}`}
                target="_blank"
                rel="noreferrer"
                aria-hidden="true"
              >
                <FaGithub
                  href={`https://github.com/${props.content.ANS.links.github}`}
                  size={25}
                  className="socialImageLinks"
                />
              </Link>
            </Tooltip>
          )}
          {props.content.ANS.links.customUrl && (
            <Tooltip content={`${props.content.ANS.links.customUrl}`}>
              <Link
                href={`${props.content.ANS.links.customUrl}`}
                target="_blank"
                rel="noreferrer"
                aria-hidden="true"
              >
                <FaGlobe
                  className="socialImageLinks"
                  size={25}
                />
              </Link>
            </Tooltip>
          )}
        </Row>
        <Spacer y={1} />
        <Row wrap="wrap" align="center" justify="space-around">
        {props.content.LENS_HANDLES && (
            <Tooltip content={`${lensLabel}`}>
              <Link
                href={`https://lenster.xyz/u/${lensLabel}`}
                target="_blank"
                rel="noreferrer"
                aria-hidden="true"
              >
                <img
                  height={30}
                  width={30}
                  className="socialImageLinks"
                  src="https://raw.githubusercontent.com/lens-protocol/brand-kit/main/Logo/SVG/LENS%20LOGO_%20copy_Icon%20Only.svg"
                  alt="Lens logo"
                />
              </Link>
            </Tooltip>
          )}
           {props.content.ANS.currentLabel && (
            <Tooltip content={`${props.content.ANS.currentLabel}`}>
              <Link
                href={`https://${props.content.ANS.currentLabel}.ar.page`}
                target="_blank"
              >
                <img
                  width={30}
                  height={30}
                  className="socialImageLinks"
                  src={
                    !theme
                      ? icons.arweaveWebWallet.light
                      : icons.arweaveWebWallet.dark
                  }
                  alt="Arweave logo"
                  quality={50}
                />
              </Link>
            </Tooltip>
          )}
           {props.content.ENS && (
            <Tooltip content={`${props.content.ENS}`}>
            <Link
              href={`https://etherscan.io/enslookup-search?search=${props.content.ENS}`}
              target="_blank"
            >
              <img
                height={30}
                width={30}
                src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=002"
                alt="Eth logo"
                quality={50}
              />
             </Link>
            </Tooltip>
          )}
        </Row>
        {/* <Row wrap="wrap" align="center" justify="space-around">
          {props.ANS.content.links.customUrl && (
            <Tooltip content={`${props.ANS.content.links.LENS}`}>
              <Link
                href={`https://lenster.xyz/u/${props.ANS.content.links.LENS}`}
                target="_blank"
                rel="noreferrer"
                aria-hidden="true"
              >
                <img
                  height={30}
                  width={30}
                  className="socialImageLinks"
                  src="https://raw.githubusercontent.com/lens-protocol/brand-kit/main/Logo/SVG/LENS%20LOGO_%20copy_Icon%20Only.svg"
                  alt="Lens logo"
                />
              </Link>
            </Tooltip>
          )}
          {props.ANS.content.links.customUrl && (
            <Tooltip content={`${props.ANS.content.links.twitter}`}>
              <Link
                href={`https://twitter.com/${props.ANS.content.links.twitter}`}
                target="_blank"
              >
                <img
                  width={30}
                  height={30}
                  className="socialImageLinks"
                  src={
                    !theme
                      ? icons.arweaveWebWallet.light
                      : icons.arweaveWebWallet.dark
                  }
                  alt="Arweave logo"
                  quality={50}
                />
              </Link>
            </Tooltip>
          )}
          {props.ANS.content.links.customUrl && (
            <Tooltip content={`${props.ANS.content.links.twitter}`}>
            <Link
              href={`https://twitter.com/${props.ANS.content.links.twitter}`}
              target="_blank"
            >
              <img
                height={30}
                width={30}
                src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=002"
                alt="Eth logo"
                quality={50}
              />
             </Link>
            </Tooltip>
          )}
        </Row> */}
      <Spacer y={1} />
      <a
        href={`https://${props.content.ANS.currentLabel}.ar.page`}
        target="_blank"
        rel="noreferrer"
        className="textNoDec"
      >
        <Button className="identity-link buttonText">
          <p>{props.content.ANS.currentLabel}.ar.page</p>
        </Button>
      </a>
    </div>
    // <div className='gradient-border' style={{ padding: '5px' }}>
    //     {
    //   isLoading
    //   ? <Grid.Container gap={1} justify="center">
    //     <Loading size="xl" css={{ padding: '$24' }} color="success" />
    //   </Grid.Container>
    //   :  <>
    //       <Grid.Container gap={3} justify="space-between" alignItems='center'>
    //       </Grid.Container>

    //       {ansProfile ?

    //         : null
    //         // <>
    //         //   <div style={{
    //         //     fontSize: 'xx-large',
    //         //     textAlign: 'center',
    //         //     padding: '70px',
    //         //     alignItems: 'center',
    //         //     display: 'flex',
    //         //     flexDirection: 'column'
    //         //   }}>
    //         //     <div>
    //         //       Hello{` `}
    //         //       <span style={{
    //         //         fontSize: '',
    //         //         fontFamily: 'monospace'
    //         //       }}>
    //         //         <a href={`https://viewblock.io/arweave/address/${addr}`} target="_blank" rel="noreferrer">
    //         //           {`${addr.slice(0, 5)}...${addr.slice(addr.length - 5, addr.length)}`}
    //         //         </a>
    //         //       </span>
    //         //       {` 🙂`}
    //         //     </div>
    //         //   </div>
    //         // </>
    //       }
    //     </>
    //     }
    // </div>
  );
}

export default ARKdisplay;
