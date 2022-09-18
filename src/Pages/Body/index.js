import { Routes, Route, Outlet } from "react-router-dom";
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
import BundlrDemo from "../../components/BundlrDemo/BundlrDemo"


function Body({ syntaxTheme }) {
  let module = new URL(window.location.href).pathname.split("/");
  let string = `/${module[1]}`;
  return (
    <div className="app">
      <MainHeader />
      <main className="main-content">
        <Routes>
          <Route path="/AccountViewer" element={<AccountViewer />} />
          <Route exact path="/identity" element={<Identity />} />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="modules/:topic" element={<ModulePage />} />
          <Route
            exact
            path="/playground/:videoIndex"
            element={<Playground />}
          />
          <Route exact path="/upload" element={<Upload />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/BundlrDemo" element={<BundlrDemo />} />

          <Route exact path={string} element={<LandingPage />} />
          <Route
            path="*"
            element={
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
