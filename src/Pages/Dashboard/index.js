import { useContext } from "react";
import './dashboard.css';
import { AMW } from '../../utils/api';
//import Card from "../../components/Cards";
import MainContext from '../../context';
import Login from "src/components/Login/Login";

// function ContentVideoCards() {
//   return (
//     <div className="contentScrollContainer">
//       <h1>Videos:</h1>
//       <div className="hs">
//         <Card />
//         <Card />
//         <Card />
//       </div>
//     </div >
//   )
// }

// function ContentSandboxCards() {
//   return (
//     <div className="contentScrollContainer">
//       <h1>Sandbox Content</h1>
//       <div className="hs">
//         <Card />
//       </div>
//     </div >
//   )
// }

export function Dashboard() {
  return (
    <div className="dashboard">
      <Login />
      {/* <PassportCard isArweaveWalletConnected={props.isArweaveWalletConnected} />
      <ContentVideoCards />
      <ContentSandboxCards />
      <ContentSandboxCards /> */}
    </div>
  );
}
export default Dashboard;
