import React, { useState, useContext } from 'react';
import { Routes, Route } from "react-router-dom";
import { MainHeader } from '../MainHeader';
import { LandingPage } from '../LandingPage';
import { Identity } from '../Identity';
import ModulePage from '../ModulePage';
import Playground from '../Playground';
import Footer from '../Footer';
//import Test from '../Test';
import Profile from '../Profile';
//import main from "../api/Bundlr";
// import { buildQuery, arweave, createPostInfo, delayResults } from './../lib/api.js';
import { ProgressSpinner } from '../ProgressSpinner';
//import MainContext from '../../context';

// Identity Passport
//import GetArweaveWebWallet from '../api/arweaveApp';
//import ArweaveProvider from "../api/Arweave";


function Body({ syntaxTheme }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isArweaveWalletConnected, setIsArweaveWalletConnected] = useState(false);
  const [currentPassportAddress, setCurrentPassportAddress] = useState('');

  let module = new URL(window.location.href).pathname.split('/');
  let url = module[1];
  let string = `/${url}`;
  console.log(module, url, string)

  function changeState(data) {
    setIsLoading(true);
    setIsArweaveWalletConnected(true);
    setCurrentPassportAddress(data);
  }
  return (
    <div className="app" >
      <MainHeader />
      {!isLoading && <ProgressSpinner />}
      <main className="main-content">
        <Routes>
          {/* <Route exact path="/Ar-Cademy/test" element={<Test />} /> */}
          <Route exact path={string} element={<LandingPage />} />
          {/* <Route exact path="/dashboard" element={<Dashboard isArweaveWalletConnected={isArweaveWalletConnected} />} /> */}
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/profile/:id" element={<Profile isArweaveWalletConnected={isArweaveWalletConnected} />} />
          <Route exact path="/identity" element={<Identity isArweaveWalletConnected={isArweaveWalletConnected} changeState={changeState} />} />
          <Route exact path="/modules/:id" element={<ModulePage />} />
          <Route exact path="/playground/:videoIndex" element={<Playground isLoading={isLoading} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default Body;