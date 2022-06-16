import React, { useEffect } from "react";
import { ans } from "../../api/ANS/ans.js";



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
  let { avatar } = props.profileObject;


  useEffect(() => {
    function fetchData() {
      if (props.isArweaveWalletConnected) {
        let address = window.arweaveWallet.getActiveAddress();
        //let arVerifyReturnedScore = await getArVerificationStatus(address);
        //setArVerifyScore(arVerifyReturnedScore);
        setCurrentAddr(window.arweaveWallet.getActiveAddress())
        setAnsName(getANS(address))
      }
    }
    fetchData();
  }, [props.isArweaveWalletConnected]);

  return (
    <div >
      <div className="passport">
        <img className="passportImage" src={avatar} alt="heroImage" />
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