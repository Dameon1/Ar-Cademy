// import { useEffect, useState } from 'react';
// import { AiOutlinePoweroff, AiOutlineUpload } from 'react-icons/ai';
// import { FiEdit } from 'react-icons/fi';
// import { FaTwitter, FaInstagram, FaFacebook, FaGithub, FaDiscord } from 'react-icons/fa';
// import { Button, Grid, Loading, Text, Spacer } from '@nextui-org/react';

// import {
//   AvatarS,
//   Bio,
//   BoxVertoID,
//   DetailsS,
//   Name,
//   UserAddr,
//   UserSocial,
//   VertoIDinfo,
// } from '../../static/styles/Profile';

// import Account from 'arweave-account';

// import EditProfileModal from '../EditProfileModal/EditProfileModal';
// import { AMW } from '../../utils/api';

// function TestProfile(props) {

//   const { profileObject } = props;
//   const addr = profileObject.DiD
//   const [profileData, setProfileData] = useState();
//   const [profileTxid, setProfileTxid] = useState();

//   const [isLoading, setIsLoading] = useState(true);
//   const [hasFailed, setHasFailed] = useState(false);

//   useEffect(() => {
//     (async () => {
//       try {
//         const account = new Account();
//         const user = await account.get(addr);
//         console.log(user)
//         if (user) {
//           setProfileData(user.profile);
//           setProfileTxid(user.txid);
//         }
//       }
//       catch (e) {
//         console.log(e);
//         setHasFailed(JSON.stringify(e));
//       }
//       finally {
//         setIsLoading(false);
//       }
//     })()
//   }, [addr]);

//   return (
//     <div className='gradient-border' style={{ padding: '5px' }}>
//       {isLoading ?
//         <Grid.Container gap={1} justify="center">
//           <Loading size="xl" css={{ padding: '$24' }} color="success" />
//         </Grid.Container>
//         : hasFailed ? <>
//           <Spacer y={3} />
//           <Grid.Container gap={1} justify="center">
//             <Text color="error">Something wrong happened :(</Text>
//           </Grid.Container>
//           <Spacer y={2} />
//           <Grid.Container gap={1} justify="center">
//           </Grid.Container>
//           <Spacer y={3} />
//         </>
//           : <>

//             <Grid.Container gap={3} justify="space-between" alignItems='center'>
//               {/* <Button auto onClick={disconnectWallet} icon={<AiOutlinePoweroff size={18} />} color="error">Logout</Button> */}

//             </Grid.Container>
//             {console.log(profileData, "profileData")}
//             {profileData ? <>
//               {profileTxid && <Grid.Container gap={2} justify="center">
//                 <a href={`https://viewblock.io/arweave/tx/${profileTxid}`} target="_blank" rel="noreferrer" style={{ fontFamily: "monospace", fontSize: "larger" }}>
//                   txid: {profileTxid}
//                 </a>
//               </Grid.Container>}
//               <BoxVertoID>
//                 {profileData.avatar
//                   ? <AvatarS src={`https://arweave.net/${profileData.avatar}`} sx={{ width: 200, height: 200 }} />
//                   : <AvatarS sx={{ width: 200, height: 200, fontSize: 'xx-large', fontFamily: 'monospace' }}>#{addr.slice(0, 3)}{addr.slice(-3)}</AvatarS>
//                 }
//                 <VertoIDinfo>
//                   {profileData.name && <Name>{profileData.name}</Name>}
//                   <UserAddr href={`https://viewblock.io/arweave/address/${addr}`} target="_blank" rel="noreferrer">
//                     @{profileData.handle}
//                   </UserAddr>
//                   <DetailsS>
//                     <Bio>{profileData.bio}</Bio>
//                     {profileData.links.twitter &&
//                       <UserSocial href={`https://twitter.com/${profileData.links.twitter}`} target="_blank" rel="noreferrer">
//                         <FaTwitter size={25} />
//                       </UserSocial>}
//                     {profileData.links.github && <UserSocial href={`https://github.com/${profileData.links.github}`} target="_blank" rel="noreferrer">
//                       <FaGithub size={25} />
//                     </UserSocial>}
//                     {profileData.links.instagram && <UserSocial href={`https://instagram.com/${profileData.links.instagram}`} target="_blank" rel="noreferrer">
//                       <FaInstagram size={25} />
//                     </UserSocial>}
//                     {profileData.links.facebook && <UserSocial href={`https://facebook.com/${profileData.links.facebook}`} target="_blank" rel="noreferrer">
//                       <FaFacebook size={25} />
//                     </UserSocial>}
//                     {profileData.links.discord && <span>
//                       <FaDiscord size={25} /> {profileData.links.discord}
//                     </span>}
//                   </DetailsS>
//                 </VertoIDinfo>
//               </BoxVertoID>
//               <Grid.Container gap={3} justify="space-between" alignItems='center'>
//                 {/* <Button auto onClick={() => console.log("upload file")} iconRight={<AiOutlineUpload size={18} />} color="success">Create</Button> */}
//               </Grid.Container>
//             </> : <>
//               <div style={{
//                 fontSize: 'xx-large',
//                 textAlign: 'center',
//                 padding: '70px',
//                 alignItems: 'center',
//                 display: 'flex',
//                 flexDirection: 'column'
//               }}>
//                 <div>
//                   Hello{` `}
//                   <span style={{
//                     fontSize: '',
//                     fontFamily: 'monospace'
//                   }}>
//                     <a href={`https://viewblock.io/arweave/address/${addr}`} target="_blank" rel="noreferrer">
//                       {`${addr.slice(0, 5)}...${addr.slice(addr.length - 5, addr.length)}`}
//                     </a>
//                   </span>
//                   {` 🙂`}
//                 </div>
//               </div>
//             </>}
//           </>}
//     </div>
//   );
// }

// export default TestProfile;