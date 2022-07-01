// import { useState, useContext, useEffect } from 'react'
// import { MainContext } from '../../context'
// //import { APP_NAME, tagSelectOptions } from '../utils'
// //import { useRouter } from 'next/router'
// //import { css } from '@emotion/css'
// import { utils } from 'ethers'
// import BigNumber from 'bignumber.js'
// //import Select from 'react-select'
// import './upload.css';
// import { AMW } from '../../utils/api';
// import Account from 'arweave-account';
// import Select from 'react-select'
// import axios from "axios";
// import TestUploader from "../../components/TestUploader";
// import UploadTester from "../../components/UploadTester";

// import { bundleAndSignData, createData } from "arbundles";





// const supportedCurrencies = {
//   matic: 'matic',
//   ethereum: 'ethereum',
//   avalanche: 'avalanche',
//   bnb: 'bnb',
//   arbitrum: 'arbitrum'
// }

// const currencyOptions = Object.keys(supportedCurrencies).map(v => {
//   return {
//     value: v, label: v
//   }
// })

// const APP_NAME = "PERMA_VIDEO_APP_TEST_NAME_3";
// export const tagSelectOptions = [
//   { value: 'daos', label: 'DAOs' },
//   { value: 'defi', label: 'DeFi' },
//   { value: 'nfts', label: 'NFTs' },
//   { value: 'developers', label: 'Developers' },
//   { value: 'gaming', label: 'Gaming' },
//   { value: 'investing', label: 'Investing' },
//   { value: 'public-goods', label: 'Public Goods' },
//   { value: 'education', label: 'Education' }
// ]


// export default function Profile() {
//   const { bundlrInstance, fetchBalance, addr, setIsLoading, currency, setCurrency } = useContext(MainContext)
//   const [file, setFile] = useState()
//   const [image, setImage] = useState()
//   const [title, setTitle] = useState('')
//   const [fileCost, setFileCost] = useState(0)
//   const [uploadFileCost, setUploadFileCost] = useState()

//   const [description, setDescription] = useState('')
//   const [tagSelectState, setTagSelectState] = useState()
//   //const router = useRouter()

//   const [URI, setURI] = useState()
//   const [amount, setAmount] = useState()
//   const [balance, setBalance] = useState(0);
//   const [chunkState, setChunkState] = useState();

//   useEffect(() => {
//     const fetchData = async () => {
//       const currentBalance = await AMW.getBalance();
//       console.log(currentBalance)
//       setBalance(currentBalance)
//     }
//     fetchData();
//   }, [uploadFileCost]);


//   function updateChunks(chunks) {
//     console.log("--------------------------",chunks)
//     setChunkState(chunks)
//   }

//   async function fundWallet() {
//     if (!amount) return
//     const amountParsed = parseInput(amount)
//     try {
//       await bundlrInstance.fund(amountParsed)
//       fetchBalance()
//     } catch (err) {
//       console.log('Error funding wallet: ', err)
//     }
//   }

//   function parseInput(input) {
//     const conv = new BigNumber(input).multipliedBy(bundlrInstance.currencyConfig.base[1])
//     if (conv.isLessThan(1)) {
//       console.log('error: value too small')
//       return
//     } else {
//       return conv
//     }
//   }

//   async function onFileChange(e) {
//     const file = e.target.files[0]
//     if (!file) return
//     checkUploadCost(file.size)
//     if (file) {
//       const image = URL.createObjectURL(file)
//       setImage(image)
//       let reader = new FileReader()
//       reader.onload = function (e) {
//         if (reader.result) {
//           setFile(Buffer.from(reader.result))
//         }
//       }
//       reader.readAsArrayBuffer(file)
//     }
//   }

//   async function checkUploadCost(bytes) {
//     if (bytes) {
//       const arCost = await axios.get(`https://arweave.net/price/${bytes}`)
//         .then(res => {
//           console.log(res.data, "data");
//           return res.data
//         });
//       //const cost = await bundlrInstance.getPrice(bytes)
//       setUploadFileCost(arCost/1000000000000)
//       //setFileCost(utils.formatEther(cost.toString()))
//     }
//   }

//   async function uploadFile() {
//     if (!file) return
//     const tags = [{ name: 'Content-Type', value: 'video/mp4' }]
//     try {
//       let tx = await bundlrInstance.uploader.upload(file, tags)
//       setURI(`http://arweave.net/${tx.data.id}`)
//     } catch (err) {
//       console.log('Error uploading video: ', err)
//     }
//   }

