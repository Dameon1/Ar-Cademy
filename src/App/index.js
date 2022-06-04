import { useState } from 'react';
import Body from '../Pages/Body';
import './App.css';

import { MainContext } from '../context';
import { ThemeProvider } from 'styled-components';
import { light, dark } from '../utils/colors.ts';
import { GlobalStyles } from '../static/styles/global';
import { a11yDark, duotoneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';


function App() {

  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const [theme, updateTheme] = useState(mq.matches);
  const setTheme = (t) => {
    updateTheme(t);
  }

  const [isLoading, setIsLoading] = useState(true);
  const [isArweaveWalletConnected, setIsArweaveWalletConnected] = useState(false);
  const [currentPassportAddress, setCurrentPassportAddress] = useState('');

  function changeState(data) {
    setIsLoading(true);
    setIsArweaveWalletConnected(true);
    setCurrentPassportAddress(data);
  }
  return (
    <MainContext.Provider value={{ isLoading, isArweaveWalletConnected, currentPassportAddress, changeState, theme, setTheme }}>
      <ThemeProvider theme={theme ? dark : light} >
        <GlobalStyles />
        <Body syntaxTheme={theme ? a11yDark : duotoneLight} />
      </ThemeProvider>
    </MainContext.Provider>
  );
}

export default App;
