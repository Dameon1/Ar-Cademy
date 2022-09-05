import React, { useEffect } from "react";
import { ans } from "../../api/ANS/ans.js";
import { isVouched } from 'vouchdao'



function getANS(addr) {
  const ansHandle = ans.find((holder) => holder.address === addr);
  if (ansHandle) {
    return ansHandle.username;
  }
}

export function PassportCard(props) {
  //const [arVerifyScore, setArVerifyScore] = React.useState(0);
  const [ansName, setAnsName] = React.useState("");
  const [isApproved, setIsApproved] = React.useState(false);
  const [currentAddr, setCurrentAddr] = React.useState("");
  let { avatar, addr, authorWebsite } = props.profileObject;
  
  async function approved (currentAddr) {
    let getApproval = await isVouched(currentAddr)
    setIsApproved(getApproval)
    return getApproval 
  }

  approved(addr);
  // useEffect(() => {
  //   function fetchData() {
  //     if (props.isArweaveWalletConnected) {
  //       let address = window.arweaveWallet.getActiveAddress();
  //       //let arVerifyReturnedScore = await getArVerificationStatus(address);
  //       //setArVerifyScore(arVerifyReturnedScore);
  //       setCurrentAddr(window.arweaveWallet.getActiveAddress())
  //       setAnsName(getANS(address))
  //     }
  //   }
  //   fetchData();
  // }, [props.isArweaveWalletConnected]);

  let ANSname = getANS(addr)

  console.log(isApproved);
  return (
    <div className="passport">
      <img className="passportImage" src={avatar} alt="heroImage" />
      <div className="passportCard-text">
        <ul className="passportTextUl">
          <li className='passportText'>ArNS</li>
          <li className='passportInfo'>{authorWebsite}</li>
          <a className='passportInfo' href={`https://${authorWebsite}`} target="_blank"
            rel="noreferrer" >{`${ANSname}`}</a>
          
          <li className='passportText'>ANS</li>
          <li className='passportInfo'>{ANSname}</li>
          <a className='passportInfo' href={`https://${ANSname}.ar.page`} target="_blank"
            rel="noreferrer" >{`${ANSname}.page`}</a>

          <li className='passportText'>V.Dao Approval</li>
          {isApproved && (<li className='passportInfo'>{isApproved?"true":"false"}</li>)}

          <li className='passportText'>Stamps Earned</li>
          <li className='passportInfo'>{ansName}</li>


          {/* <li className='passportInfo'>{arVerifyScore}</li> */}
          <li className='passportText'>$.bAR earned</li>
          <li className='passportText'>Arweave Passport score</li>
        </ul>
      </div>
    </div>)
}
  

export default PassportCard;