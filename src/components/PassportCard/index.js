import React, { setState } from "react";
import { getVerification } from "arverify";
import { ans } from "../../api/ANS/ans.js";


async function getArVerificationStatus(addr) {
  const verification = await getVerification(addr);
  return verification.percentage
}

function getANS(addr) {
  const searchedEmployee = ans.find((holder) => holder.address === addr);
  return searchedEmployee.username;
}

export function PassportCard() {
  const [arVerifyScore, setArVerifyScore] = React.useState(0);
  const [ansName, setAnsName] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  let heroImage = 'https://avatars.githubusercontent.com/u/69483974?s=200&v=4'
  let addr = window.arweaveWallet.getActiveAddress();


  let ans = getANS(addr)
  let arVerify = getArVerificationStatus(addr).then(data => {
    setArVerifyScore(data)
  });
  console.log(arVerify, "arVerify================");
  return (
    <div className="passportContainer">
      <div className="passport">
        <img className="passportImage" src={heroImage} alt="heroImage" />
        <div className="passportCard-text">
          <ul className="passportTextUl">
            <li className='passportText'>Current Addr</li>
            <li className='passportInfo'>{addr}</li>
            <li className='passportText'>ANS ID</li>
            <li className='passportInfo'>{ans}</li>
            <li className='passportText'>ArVerify score</li>
            <li className='passportInfo'>{arVerifyScore}</li>
            <li className='passportText'>Passport score</li>
            <li className='passportInfo'>{"score"}</li>
          </ul>
        </div>
      </div>
    </div>

  );
}

export default PassportCard;