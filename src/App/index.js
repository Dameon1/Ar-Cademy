
import { Routes, Route } from "react-router-dom";
import { MainHeader } from '../components/MainHeader';
import { LandingPage } from '../components/LandingPage';
import  ModulePage  from '../components/ModulePage';
import './App.css';

function App() {
  return (
    <div className="App">
      <MainHeader />
      <main className="main-content">
     
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route exact path="/modules/:id" element={<ModulePage />} />
        {/* <Route path="/account" component={Account} />
          <Route exact path="/auth" component={AuthPage} /> */}
        {/* <Route exact path="/modules:id/:videoIndex" component={<Classroom />}  /> */}
      </Routes>
     </main>
     </div>
  );
}

export default App;
