import React, { setState } from "react";
import { getVerification } from "arverify";
import { ans } from "../../api/ANS/ans.js";


async function getArVerificationStatus(addr) {
  const verification = await getVerification(addr);
  return verification.percentage
}

function getANS(addr) {
  const ansHandle = ans.find((holder) => holder.address === addr);
  if (ansHandle) {
    return ansHandle.username;
  }
}

export function PassportCard() {
  const [arVerifyScore, setArVerifyScore] = React.useState(0);
  const [ansName, setAnsName] = React.useState("");
  const [currentAddr, setCurrentAddr] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  let heroImage = 'https://avatars.githubusercontent.com/u/69483974?s=200&v=4'

  React.useEffect(() => {
    if (currentAddr !== "") {
      setIsLoading(true);
      getArVerificationStatus(currentAddr).then((score) => {
        setArVerifyScore(score);
        setIsLoading(false);
      });
      getANS(currentAddr).then((name) => {
        setAnsName(name);
      });
    }
  }, [currentAddr]);

  //console.log(addr);
  // if (addr) {
  //   setAnsName(getANS(addr));
  // }
  // let arVerify = getArVerificationStatus(addr).then(data => {
  //   setArVerifyScore(data)
  // })

  return (
    <div className="passportContainer">
      <div className="passport">
        <img className="passportImage" src={heroImage} alt="heroImage" />
        <div className="passportCard-text">
          <ul className="passportTextUl">
            <li className='passportText'>Current Addr</li>
            <li className='passportInfo'>{currentAddr}</li>
            <li className='passportText'>Current Ans</li>
            <li className='passportInfo'>{ansName}</li>
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