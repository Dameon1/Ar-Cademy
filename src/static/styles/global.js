import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.bodyBackground};
    color: ${({ theme }) => theme.text};
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

  .uploadContainer {
    border: 1px solid ${({ theme }) => theme.text};
    border-radius: 15px;
  }
  .uploadContainer:hover {
    border: 1px solid ${({ theme }) => theme.userAction};
  }

  .wallet, .profileBox {
    border: 1px solid ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.bodyBackground};
  }
  .wallet:hover, {
    border: 1px solid ${({ theme }) => theme.userAction};
    color: #ffa537;
  }

  .pageBoxes {
    border: 1px solid ${({ theme }) => !theme.text};
    background-color: ${({ theme }) => !theme.bodyBackground};
  }
  .passportContainer {
    border: 1px solid ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.bodyBackground};
  }
 


`;

const transition =
  "transition: background 0.2s ease-in, color 0.2s ease-in, border-color 0.2s ease-in, opacity 0.2s ease-in;";

export { GlobalStyles, transition };
