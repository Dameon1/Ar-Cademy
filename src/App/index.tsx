import { useState } from 'react';
import Body from '../Pages/Body';
import './App.css';

import { MainContext } from '../context';
import { ThemeProvider } from 'styled-components';
import { light, dark } from '../utils/colors';
import { GlobalStyles } from '../static/styles/global';
import { a11yDark, duotoneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { T_walletName } from '../utils/types';

function App() {

  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const [theme, updateTheme] = useState(mq.matches);
  const setTheme = (t) => {
    updateTheme(t);
  }
  const [addr, setaddr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [walletName, setWalletName] = useState<T_walletName>();


  function changeState(data) {
    setIsLoading(true);
    // setIsArweaveWalletConnected(true);
    // setCurrentPassportAddress(data);
  }
  return (
    <MainContext.Provider value={{
      isLoading,
      setIsLoading,
      changeState,
      theme,
      setTheme,
      addr,
      setaddr,
      walletName,
      setWalletName
    }}>
      <ThemeProvider theme={theme ? dark : light} >
        <GlobalStyles />
        <Body syntaxTheme={theme ? a11yDark : duotoneLight} />
      </ThemeProvider>
    </MainContext.Provider>
  );
}

export default App;
