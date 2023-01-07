import { Routes, Route } from "react-router-dom";
//Pages
import Dashboard from "../Dashboard";
import LandingPage from "../LandingPage";
import ModulePage from "../ModulePage";
import AtomicPlayground from "../AtomicPlayground";
import Playground from "../Playground";
import Profile from "../Profile";
import Upload from "../Upload";
import AccountViewer from "../AccountViewer";
import TestPage from "../TestPage";
import AssetManagement from "../AssetManagement";
//Components
import Navigation from "../../components/Navigation";
import Footer from "../../components/Footer";

function Body({ syntaxTheme }) {
  let module = new URL(window.location.href).pathname.split("/");
  let string = `/${module[1]}`;
  return (
      
    <div className="app">
      <Navigation />
      <main className="main-content">
      <Routes>
          <Route path="/AccountViewer" element={<AccountViewer />} />
          <Route exact path="/Profile/:addr/:id" element={<Profile />} />
          <Route exact path="/Dashboard" element={<Dashboard />} />
          <Route path="Modules/:topic" element={<ModulePage />} />
          <Route exact path="/AtomicPlayground/:videoId" element={<AtomicPlayground />} />
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
      </main>
      <Footer />
    </div>
      
  );
}

export default Body;