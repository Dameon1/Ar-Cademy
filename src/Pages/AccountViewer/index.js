import { useContext, useEffect, useState } from "react";
//import { AMW } from '../../utils/api';
//import Card from "../../components/Cards";
import MainContext from "../../context";
import { Link, Outlet } from "react-router-dom";
import Login from "src/components/Login/Login";
//import { getWeaveAggregator } from "../../api/WeaveAggregator";
import ProfileContentContainer from "src/components/ProfileContentContainer";
import { ethers } from "ethers";
import UserProfile from "../../components/UserProfile/UserProfile";
import "./accountViewer.css";

export function AccountViewer() {
  let url = new URL(window.location.href).pathname.split("/").at(-1);
  const { walletName, disconnectWallet } = useContext(MainContext);
  const [userContent, setUserContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addr, setAddr] = useState();
  const [input,setInput] = useState();
  const [hasFailed, setHasFailed] = useState();
  // useEffect(() => {
  //   const abortController = new AbortController();
  //   const signal = abortController.signal;
  //   fetch(url, { signal:signal  })
  //     .then(data => {
  //       setTodos(data)
  //     })
  //     .catch(error => {
  //       if (error.name === "AbortError") {
  //         console.log("Aborted")
  //       } else {
  //         console.log("Error fetching data", error?.response)
  //       }
  //     })
  //     return () => {
  //       abortController.abort()
  //     }
  // })
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       let user;
  //       const res = await fetch(`https://ark-api.decent.land/v1/profile/arweave/${addr}`);
  //       const ans = await res.json()
  //       user = ans;
  //       setUserContent(user)
  //       // if (user === undefined) {
  //       //   setUserContent(user);
  //       //   //setProfileTxid(user.txid);
  //       //   //setBalance(await AMW.getBalance());
  //       // }

  //     }
  //     catch (error) {
  //       if (error.name === "AbortError") {
  //         console.log("Aborted")
  //       }
  //     }
  //     finally {
  //       //setIsLoading(false);
  //     }
  //   })()
  // },[addr]);

  // useEffect(() => {
  //   setIsLoading(true)
  //   const abortController = new AbortController();
  //   const signal = abortController.signal;
  //   if(isLoading){
  //     fetch(`https://ark-api.decent.land/v1/profile/arweave/${addr}`, { signal:signal  })
  //       .then(async (data) => {
  //         const ans = await data.json();
  //         console.log(ans)
  //         setUserContent(ans)
  //         setIsLoading(false)
  //       })
  //       .catch(error => {
  //         if (error.name === "AbortError") {
  //           console.log("Aborted")
  //         } else {
  //           console.log("Error fetching data", error?.response)
  //         }
  //       })
  //       return () => {

  //         abortController.abort()
  //       }
  //   }

  // }, [addr])

  useEffect(() => {
    (async () => {
      try {
        console.log(addr);
        //setIsLoading(true)
        //console.log(isLoading)
        let user;
        setUserContent([]);
        let address= addr
        const res = await fetch(
          `https://ark-api.decent.land/v1/profile/arweave/${address}`
        );
        const ans = await res.json();
        user = ans;
        //setUserContent(user);
        console.log(ans, "loading");
        if (Object.entries(user).length === 0 || ans.res === undefined) {
          let checksumAddress = ethers.utils.getAddress(address);
          console.log("check", checksumAddress);

          const ethString = `https://ark-api.decent.land/v1/profile/evm/${checksumAddress}`;
          const eth = await fetch(ethString);
          const ens = await eth.json();
          user = ens.res;
          setUserContent(user);
        } else { setUserContent(ans.res)}
        setIsLoading(false);
        console.log(user, "done loading");
      } catch (e) {
        setHasFailed(JSON.stringify(e));
      } finally {
        console.log("done")
        //setIsLoading(false);
      }
    })();
  }, [addr]);

  const handleInput = (event) => {
    //addr = event.target.value
    //event.preventDefault();
    console.log(event.target.value);
    setInput(event.target.value);
  };

  const logValue = () => {
    console.log(addr);
  };

  async function reRender() {
    setAddr(input);
    //await update(addr)
    setIsLoading(!isLoading)
  }
  function onSubmit(event){
    event.preventDefault();
    console.log(event.target.value);

  }

  return (
    <>
      <div className="text-container">
        <h2>Search Arweave Related Content</h2>
        <p className="site-introduction">
          Enter an address to find the Arweave related content associated connected to it. Not all users have content to diplay or have
          created an account on the various network calls that are made here.
        </p>
      </div>
      <div>
        <form onSubmit={onSubmit}>
        <input
          placeholder="Enter address"
          onChange={handleInput}
          required
          minLength="42"
          maxLength="44"
          size="48"
        />
        <button onClick={logValue} type="submit">
          Log value
        </button>
        </form>
      </div>
      <div className="inputBox">
        <button onClick={reRender}>Go to Account</button>
        <p>Current Addr: {addr}</p>
      </div>

      <div className="">
        {addr && !isLoading && (
          <UserProfile
            addr={addr}
            walletName={walletName}
            disconnectWallet={disconnectWallet}
          />
        )}
        {isLoading && <div>Loading</div>}
        {(Object.entries(userContent).length !== 0) && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.POAPS}
            contentType={"POAPS"}
            label="POAPS"
          />
        )}
        {console.log("userContent", userContent)}
        {(Object.entries(userContent).length !== 0) && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.ANFTS.koii}
            contentType={"aNFTs"}
            label="koii"
          />
        )}
        {(Object.entries(userContent).length !== 0) && !isLoading && (
          <ProfileContentContainer
            contentObjects={userContent.ERC_NFTS}
            contentType={"ERC_NFTS"}
            label="ERC_NFTS"
          />
        )}
      </div>
    </>
  );
}
export default AccountViewer;
