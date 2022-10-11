/*! For license information please see main.affc1d13.js.LICENSE.txt */
  body {
    background-color: ${t=>{let{theme:e}=t;return e.bodyBackground}};
    color: ${t=>{let{theme:e}=t;return e.text}};
  }

  .gradient-border {
    --borderWidth: 3px;
    background: ${t=>{let{theme:e}=t;return e.bodyBackground}};
    position: relative;
    border-radius: var(--borderWidth);
  }
  .gradient-border:after {
    content: '';
    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
    border-radius: calc(2 * var(--borderWidth));
    z-index: -1;
    animation: animatedgradient 3s ease alternate infinite;
    background-size: 300% 300%;
  }
  
  @keyframes animatedgradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .wallet {
    border: 1px solid ${t=>{let{theme:e}=t;return e.text}};
    background-color: ${t=>{let{theme:e}=t;return e.bodyBackground}};
  }
  .wallet:hover {
    border: 1px solid ${t=>{let{theme:e}=t;return e.userAction}};
    color: #ffa537;
  }

  .pageBoxes {
    border: 1px solid ${t=>{let{theme:e}=t;return!e.text}};
    background-color: ${t=>{let{theme:e}=t;return!e.bodyBackground}};
  }
  .passportContainer {
    border: 1px solid ${t=>{let{theme:e}=t;return e.text}};
    background-color: ${t=>{let{theme:e}=t;return e.bodyBackground}};
  }


`,cd="transition: background 0.2s ease-in, color 0.2s ease-in, border-color 0.2s ease-in, opacity 0.2s ease-in;",ld=ad(Pl)`
  ${cd}
  display: inline-flex;
  width: 200px;
  height: 200px;
  font-size: xxx-large;
  background-color: ${t=>{let{theme:e}=t;return e.profile.username}};
  color: ${t=>{let{theme:e}=t;return e.profile.username}};
`,hd=ad("div")`
  ${cd}
  color: ${t=>{let{theme:e}=t;return e.text}};
  padding: 10px 10px 10px 10px;
  margin: auto;
  margin-top: 5px;
  max-width: 600px;
  box-sizing: initial;
`,dd=ad(hd)`
  display: flex;
  align-items: center;

  @media only screen and (min-width: 724px){
    & > ${ld} {
      margin-right: 20px;
    }
  }

  @media only screen and (max-width: 724px){
    flex-direction: column;
  }
`,fd=(ad(hd)`
  text-align: center;
`,ad(Pl)`
  ${cd}
  display: inline-flex;
  width: 150px;
  height: 150px;
  font-size: xxx-large;
  background-color: ${t=>{let{theme:e}=t;return e.profile.username}};
  color: ${t=>{let{theme:e}=t;return e.profile.username}};
`,ad("div")`
  &.minified {
    display: none;
  }
`),pd=ad("div")`
  flex: 1;
  overflow-wrap: anywhere;
`,gd=ad("div")`
  color: ${t=>{let{theme:e}=t;return e.profile.username}};
  font-size: xx-large;
  margin-bottom: -7px;
  font-weight: bold;
`,md=ad("a")`
  ${cd}
  font-family: monospace;
  color: #1a98ff;
  &:hover {
    color: #6aaee4;
  }
`,yd=ad("a")`
  ${cd}
  font-family: monospace;
  color: ${t=>{let{theme:e}=t;return e.text}};
  margin-right: 20px;
  &:hover {
    color: #1a98ff;
  }
`,vd=ad("div")`
  padding-top: 15px;
  padding-bottom: 15px;