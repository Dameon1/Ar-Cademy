import { useState,useRef } from 'react'
//import { MainContext } from '../context'
//import { useRouter } from 'next/router'
//import { css } from '@emotion/css'
import BigNumber from 'bignumber.js'
import Select from 'react-select'
//import '../styles/globals.css'
import { WebBundlr } from "@bundlr-network/client"
import { providers, utils } from 'ethers'
//import { css } from '@emotion/css'
import { useNavigate } from "react-router-dom"

const APP_NAME = "Ar-Cademy";

export const tagSelectOptions = [
  { value: "daos", label: "DAOs" },
  { value: "defi", label: "DeFi" },
  { value: "nfts", label: "NFTs" },
  { value: "developers", label: "Developers" },
  { value: "gaming", label: "Gaming" },
  { value: "investing", label: "Investing" },
  { value: "public-goods", label: "Public Goods" },
  { value: "education", label: "Education" },
];

const supportedCurrencies = {
  matic: 'matic',
  ethereum: 'ethereum',
  avalanche: 'avalanche',
  bnb: 'bnb',
  arbitrum: 'arbitrum'
}

const currencyOptions = Object.keys(supportedCurrencies).map(v => {
  return {
    value: v, label: v
  }
})

export default function PermaVideo() {
  //const { balance, bundlrInstance, fetchBalance, initialiseBundlr, currency, setCurrency } = useContext(MainContext)
  const [file, setFile] = useState()
  const [localVideo, setLocalVideo] = useState()
  const [title, setTitle] = useState('')
  const [fileCost, setFileCost] = useState()
  const [description, setDescription] = useState('')
  const [tagSelectState, setTagSelectState] = useState()
  //const router = useRouter()

  const [URI, setURI] = useState()
  const [amount, setAmount] = useState()

  const [bundlrInstance, setBundlrInstance] = useState()
  const [balance, setBalance] = useState(0)
  const [currency, setCurrency] = useState('select currency')

  const bundlrRef = useRef()

  const navigate = useNavigate();
  async function initialiseBundlr() {
    await window.ethereum.enable()
  
    const provider = new providers.Web3Provider(window.ethereum);
    await provider._ready()
  
    const bundlr = new WebBundlr("https://node2.bundlr.network", currency, provider)
    await bundlr.ready()
    
    setBundlrInstance(bundlr)
    bundlrRef.current = bundlr
  }

  async function fetchBalance() {
    const bal = await bundlrRef.current.getLoadedBalance()
    console.log('bal: ', utils.formatEther(bal.toString()))
    setBalance(utils.formatEther(bal.toString()))
  }

  async function fundWallet() {
    if (!amount) return
    const amountParsed = parseInput(amount)
    try {
      await bundlrInstance.fund(amountParsed)
      fetchBalance()
    } catch (err) {
      console.log('Error funding wallet: ', err)
    }
  }

  function parseInput (input) {
    const conv = new BigNumber(input).multipliedBy(bundlrInstance.currencyConfig.base[1])
    if (conv.isLessThan(1)) {
      console.log('error: value too small')
      return
    } else {
      return conv
    }
  }

  function onFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    checkUploadCost(file.size)
    if (file) {
      const video = URL.createObjectURL(file)
      setLocalVideo(video)
      let reader = new FileReader()
      reader.onload = function (e) {
        if (reader.result) {
          setFile(Buffer.from(reader.result))
        }
      }
      reader.readAsArrayBuffer(file)
    }
  }

  async function checkUploadCost(bytes) {
    if (bytes) {
      const cost = await bundlrInstance.getPrice(bytes)
      console.log(cost)
      setFileCost(utils.formatEther(cost.toString()))
    }
  }

  async function uploadFile() {
    if (!file) return
    const tags = [{ name: 'Content-Type', value: 'video/mp4' }]
    try {
      let tx = await bundlrInstance.uploader.upload(file, tags)
      setURI(`https://arweave.net/${tx.data.id}`)
    } catch (err) {
      console.log('Error uploading video: ', err)
    }
  }

  async function saveVideo() {
    if (!file || !title || !description) return
    const tags = [
      { name: 'Content-Type', value: 'text/plain' },
      { name: 'App-Name', value: APP_NAME }
    ]

    if (tagSelectState) {
      tags.push({
        name: 'Topic', value: tagSelectState.value
      })
    }

    const video = {
      title,
      description,
      URI,
      createdAt: new Date(),
      createdBy: bundlrInstance.address,
    }

    try {
      let tx = await bundlrInstance.createTransaction(JSON.stringify(video), { tags })
      await tx.sign()
      const { data } = await tx.upload()

      console.log(`https://arweave.net/${data.id}`)
      setTimeout(() => {
        navigate('/testpage')
      }, 2000)
    } catch (err) {
      console.log('error uploading video with metadata: ', err)
    }
  }

  if (!bundlrInstance) {
   return  (
     <div>
        <div className={"selectContainerStyle"} >
          <Select
            onChange={({ value }) => setCurrency(value)}
            options={currencyOptions}
            defaultValue={{ value: currency, label: currency }}
            classNamePrefix="select"
            instanceId="currency"
          />
          <p>Currency: {currency}</p>
        </div>
     <div className={"containerStyle"}>
       <button className={"wideButtonStyle"} onClick={initialiseBundlr}>Connect Wallet</button>
     </div>
     </div>
    )
  }


  return (
    <div>
      <h3 className={"balanceStyle"}>💰 Balance {Math.round(balance * 100) / 100}</h3>
      <div className={"formStyle"}>
        <p className={"labelStyle"}>Add Video</p>
        <div className={"inputContainerStyle"}>
          <input
            type="file"
            onChange={onFileChange}
          />
        </div>
        {
          localVideo && (
            <video key={localVideo}width="320" height="240" controls  className={"videoStyle"}>
              <source src={localVideo} type="video/mp4"/>
            </video>
          )
        }
        {
          fileCost && <h4>Cost to upload: {Math.round((fileCost) * 1000) / 1000} {currency}</h4>
        }
        <button className={"buttonStyle"} onClick={uploadFile}>Upload Video</button>
        {
          URI && (
            <div>
               <p className={"linkStyle"} >
                <a href={URI}>{URI}</a>
               </p>
               <div className={"formStyle"}>
                 <p className={"labelStyle"}>Tag (optional)</p>
                 <Select
                   options={tagSelectOptions}
                   className={"selectStyle"}
                   onChange={data => setTagSelectState(data)}
                   isClearable
                   />
                 <p className={"labelStyle"}>Title</p>
                 <input className={"inputStyle"} onChange={e => setTitle(e.target.value)} placeholder='Video title' />
                 <p className={"labelStyle"}>Description</p>
                 <textarea placeholder='Video description' onChange={e => setDescription(e.target.value)} className={"textAreaStyle"}  />
                 <button className={"saveVideoButtonStyle"} onClick={saveVideo}>Save Video</button>
               </div>
            </div>
          )
        }
      </div>
      <div className={"bottomFormStyle"}>
        <p className={"labelStyle"}>Fund Wallet</p>
        <input placeholder='amount' className={"inputStyle"} onChange={e => setAmount(e.target.value)} />
        <button className={"buttonStyle"} onClick={fundWallet}>Send transaction</button>
      </div>
    </div>
  )
}

