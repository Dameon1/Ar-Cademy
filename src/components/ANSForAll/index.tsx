import { useEffect, useState } from 'react';
import { FaTwitter,  FaGithub, FaGlobe } from 'react-icons/fa';
import { Button, Grid, Loading, Text, Spacer } from '@nextui-org/react';

import {
  AvatarS,
  Bio,
  BoxVertoID,
  DetailsS,
  Name,
  UserAddr,
  UserSocial,
  VertoIDinfo,
} from '../../static/styles/Profile';

import { T_addr, T_profile, T_walletName, T_txid, T_ansProfile } from '../../utils/types';
import Account from 'arweave-account';

function UseAns({ addr, walletName, disconnectWallet, ARK }: {ARK:string, addr: T_addr, walletName: T_walletName, disconnectWallet: () => void }) {

  const [ansProfile, setAnsProfile] = useState<T_ansProfile>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState<string | false>(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://ans-testnet.herokuapp.com/profile/${addr}`
        );
        const ans = await res.json();
        if(ans){setAnsProfile(ans)}
       
      }
      catch (e) {
        setHasFailed(JSON.stringify(e));
      }
      finally {
        setIsLoading(false);
      }
    })()
  }, [addr]);

  return (
    <div className='gradient-border' style={{ padding: '5px' }}>{
      isLoading
      ? <Grid.Container gap={1} justify="center">
        <Loading size="xl" css={{ padding: '$24' }} color="success" />
      </Grid.Container>
      : hasFailed ? <>
        <Spacer y={3} />
        <Grid.Container gap={1} justify="center">
          <Text color="error">Something wrong happened :(</Text>
        </Grid.Container>
        <Spacer y={2} />
        <Grid.Container gap={1} justify="center">
          <Button color="secondary" onClick={disconnectWallet} className="identity-link" >Retry</Button>
        </Grid.Container>
        <Spacer y={3} />
      </>
        : <>
          <Grid.Container gap={3} justify="space-between" alignItems='center'>
          </Grid.Container>

          {ansProfile ? 
            <>
                <BoxVertoID>
                  {ansProfile.avatar
                    ? <AvatarS src={`https://arweave.net/${ansProfile.avatar}`} sx={{ width: 200, height: 200 }} />
                    : <AvatarS sx={{ width: 200, height: 200, fontSize: 'xx-large', fontFamily: 'monospace' }}>#{addr.slice(0, 3)}{addr.slice(-3)}</AvatarS>
                  }
                <VertoIDinfo>
                  {ansProfile.currentLabel && <h2>{ansProfile.currentLabel}</h2>}
                  <a href={`https://${ansProfile.currentLabel}.ar.page`} target="_blank" rel="noreferrer">
                    <p>{ansProfile.currentLabel}.ar.page</p>
                  </a>
                  <DetailsS>
                    <Bio>{ansProfile.bio}</Bio>
                    {ansProfile.links.twitter &&
                      <UserSocial href={`https://twitter.com/${ansProfile.links.twitter}`} target="_blank" rel="noreferrer">
                        <FaTwitter size={25} />
                      </UserSocial>}
                    {ansProfile.links.github && <UserSocial href={`https://github.com/${ansProfile.links.github}`} target="_blank" rel="noreferrer">
                      <FaGithub size={25} />
                    </UserSocial>}
                    {ansProfile.links.customUrl && <UserSocial href={`${ansProfile.links.customUrl}`} target="_blank" rel="noreferrer">
                      <FaGlobe size={25} />
                    </UserSocial>}
                    
                   
                  </DetailsS>
                </VertoIDinfo>
              </BoxVertoID>
              <Grid.Container gap={3} justify="space-between" alignItems='center'>
              </Grid.Container>
            </> 
            : 
            <>
              <div style={{
                fontSize: 'xx-large',
                textAlign: 'center',
                padding: '70px',
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div>
                  Hello{` `}
                  <span style={{
                    fontSize: '',
                    fontFamily: 'monospace'
                  }}>
                    <a href={`https://viewblock.io/arweave/address/${addr}`} target="_blank" rel="noreferrer">
                      {`${addr.slice(0, 5)}...${addr.slice(addr.length - 5, addr.length)}`}
                    </a>
                  </span>
                  {` 🙂`}
                </div>
              </div>
            </>
          }
        </>
        }
    </div>
  );
}

export default UseAns;
