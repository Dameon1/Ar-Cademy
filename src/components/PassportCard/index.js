import React from "react";
import { ans } from "../../api/ANS/ans.js";
import { isVouched } from "vouchdao";

export function PassportCard(props) {
  const [isApproved, setIsApproved] = React.useState(false);
  let { avatar, addr, authorWebsite } = props.profileObject;

  async function approved(currentAddr) {
    let getApproval = await isVouched(currentAddr);
    setIsApproved(getApproval);
    return getApproval;
  }
  function getANS(addr) {
    const ansHandle = ans.find((holder) => holder.address === addr);
    if (ansHandle) {
      return ansHandle.username;
    }
  }

  function getAddrByANS(ansName) {
    const ansHandle = ans.find((holder) => holder.username === ansName);
    if (ansHandle) {
      return ansHandle.address;
    }
  }

  approved(addr);
  let ansName = getANS(addr);
  let ansAddr = getAddrByANS(addr)
  return (
    <div className="passport">
      <img className="passportImage" src={avatar} alt="heroImage" />
      <div className="passportCard-text">
        <ul className="passportTextUl">
          <li className="passportText">ArNS</li>
          <li className="passportInfo">{authorWebsite}</li>
          <a
            className="passportInfo"
            href={`https://${authorWebsite}`}
            target="_blank"
            rel="noreferrer"
          >{`${ansName}`}</a>
          <li className="passportText">ANS</li>
          <li className="passportInfo">{ansName}</li>
          <a
            className="passportInfo"
            href={`https://${ansName}.ar.page`}
            target="_blank"
            rel="noreferrer"
          >{`${ansName}.page`}</a>
          <li className="passportText">V.Dao Approval</li>
          {isApproved && (
            <li className="passportInfo">{isApproved ? "true" : "false"}</li>
          )}
          <li className="passportText">Stamps Earned</li>
          <li className="passportText">$.bAR earned</li>
          <li className="passportText">Arweave Passport score</li>
        </ul>
      </div>
    </div>
  );
}

export default PassportCard;
