import { useContext, useEffect, useState } from "react";
import MainContext from "../../context";
import Login from "../../components/Login/Login";
import { ethers } from "ethers";
import UseAns from "../../components/ANSForAll";
import ARKdisplay from "../../components/ANSForAll/ARKdisplay";
import AtomicVideoCards from "../../components/Cards/AtomicVideoCards";
import {
  Button,
  Loading,
  Spacer,
  Row,
  Col,
  Container,
} from "@nextui-org/react";
import { AiOutlineUpload } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ArProfile from "../../components/ArProfile";
import { Card } from "../../components/Cards";
import {
  Poap,
  NearNFTS,
  EthereumNFTS,
  StampedAssets,
  CreatedAtomicAssets,
  PolygonNFTS,
} from "../../components/Cards/Media";

import getAllUserContent from "../../lib/getAllUserContent";
import { retryFetch } from "../../utils";

export function Dashboard() {
  const { addr, setUserData, userData } = useContext(MainContext);
  const [isSearching, setIsSearching] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (addr === null) return;
    setIsLoading(true);
    if (userData) {
      return setIsLoading(false);
    }
    let user = {};
    if (addr.split(".")[0].length === 43) {
      async function getContent() {
        let allContent = await getAllUserContent(addr);
        return allContent;
      }
      getContent()
        .then((res) => {
          user.EVM = res[0];
          user.POLY = res[1];
          user.BSC = res[2];
          user.FTM = res[3];
          user.AVAX = res[4];
          user.ARK = res[5].res;
          user.POAPS = res[6].POAPS;
          user.ARCADEMY_VIDEOS = res[7];
          user.UPLOADED_VIDEOS = res[8][0];
          return user;
        })
        .then((user) => {
          setUserData(user);
          setIsLoading(false);
          setIsSearching(false);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
    if (addr.split(".")[0].length === 42) {
      async function getUserData() {
        try {
          let checksumAddress = ethers.utils.getAddress(addr);
          const ethString = `https://ark-core.decent.land/v2/profile/evm/${checksumAddress}`;
          await retryFetch(ethString).then((res) => {
            let user = res.res;
            user.POAPS = user.EVM[user.primary_address].POAPS;
            user.ARK = res.res;
            //user.EVM = res.res.EVM[res.res.primary_address].ERC_NFTS
            setUserData(user);
            setIsSearching(false);
            setIsLoading(false);
          });
        } catch (e) {
          console.log(JSON.stringify(e));
        }
      }
      getUserData();
    }
  }, [addr]);

  return (
    <div className="">
      <div className="text-container">
        <h2>Identity needs Security</h2>
        <p className="pText">
          Identity is a topic that Arweave is looking to solve in multiple
          different ways. As our connection to the world grows, we need to be
          able to connect with the people and communities that we are connected
          to, with the Identity that we are comfortable with. Some of these are
          security risks to personal safety, privacy, and trust.
        </p>
      </div>
      <Spacer y={1} />
      {addr && (
        <Row align="center" justify="center">
          <Button
            css={{
              color: "black",
              border: "2px solid #008c9e",
              fontSize: "0.75em",
              padding: "0.3em",
              backgroundColor: "white",
              transition: "all 0.2s ease-in-out",
            }}
            className="button buttonText"
            onClick={() => navigate("/upload")}
            iconRight={<AiOutlineUpload size={18} />}
          >
            <p className="pText">Create</p>
          </Button>
        </Row>
      )}
      <Spacer y={1} />
      {!addr && <Login />}
      {addr && (
        <Container
          className="gradient-border"
          style={{ padding: "5px", maxWidth: "640px" }}
        >
          <Row>
            <Col align="center">
              <h3>ArProfile:</h3>
              {addr && <ArProfile addr={addr} forDashboard={true} />}
            </Col>
            <Col align="center">
              <h3>ANS Profile:</h3>
              {error?.message ? <p>{error.message}</p> : null}
              {addr && userData?.ARK?.EVM && !isLoading ? (
                <ARKdisplay
                  content={userData.ARK}
                  evmAddr={userData.ARK.primary_address}
                />
              ) : (
                <UseAns addr={addr} forDashboard={true} />
              )}
            </Col>
          </Row>
        </Container>
      )}
      {addr && isLoading && (
        <>
          <p className="pText">Searching for content</p>
          <Loading />
        </>
      )}

      {addr && !isSearching && userData?.ARCADEMY_VIDEOS?.length > 0 && (
        <div>
          <h1>Arcademy Videos</h1>
          <div className="contentScrollContainer">
            <div className="hs">
              {userData.ARCADEMY_VIDEOS.map((content, i) => {
                return <Card content={content} />;
              })}
            </div>
          </div>
        </div>
      )}

      {addr &&
        !isSearching &&
        userData?.UPLOADED_VIDEOS?.length > 0 &&
        !isLoading && (
          <div>
            <h1>Owner Videos</h1>
            <div className="contentScrollContainer">
              <div className="hs">
                {userData.UPLOADED_VIDEOS.map((content, i) => {
                  return (
                    <div className="videoThumbnails" key={i}>
                      <AtomicVideoCards video={content} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      {/*Poaps*/}
      {addr &&
        userData?.ARK?.EVM[userData.ARK.primary_address]?.POAPS?.length > 0 &&
        !isLoading && (
          <>
            <h1>Poaps:</h1>
            <div className="contentScrollContainer">
              <div className="hs">
                {userData.ARK.EVM[userData.ARK.primary_address].POAPS.map(
                  (content, i) => {
                    return (
                      <div key={i} className="mediaCards">
                        <Poap content={content} />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </>
        )}
      {/*NEAR*/}
      {addr && userData?.ARK?.NFTS?.length > 0 && !isLoading && (
        <>
          <h1>NEAR NFTS:</h1>
          <div className="contentScrollContainer">
            <div className="hs">
              {userData.ARK.NFTS.map((content, i) => {
                return (
                  <div key={i} className="mediaCards">
                    <NearNFTS content={content} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {/*ETHEREUM BASED*/}
      {addr &&
        userData?.ARK?.EVM[userData.ARK.primary_address]?.ERC_NFTS?.length >
          0 &&
        !isLoading && (
          <>
            <h1>Ethereum NFTS:</h1>
            <div className="contentScrollContainer">
              <div className="hs">
                {userData?.ARK?.EVM[userData.ARK.primary_address].ERC_NFTS.map(
                  (content, i) => {
                    return (
                      <div key={i} className="mediaCards">
                        <EthereumNFTS content={content} />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </>
        )}
      {/*Polygon based*/}
      {addr && userData?.POLY?.length > 0 && !isLoading && (
        <>
          <h1>Polygon NFTS:</h1>
          <div className="contentScrollContainer">
            <div className="hs">
              {userData?.POLY.map((content, i) => {
                return (
                  <div key={i} className="mediaCards">
                    <PolygonNFTS content={content} index={i} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {addr && userData?.ARK?.ARWEAVE?.STAMPS?.length > 0 && !isLoading && (
        <>
          <h1>Stamped Assets:</h1>
          <div className="contentScrollContainer">
            <div className="hs">
              {userData.ARK.ARWEAVE.STAMPS.map((content, i) => {
                return (
                  <div key={i} className="mediaCards">
                    <StampedAssets content={content} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
      {addr &&
        userData?.ARK?.ARWEAVE.ANFTS?.permapages_img?.length > 0 &&
        !isLoading && (
          <>
            <h1>Created Atomic Assets:</h1>
            <div className="contentScrollContainer">
              <div className="hs">
                {userData?.ARK?.ARWEAVE.ANFTS?.permapages_img.map(
                  (content, i) => {
                    return (
                      <div key={i} className="mediaCards">
                        <CreatedAtomicAssets content={content} />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </>
        )}
    </div>
  );
}
export default Dashboard;




//  OLD CODE FOR REFERENCE

// import { useContext, useEffect, useState } from "react";
// import MainContext from "../../context";
// import Login from "../../components/Login/Login";
// import { ethers } from "ethers";
// import UseAns from "../../components/ANSForAll";
// import ARKdisplay from "../../components/ANSForAll/ARKdisplay";
// import {
//   Button,
//   Loading,
//   Spacer,
//   Row,
//   Col,
//   Container,
// } from "@nextui-org/react";
// import { AiOutlineUpload } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";
// import ArProfile from "../../components/ArProfile";
// import Account from "arweave-account";
// import {
//   Poap,
//   NearNFTS,
//   EthereumNFTS,
//   StampedAssets,
//   CreatedAtomicAssets,
//   PolygonNFTS,
//   AvalancheNFTS,
// } from "../../components/Cards/Media";

// export function Dashboard() {
//   const { addr, setUserData, userData } = useContext(MainContext);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (addr === null) return;
//     async function retryFetch(url) {
//       try {
//         const response = await fetch(url, {
//           method: "GET",
//           headers: {
//             "Content-Type": "text/plain",
//           },
//         });
//         return response;
//       } catch (error) {
//         console.error(error);
//         console.log("retrying fetch");
//         return retryFetch(url);
//       }
//     }
//     setIsLoading(true);
//     console.log("userData", userData, userData?.ARK && userData?.ANS);
//     if (userData) {
//       return setIsLoading(false);
//     }
//     let user = {};
//     if (addr.split(".")[0].length === 43) {
//       retryFetch(
//         `https://ark-core.decent.land/v2/evm-nft/arweave/polygon/${addr}/true`
//       )
//         .then((response) => response.json())
//         .then((res) => {
//           console.log("polyContent", res);
//           user.POLY = res;
//           console.log("setting POLY data", user.POLY);
//         });
//       async function update() {
//         //create user
//         try {
//           //fetch ArProfile
//           const account = new Account();
//           //returns an empty object if no profile is found
//           user.ArProfile = await account.get(addr);

//           //fetch Ark profile or ANS profile from Arweave Addr
//           await retryFetch(
//             `https://ark-core.decent.land/v2/profile/arweave/${addr}`
//           )
//             .then((response) => response.json())
//             .then(async (res) => {
//               if (res.res === undefined) {
//                 await retryFetch(
//                   `https://ans-stats.decent.land/profile/${addr}`
//                 )
//                   .then((response) => {
//                     if (!response.ok) {
//                       const message = `An error has occured: ${response.status}`;
//                       setError(message);
//                     }
//                     return response.json();
//                   })
//                   .then((res) => {
//                     user.ANS = res;
//                     console.log("setting ANS data");
//                     setUserData(user);
//                   });
//               } else {
//                 user.ARK = res.res;
//                 setUserData(user);
//               }
//             });
//         } catch (e) {
//           console.log(e);
//         }
//       }
//       update();
//     }
//     if (addr.split(".")[0].length === 42) {
//       //let user = {};
//       async function searchEVM() {
//         try {
//           let checksumAddress = ethers.utils.getAddress(addr);
//           const ethString = `https://ark-core.decent.land/v2/profile/evm/${checksumAddress}`;
//           const ethArk = await retryFetch(ethString);
//           const evmArk = await ethArk.json();
//           user.ARK = evmArk.res;
//           console.log("setting EVM data");
//           setUserData(user);
//           setIsLoading(false);
//         } catch (e) {
//           console.log("error", e);
//         }
//       }
//       searchEVM();
//     }
//   }, [addr, userData, setUserData]);

//   return (
//     <div className="">
//       <div className="text-container">
//         <h2>Identity needs Security</h2>
//         <p className="pText">
//           Identity is a topic that Arweave is looking to solve in multiple
//           different ways. As our connection to the world grows, we need to be
//           able to connect with the people and communities that we are connected
//           to, with the Identity that we are comfortable with. Some of these are
//           security risks to personal safety, privacy, and trust.
//         </p>
//       </div>
//       <Spacer y={1} />
//       {addr && (
//         <Row align="center" justify="center">
//           <Button
//             css={{
//               color: "black",
//               border: "2px solid #008c9e",
//               fontSize: "0.75em",
//               padding: "0.3em",
//               backgroundColor: "white",
//               transition: "all 0.2s ease-in-out",
//             }}
//             className="button buttonText"
//             onClick={() => navigate("/upload")}
//             iconRight={<AiOutlineUpload size={18} />}
//           >
//             <p className="pText">Create</p>
//           </Button>
//         </Row>
//       )}
//       <Spacer y={1} />
//       {!addr && <Login />}
//       {addr && (
//         <Container
//           className="gradient-border"
//           style={{ padding: "5px", maxWidth: "640px" }}
//         >
//           <Row>
//             <Col align="center">
//               <h3>ArProfile:</h3>
//               {addr && <ArProfile addr={addr} forDashboard={true} />}
//             </Col>
//             <Col align="center">
//               <h3>ANS Profile:</h3>
//               {error?.message ? <p>{error.message}</p> : null}
//               {/* {addr && userData?.ARK?.ARWEAVE?.ANS && !isLoading && (
//                 <>
//                   <ARKdisplay
//                     content={userData.ARK}
//                     evmAddr={userData.ARK.primary_address}
//                   />
//                 </>
//               )}

//               {addr && userData?.ANS && !isLoading && (
//                 <UseAns addr={addr} forDashboard={true} />
//               )} */}
//               {/* {addr && isLoading && (
//                 <Loading />
//               ) } */}
//               {addr && userData?.ARK?.EVM && !isLoading ? (
//                 <ARKdisplay
//                   content={userData.ARK}
//                   evmAddr={userData.ARK.primary_address}
//                 />
//               ) : (
//                 <UseAns addr={addr} forDashboard={true} />
//               )}
//             </Col>
//           </Row>
//         </Container>
//       )}
//       {addr && isLoading && (
//         <>
//           <p className="pText">Searching for content</p>
//           <Loading />
//         </>
//       )}

// {addr && !isSearching && userData?.ARCADEMY_VIDEOS?.length > 0 && (
//           <div>
//             <h1>Arcademy Videos</h1>
//             <div className="contentScrollContainer">
//               <div className="hs">
//                 {userData.ARCADEMY_VIDEOS.map((content, i) => {
//                   return <Card content={content} />;
//                 })}
//               </div>
//             </div>
//           </div>
//         )}

//         {addr && !isSearching && userData?.UPLOADED_VIDEOS?.length > 0 && !isLoading && (
//           <div>
//             <h1>Owner Videos</h1>
//             <div className="contentScrollContainer">
//               <div className="hs">
//                 {userData.UPLOADED_VIDEOS.map((content, i) => {
//                   return (
//                     <div className="videoThumbnails" key={i}>
//                       <AtomicVideoCards video={content} />
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         )}



//       {/*Poaps*/}
//       {addr &&
//         userData?.ARK?.EVM[userData.ARK.primary_address]?.POAPS?.length > 0 &&
//         !isLoading && (
//           <>
//             <h1>Poaps:</h1>
//             <div className="contentScrollContainer">
//               <div className="hs">
//                 {userData.ARK.EVM[userData.ARK.primary_address].POAPS.map(
//                   (content, i) => {
//                     return (
//                       <div key={i} className="mediaCards">
//                         <Poap content={content} />
//                       </div>
//                     );
//                   }
//                 )}
//               </div>
//             </div>
//           </>
//         )}
//       {addr && userData?.ARK?.NFTS?.length > 0 && !isLoading && (
//         <>
//           <h1>NEAR NFTS:</h1>
//           <div className="contentScrollContainer">
//             <div className="hs">
//               {userData.ARK.NFTS.map((content, i) => {
//                 return (
//                   <div key={i} className="mediaCards">
//                     <NearNFTS content={content} />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </>
//       )}
//       {addr &&
//         userData?.ARK?.EVM[userData.ARK.primary_address]?.ERC_NFTS?.length >
//           0 &&
//         !isLoading && (
//           <>
//             <h1>Ethereum NFTS:</h1>
//             <div className="contentScrollContainer">
//               <div className="hs">
//                 {userData?.ARK?.EVM[userData.ARK.primary_address].ERC_NFTS.map(
//                   (content, i) => {
//                     return (
//                       <div key={i} className="mediaCards">
//                         <EthereumNFTS content={content} />
//                       </div>
//                     );
//                   }
//                 )}
//               </div>
//             </div>
//           </>
//         )}
//       {addr && userData?.POLY?.length > 0 && !isLoading && (
//         <>
//           <h1>Polygon NFTS:</h1>
//           <div className="contentScrollContainer">
//             <div className="hs">
//               {userData?.POLY.map((content, i) => {
//                 return (
//                   <div key={i} className="mediaCards">
//                     <PolygonNFTS content={content} index={i} />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </>
//       )}
//       {addr && userData?.ARK?.ARWEAVE?.STAMPS?.length > 0 && !isLoading && (
//         <>
//           <h1>Stamped Assets:</h1>
//           <div className="contentScrollContainer">
//             <div className="hs">
//               {userData.ARK.ARWEAVE.STAMPS.map((content, i) => {
//                 return (
//                   <div key={i} className="mediaCards">
//                     <StampedAssets content={content} />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </>
//       )}
//       {addr &&
//         userData?.ARK?.ARWEAVE.ANFTS?.permapages_img?.length > 0 &&
//         !isLoading && (
//           <>
//             <h1>Created Atomic Assets:</h1>
//             <div className="contentScrollContainer">
//               <div className="hs">
//                 {userData?.ARK?.ARWEAVE.ANFTS?.permapages_img.map(
//                   (content, i) => {
//                     return (
//                       <div key={i} className="mediaCards">
//                         <CreatedAtomicAssets content={content} />
//                       </div>
//                     );
//                   }
//                 )}
//               </div>
//             </div>
//           </>
//         )}

//       {addr && userData?.AVAX?.length > 0 && !isLoading && (
//         <>
//           <h1>Avalnche NFTS:</h1>
//           <div className="contentScrollContainer">
//             <div className="hs">
//               {userData?.AVAX.map((content, i) => {
//                 return (
//                   <div key={i} className="mediaCards">
//                     <AvalancheNFTS content={content} />
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
// export default Dashboard;
