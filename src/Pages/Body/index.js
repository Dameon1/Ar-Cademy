import { Routes, Route } from "react-router-dom";
import MainHeader from '../../components/MainHeader';
import Dashboard from '../Dashboard';
import LandingPage from '../LandingPage';
import Identity from '../Identity';
import ModulePage from '../ModulePage';
import Playground from '../Playground';
import Footer from '../../components/Footer';
import Profile from '../Profile';
import Upload from '../Upload'


function Body({ syntaxTheme }) {
  let module = new URL(window.location.href).pathname.split('/');
  let url = module[1];
  let string = `/${module[1]}`;
  console.log(module)
  return (
    
    <div className="app" >
      <MainHeader />
      <main className="main-content">
        <Routes>
          {console.log("string", string)}
          {/* <Route exact path="/Ar-Cademy/test" element={<Test />} /> */}
          <Route exact path="/identity" element={<Identity />} />

          <Route exact path="/" element={<LandingPage />} />

          <Route exact path="/profile/:id" element={<Profile />} />

          <Route exact path="/Dashboard" element={<Dashboard />} />

          <Route exact path="/modules/:id" element={<ModulePage />} />

          <Route exact path="/playground/:videoIndex" element={<Playground />} />

          <Route exact path={string} element={<LandingPage />} />
          {/* <Route exact path="/upload" element={<Upload />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default Body;