import React from 'react';
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


// Identity Passport
//import GetArweaveWebWallet from '../api/arweaveApp';
//import ArweaveProvider from "../api/Arweave";


function App() {
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
    <MainContext.Provider value={{ isLoading, isArweaveWalletConnected, currentPassportAddress, changeState }}>
      <div className="app">
        <MainHeader currentPassportAddress={setCurrentPassportAddress} />
        {isLoading && <ProgressSpinner />}
        <main className="main-content">
          <Routes>
            {/* <Route exact path="/Ar-Cademy/test" element={<Test />} /> */}
            {/* <Route exact path={string} element={<LandingPage />} /> */}
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/dashboard" element={<Dashboard isArweaveWalletConnected={isArweaveWalletConnected} />} />
            <Route exact path="/profile/:id" element={<Profile isArweaveWalletConnected={isArweaveWalletConnected} />} />
            <Route exact path="/identity" element={<Identity isArweaveWalletConnected={isArweaveWalletConnected} changeState={changeState} />} />
            <Route exact path="/modules/:id" element={<ModulePage />} />
            <Route exact path="/playground/:videoIndex" element={<Playground isLoading={isLoading} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </MainContext.Provider>
  );
}

export default App;
