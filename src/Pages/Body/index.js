import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { MainHeader } from '../../components/MainHeader';
import { LandingPage } from '../LandingPage';
import { Identity } from '../Identity';
import ModulePage from '../ModulePage';
import Playground from '../Playground';
import Footer from '../../components/Footer';
import Profile from '../Profile';

function Body({ syntaxTheme }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isArweaveWalletConnected, setIsArweaveWalletConnected] = useState(false);

  let module = new URL(window.location.href).pathname.split('/');
  let url = module[1];
  let string = `/${url}`;
  console.log(module, url, string)

  function changeState(data) {
    setIsLoading(true);
    console.log(data)
    setIsArweaveWalletConnected(true);
    setIsLoading(false);
  }
  return (
    <div className="app" >
      <MainHeader />
      <main className="main-content">
        <Routes>
          {/* <Route exact path="/Ar-Cademy/test" element={<Test />} /> */}
          {/* <Route exact path={string} element={<LandingPage />} /> */}
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