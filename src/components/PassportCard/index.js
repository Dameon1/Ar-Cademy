import React, { useEffect } from "react";
//import { getVerification } from "arverify";
import { ans } from "../../api/ANS/ans.js";

// async function getArVerificationStatus(addr) {
//   const verification = await getVerification(addr);
//   console.log(verification, "verification");
//   return verification.percentage
// }

function getANS(addr) {
  const ansHandle = ans.find((holder) => holder.address === addr);
  if (ansHandle) {
    return ansHandle.username;
  }
}

export function PassportCard(props) {
  //const [arVerifyScore, setArVerifyScore] = React.useState(0);
  const [ansName, setAnsName] = React.useState("");
  const [currentAddr, setCurrentAddr] = React.useState("");
  const [isLoading, setIsLoading] = React.useState();

  let heroImage = props.authorObject.avatar

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      if (props.isArweaveWalletConnected) {
        let address = window.arweaveWallet.getActiveAddress();
        //let arVerifyReturnedScore = await getArVerificationStatus(address);
        //setArVerifyScore(arVerifyReturnedScore);
        setCurrentAddr(window.arweaveWallet.getActiveAddress())
        setAnsName(getANS(address))
      }
    }
    fetchData();
    setIsLoading(false);
  }, [props.isArweaveWalletConnected]);

  console.log(currentAddr, ansName, isLoading)
  return (
    <div className="passportContainer">
      <div className="passport">
        <img className="passportImage" src={heroImage} alt="heroImage" />
        {props.isArweaveWalletConnected && <div className="passportCard-text">
          <ul className="passportTextUl">
            <li className='passportText'>Current Addr</li>
            <li className='passportInfo'>{currentAddr}</li>
            <li className='passportText'>Current Ans</li>
            <li className='passportInfo'>{ansName}</li>
            <li className='passportText'>ArVerify score</li>
            {/* <li className='passportInfo'>{arVerifyScore}</li> */}
            <li className='passportText'>Arweave Passport score</li>
            <li className='passportInfo'>{"score"}</li>
          </ul>
        </div>}
      </div>
    </div>
  );
}

export default PassportCard;