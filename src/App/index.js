import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { MainHeader } from '../components/MainHeader';
import { LandingPage } from '../components/LandingPage';
import { Dashboard } from '../components/Dashboard';
import { Identity } from '../components/Identity';
import ModulePage from '../components/ModulePage';
import Playground from '../components/Playground';
import Footer from '../components/Footer';
//import Test from '../components/Test';
import Profile from '../components/Profile';
import { MainContext } from '../context';
//import main from "../api/Bundlr";
// import { buildQuery, arweave, createPostInfo, delayResults } from './../lib/api.js';
import { ProgressSpinner } from '../components/ProgressSpinner';
import './App.css';

import { ThemeProvider } from 'styled-components';
import { light, dark } from '../utils/colors';
import { GlobalStyles } from '../static/styles/global';
import Body from '../components/Body';
import { a11yDark, duotoneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Identity Passport
//import GetArweaveWebWallet from '../api/arweaveApp';
//import ArweaveProvider from "../api/Arweave";


function App() {

  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const [theme, updateTheme] = useState(mq.matches);
  const setTheme = (t) => {
    updateTheme(t);
  }



  const [isLoading, setIsLoading] = React.useState(true);
  const [isArweaveWalletConnected, setIsArweaveWalletConnected] = React.useState(false);
  const [currentPassportAddress, setCurrentPassportAddress] = React.useState('');
  let module = new URL(window.location.href).pathname.split('/');
  let url = module[1];
  let string = `/${url}`;

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
