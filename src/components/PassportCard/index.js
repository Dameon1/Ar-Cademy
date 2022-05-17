import React from "react";

export function PassportCard() {
  let heroImage = 'https://img.youtube.com/vi/Ynfwggyl5rY/maxresdefault.jpg'
  return (
    <div className="passport">
      <img className="passportImage" src={heroImage} alt="heroImage" />
      <div className="passportCard-text">
        <ul className="passportTextUl">
          <li className='passportText'>ANS ID</li>
          <li className='passportText'>{"score"}</li>
          <li className='passportText'>ArVerify score</li>
          <li className='passportText'>{"score"}</li>
          <li className='passportText'>Passport Did</li>
          <li className='passportText'>{"Passport Did"}</li>
        </ul>
      </div>
    </div>
  );
}

export default PassportCard;