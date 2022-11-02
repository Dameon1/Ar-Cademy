import { useEffect, useState } from "react";
import { FaTwitter, FaGithub, FaGlobe } from "react-icons/fa";
import { Button, Grid, Loading, Text, Spacer } from "@nextui-org/react";

import {
  AvatarS,
  Bio,
  BoxVertoID,
  DetailsS,
  Name,
  UserAddr,
  UserSocial,
  VertoIDinfo,
} from "../../static/styles/Profile";

import {
  T_addr,
  T_profile,
  T_walletName,
  T_txid,
  T_ansProfile,
} from "../../utils/types";
import Account from "arweave-account";

function ANSdisplay(props) {
  const [ansProfile, setAnsProfile] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       setAnsProfile(content);
  //     } catch (e) {
  //       setHasFailed(JSON.stringify(e));
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   })();
  // }, [content]);

  return (
    <div style={{ padding: "5px" }}>
      <AvatarS
        src={`https://arweave.net/${props.content.avatar}`}
        sx={{ width: 100, height: 100 }}
      />
      <>
        {props.content.currentLabel && <h2>{props.content.currentLabel}</h2>}

        <>
          <Bio>{props.content.bio}</Bio>
          {props.content.links.twitter && (
            <UserSocial
              href={`https://twitter.com/${props.content.links.twitter}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter size={25} />
            </UserSocial>
          )}
          {props.content.links.github && (
            <UserSocial
              href={`https://github.com/${props.content.links.github}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub size={25} />
            </UserSocial>
          )}
          {props.content.links.customUrl && (
            <UserSocial
              href={`${props.content.links.customUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaGlobe size={25} />
            </UserSocial>
          )}
          {props.content.links.customUrl && (
            <UserSocial
              href={`${props.content.links.customUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaGlobe size={25} />
            </UserSocial>
          )}
          {props.content.links.customUrl && (
            <UserSocial
              href={`${props.content.links.customUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaGlobe size={25} />
            </UserSocial>
          )}
          {props.content.links.customUrl && (
            <UserSocial
              href={`${props.content.links.customUrl}`}
              target="_blank"
              rel="noreferrer"
            >
              <FaGlobe size={25} />
            </UserSocial>
          )}
        </>
      </>
      <Spacer y={1} />
      <a
        href={`https://${props.content.currentLabel}.ar.page`}
        target="_blank"
        rel="noreferrer"
      >
        <Button className="identity-link textNoDec">
          {props.content.currentLabel}.ar.page
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

export default ANSdisplay;
