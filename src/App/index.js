import { Routes, Route } from "react-router-dom";
import { MainHeader } from '../components/MainHeader';
import { LandingPage } from '../components/LandingPage';
import { Dashboard } from '../components/Dashboard';
import { Identity } from '../components/Identity';
import  ModulePage  from '../components/ModulePage';
import  Playground  from '../components/Playground';
import './App.css';


import ArweaveProvider from "../api/Arweave";

function App() {
  let module = new URL(window.location.href).pathname.split('/');
  console.log(module, "module");
  return (
    <div className="App">
      <MainHeader />
      <main className="main-content">
        <ArweaveProvider/>
     
      <Routes>
        <Route exact path="/Ar-Cademy" element={<LandingPage />} />
        <Route exact path="/Ar-Cademy/dashboard" element={<Dashboard />} />
        <Route exact path="/Ar-Cademy/identity" element={<Identity />} />
        <Route exact path="/Ar-Cademy/modules/:id" element={<ModulePage />} />
        {/* <Route path="/account" component={Account} /> */}
        {/* <Route exact path="/auth" component={AuthPage} /> */}
        <Route exact path="/Ar-Cademy/modules/:topic/:videoIndex" element={<Playground />}  />
      </Routes>
      
     </main>
     </div>
  );
}

export default App;
