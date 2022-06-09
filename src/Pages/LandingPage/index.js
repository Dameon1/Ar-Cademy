import { Link } from "react-router-dom";
import { Modules } from "../../Modules";

export function LandingPage() {

  const modules = Object.keys(Modules);

  const moduleCards = modules.map((module, index) => {
    return (
      <Link to={`/modules/${module}`} key={index} className="moduleContent" >
        <li>
          <p className="moduleHeaders">{modules[index]}</p>
          <img src={Modules[module].moduleImage} className="heroImage"
            alt={`Follow of ${Modules[module].title}`} />
          <p className="sample-path-description">{Modules[module].description}</p>
        </li>
      </Link>
    );
  });

  console.log("Welcome to the Permaweb, This site is perma-stored on Arweave https://arweave.net/cMPDTzxFy311wPT1LI2DDULQf1Ed8PFlqLQaiDiLjQ0.");

  return (
    <>
      <div className="text-container">
        <h2>Welcome to Ar-cademy</h2>
        <p className="site-introduction">
          Arcademy is community-driven and developed learning platform, for the Arweave ecosystem.
          Maintaining a variety of modules, you can learn to code, design, and build with the Arweave blockchain.
          Upload your own instructional videos and make the community leader board or learn a new skill with our community
          of developers and creators to show Proof of Knowledge (PoK) to the world.
        </p>
        <p className="site-introduction">
          Instructional videos are currently curated and comes with a sandbox to get a more intuitive feel of the content
          and to practice with your own code.
        </p>
      </div>
      <div>
        <ul className="moduleCards">
          {moduleCards}
        </ul>
      </div>
    </>
  );
}

export default LandingPage;