//   async function saveVideo() {
//     if (!file || !title || !description) return
//     const tags = [
//       { name: 'Content-Type', value: 'text/plain' },
//       { name: 'App-Name', value: APP_NAME }
//     ]

//     if (tagSelectState) {
//       tags.push({
//         name: 'Topic', value: tagSelectState.value
//       })
//     }

//     const video = {
//       title,
//       description,
//       URI,
//       createdAt: new Date(),
//       createdBy: bundlrInstance.address,
//     }

//     try {
//       let tx = await bundlrInstance.createTransaction(JSON.stringify(video), { tags })
//       await tx.sign()
//       const { data } = await tx.upload()

//       console.log(`http://arweave.net/${data.id}`)
//       //   setTimeout(() => {
//       //     router.push('/')
//       //   }, 2000)
//     } catch (err) {
//       console.log('error uploading video with metadata: ', err)
//     }
//   }

//   return (
//     <div>
//       <div className={"formStyle"}>
        
//         {
//           URI && (
//             <div>
//               <p className={"linkStyle"} >
//                 <a href={URI}>{URI}</a>
//               </p>
//               <div className={"formStyle"}>
//                 <p className={"labelStyle"}>Tag (optional)</p>
//                 <Select
//                   options={tagSelectOptions}
//                   className={"selectStyle"}
//                   onChange={data => setTagSelectState(data)}
//                   isClearable
//                 />
//                 <p className={"labelStyle"}>Title</p>
//                 <input className={"inputStyle"} onChange={e => setTitle(e.target.value)} placeholder='Video title' />
//                 <p className={"labelStyle"}>Description</p>
//                 <textarea placeholder='Video description' onChange={e => setDescription(e.target.value)} className={"textAreaStyle"} />
//                 <button className={"saveVideoButtonStyle"} onClick={saveVideo}>Save Video</button>
//               </div>
//             </div>
//           )
//         }
//       </div>
//       <div className="text-container">
//         <h2>Welcome to Ar-cademy</h2>
//         <p className="site-introduction">
//           This is a work in progress. Experimenting with the spectrum of uploads on Arweave. These range
//           from simple string metadata stored directly on Arweave completely, to a range of NFT capabilities that
//           store on Ardrive, can be managed on Darkblock or Koii Network, that includes serving the content through
//           the Meson Networks CDN Polygon contract and uses the new WARP contracts from Redstone.
//         </p>
//       </div>
//       <div className="connection">
//         <div className="wallet" onClick={async () => {
//           console.log("clicked")
//         }}>
//           <h4>Step 1</h4>
//           <p className={"labelStyle"}>Preview and Start</p>
//           <div className={"inputContainerStyle"}>
//             <input
//               type="file"
//               onChange={onFileChange}
//             />
//           </div>
//           {
//             image && (
//               <video key={image} width="220" controls className={"videoStyle"}>
//                 <source src={image} type="video/mp4" />
//               </video>
//             )
//           }
//           {
//             uploadFileCost && <h4>Cost to upload: {Math.round((uploadFileCost) * 1000) / 1000} MATIC</h4>
//           }
//           <button className={"buttonStyle"} onClick={uploadFile}>Upload Video</button>
//         </div>
//         <div className="wallet" onClick={async () => {
//           console.log("clicked")

//         }}>
//           <h4>Step 2</h4>
//           <p className={"labelStyle"}>Payment prep</p>
//           <div className={"selectContainerStyle"} >
//             {/* <Select
//               onChange={({ value }) => setCurrency(value)}
//               options={currencyOptions}
//               defaultValue={{ value: currency, label: currency }}
//               classNamePrefix="select"
//               instanceId="currency"
//             /> */}

//           </div>
//           <div className={"bottomFormStyle"}>
//             <p className={"labelStyle"}>Load Bundlr</p>
//             <input placeholder='amount' className={"inputStyle"} onChange={e => setAmount(e.target.value)} />
//             <h3 >💰 Balance {Math.round(balance * 100) / 100}</h3>
//           </div>
//         </div>
//         <div className="wallet" onClick={async () => {
//           console.log("clicked")

//         }}>
//           <h4>Step 3</h4>
//           <p className={"labelStyle"}>Containerize and Finalise</p>
//           <button className={"buttonStyle"} onClick={fundWallet}>Send transaction</button>
//         </div>
//       </div>
//       <TestUploader updateChunks={updateChunks}/>
//       <UploadTester file={file}/>
//     </div>
//   )
// }
