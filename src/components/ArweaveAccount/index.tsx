import { useEffect, useState } from 'react';
import { FaTwitter, FaInstagram, FaFacebook, FaGithub, FaDiscord } from 'react-icons/fa';
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

function ArweaveAccount({ addr, walletName, disconnectWallet, ARK }: {ARK:string, addr: T_addr, walletName: T_walletName, disconnectWallet: () => void }) {

  const [profileData, setProfileData] = useState<T_profile>();
  const [profileTxid, setProfileTxid] = useState<T_txid>();
  const [ansProfile, setAnsProfile] = useState<T_ansProfile>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasFailed, setHasFailed] = useState<string | false>(false);

  useEffect(() => {
    (async () => {
      try {
        const account = new Account();
        const user = await account.get(addr);
        const res = await fetch(
          `https://ans-testnet.herokuapp.com/profile/${addr}`
        );
        const ans = await res.json();
        if(ans){setAnsProfile(ans)}
        if (user) {
          setProfileData(user.profile);
          setProfileTxid(user.txid);
        }
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

          {profileData ? 
            <>
              {profileTxid && 
                <Grid.Container gap={2} justify="center">
                  <a href={`https://viewblock.io/arweave/tx/${profileTxid}`} target="_blank" rel="noreferrer" style={{ fontFamily: "monospace", fontSize: "larger" }}>
                    txid: {profileTxid}
                  </a>
                </Grid.Container>}
                <BoxVertoID>
                  {profileData.avatar
                    ? <AvatarS src={`https://arweave.net/${profileData.avatar}`} sx={{ width: 200, height: 200 }} />
                    : <AvatarS sx={{ width: 200, height: 200, fontSize: 'xx-large', fontFamily: 'monospace' }}>#{addr.slice(0, 3)}{addr.slice(-3)}</AvatarS>
                  }
                <VertoIDinfo>
                  {profileData.name && <Name>{profileData.name}</Name>}
                  <UserAddr href={`https://viewblock.io/arweave/address/${addr}`} target="_blank" rel="noreferrer">
                    @{profileData.handle}
                  </UserAddr>
                  <DetailsS>
                    <Bio>{profileData.bio}</Bio>
                    {profileData.links.twitter &&
                      <UserSocial href={`https://twitter.com/${profileData.links.twitter}`} target="_blank" rel="noreferrer">
                        <FaTwitter size={25} />
                      </UserSocial>}
                    {profileData.links.github && <UserSocial href={`https://github.com/${profileData.links.github}`} target="_blank" rel="noreferrer">
                      <FaGithub size={25} />
                    </UserSocial>}
                    {profileData.links.instagram && <UserSocial href={`https://instagram.com/${profileData.links.instagram}`} target="_blank" rel="noreferrer">
                      <FaInstagram size={25} />
                    </UserSocial>}
                    {profileData.links.facebook && <UserSocial href={`https://facebook.com/${profileData.links.facebook}`} target="_blank" rel="noreferrer">
                      <FaFacebook size={25} />
                    </UserSocial>}
                    {profileData.links.discord && <span>
                      <FaDiscord size={25} /> {profileData.links.discord}
                    </span>}
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

export default ArweaveAccount;
