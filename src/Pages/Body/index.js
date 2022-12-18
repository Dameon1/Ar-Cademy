import React, { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";
//Pages
import LandingPage from "../LandingPage";
//import Dashboard from "../Dashboard";
//import ModulePage from "../ModulePage";
//import Playground from "../Playground";
//import Profile from "../Profile";
//import Upload from "../Upload";
//import AccountViewer from "../AccountViewer";
//import TestPage from "../TestPage";
//mport AssetManagement from "../AssetManagement";

//Components
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";
import {Loading} from "@nextui-org/react";

const Dashboard = lazy(() => import("../Dashboard"));
const ModulePage = lazy(() => import("../ModulePage"));
const Playground = lazy(() => import("../Playground"));
const Profile = lazy(() => import("../Profile"));
const Upload = lazy(() => import("../Upload"));
const AccountViewer = lazy(() => import("../AccountViewer"));
const AssetManagement = lazy(() => import("../AssetManagement"))
const TestPage = lazy(() => import("../TestPage"));


function Body({ syntaxTheme }) {
  let module = new URL(window.location.href).pathname.split("/");
  let string = `/${module[1]}`;
  return (
      
    <div className="app">
      <Navigation />
      <main className="main-content">
      <Suspense fallback={<Loading/>}>
      <Routes>
          <Route path="/AccountViewer" element={<AccountViewer />} />
          <Route exact path="/Profile/:addr/:id" element={<Profile />} />
          <Route exact path="/Dashboard" element={<Dashboard />} />
          <Route path="Modules/:topic" element={<ModulePage />} />
          <Route exact path="/Playground/:videoIndex" element={<Playground />} />
          <Route exact path="/Upload" element={<Upload />} />
          <Route path="/" element={<LandingPage />} />
          <Route exact path={"/Testpage"} element={<TestPage />} />
          <Route exact path={string} element={<LandingPage />} />
          <Route exact path={"/AssetManagement/:assetId"} element={<AssetManagement/>} />
          <Route path="*" element={
            <main style={{ padding: "1rem" }}>          
              <p>There's nothing to see here!</p>
            </main>
            }
          />
        </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
      
  );
}

export default Body;
