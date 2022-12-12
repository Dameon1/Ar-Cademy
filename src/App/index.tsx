import { useState } from "react";
import Body from "../Pages/Body";
import "./App.css";

import { MainContext } from "../context";
import { ThemeProvider } from "styled-components";
import { light, dark } from "../utils/colors";
import { GlobalStyles } from "../static/styles/global";
import {
  a11yDark,
  duotoneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { T_walletName } from "../utils/types";
import { AMW } from "../utils/api";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  const mq = window.matchMedia("(prefers-color-scheme: light)");
  const [theme, updateTheme] = useState(mq.matches);
  const setTheme = (t) => {
    updateTheme(t);
  };
  const [addr, setAddr] = useState(null);
  const [currency, setCurrency] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [walletName, setWalletName] = useState<T_walletName>();
  const [userData, setUserData] = useState(null);

  const disconnectWallet = async () => {
    await AMW.disconnect();
    setUserData(null);
    setAddr(null);
  };

  return (
    
      <MainContext.Provider
        value={{
          isLoading,
          setIsLoading,
          theme,
          setTheme,
          addr,
          setAddr,
          walletName,
          setWalletName,
          disconnectWallet,
          currency,
          setCurrency,
          userData,
          setUserData,
        }}
      >
        <ThemeProvider theme={theme ? dark : light}>
          <NextUIProvider>
          <GlobalStyles />
          <Body syntaxTheme={theme ? a11yDark : duotoneLight} />
          </NextUIProvider>
        </ThemeProvider>
      </MainContext.Provider>
    
  );
}

export default App;
