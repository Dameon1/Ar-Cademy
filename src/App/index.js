import React from 'react';
import { Routes, Route } from "react-router-dom";
import { MainHeader } from '../components/MainHeader';
import { LandingPage } from '../components/LandingPage';
import { Dashboard } from '../components/Dashboard';
import { Identity } from '../components/Identity';
import ModulePage from '../components/ModulePage';
import Playground from '../components/Playground';
import Footer from '../components/Footer';
import Test from '../components/Test';
import main from "../api/Bundlr";
// import { buildQuery, arweave, createPostInfo, delayResults } from './../lib/api.js';
//import { ProgressSpinner } from '../components/ProgressSpinner';
import './App.css';


// Identity Passport
//import GetArweaveWebWallet from '../api/arweaveApp';
//import ArweaveProvider from "../api/Arweave";


function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isArweaveWalletConnected, setIsArweaveWalletConnected] = React.useState(false);
  const [currentPassportAddress, setCurrentPassportAddress] = React.useState('');
  console.log(currentPassportAddress, "currentPassportAddress")

  let module = new URL(window.location.href).pathname.split('/');
  let url = module[1];
  let string = `/${url}`;

  function changeState(data) {
    setIsLoading(true);
    setIsArweaveWalletConnected(true);
    setCurrentPassportAddress(data);
  }
  return (
    <div className="app">
      <MainHeader currentPassportAddress={setCurrentPassportAddress} />
      <main className="main-content">
        <Routes>
          <Route exact path="/Ar-Cademy/test" element={<Test />} />
          <Route exact path={string} element={<LandingPage />} />
          <Route exact path="/Ar-Cademy" element={<LandingPage />} />
          <Route exact path="/Ar-Cademy/dashboard" element={<Dashboard isArweaveWalletConnected={isArweaveWalletConnected} />} />
          <Route exact path="/Ar-Cademy/identity" element={<Identity isArweaveWalletConnected={isArweaveWalletConnected} changeState={changeState} />} />
          <Route exact path="/Ar-Cademy/modules/:id" element={<ModulePage />} />
          <Route exact path="/Ar-Cademy/modules/:topic/:videoIndex" element={<Playground isLoading={isLoading} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
