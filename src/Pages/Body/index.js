import { Routes, Route } from "react-router-dom";
import MainHeader from "../../components/MainHeader";
import Dashboard from "../Dashboard";
import LandingPage from "../LandingPage";
import Identity from "../Identity";
import ModulePage from "../ModulePage";
import Playground from "../Playground";
import Footer from "../../components/Footer";
import Profile from "../Profile";
import Upload from "../Upload";
import AccountViewer from "../AccountViewer";
import TestPage from "../TestPage";
import AssetManagement from "../AssetManagement";
import Navigation from "../../components/Navigation";

function Body({ syntaxTheme }) {
  let module = new URL(window.location.href).pathname.split("/");
  let string = `/${module[1]}`;
  console.log(module)
  return (
    <div className="app">
      {/* <MainHeader /> */}
      <Navigation />
      
      <main className="main-content">
      
        <Routes>
          <Route path="/AccountViewer" element={<AccountViewer />} />
          <Route exact path="/Identity" element={<Identity />} />
          <Route exact path="/Profile/:id" element={<Profile />} />
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
      </main>
      <Footer />
    </div>
  );
}

export default Body;
