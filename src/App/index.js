import React from 'react';
import { Routes, Route } from "react-router-dom";
import { MainHeader } from '../components/MainHeader';
import { LandingPage } from '../components/LandingPage';
//import { Dashboard } from '../components/Dashboard';
import { Identity } from '../components/Identity';
import ModulePage from '../components/ModulePage';
import Playground from '../components/Playground';
import Footer from '../components/Footer';
// import Test from '../components/Test';
// import { buildQuery, arweave, createPostInfo, delayResults } from './../lib/api.js';
import { ProgressSpinner } from '../components/ProgressSpinner';
import './App.css';

//import ArweaveProvider from "../api/Arweave";

function App() {
  //const [contentInfos, setcontentInfos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(false)
  }, [])

  let module = new URL(window.location.href).pathname.split('/');
  let url = module[1];
  let string = `/${url}`;

  console.log(module, "module", string, "string");

  return (
    <div className="app">
      <MainHeader />
      {isLoading && <ProgressSpinner />}
      <main className="main-content">
        <Routes>
          {/* <Route exact path="/Ar-Cademy/test" element={<Test />} /> */}

          <Route exact path={string} element={<LandingPage />} />
          <Route exact path="/Ar-Cademy" element={<LandingPage />} />
          {/* <Route exact path="/Ar-Cademy/dashboard" element={<Dashboard />} /> */}
          <Route exact path="/Ar-Cademy/identity" element={<Identity />} />
          <Route exact path="/Ar-Cademy/modules/:id" element={<ModulePage />} />
          <Route exact path="/Ar-Cademy/modules/:topic/:videoIndex" element={<Playground isLoading />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
