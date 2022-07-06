import { useContext } from 'react';
import { NavLinks } from "../NavLinks";
import { Link } from "react-router-dom";
import ThemeSwitch from "../ThemeSwitch";
import MainContext from 'src/context';
import { Button  } from '@nextui-org/react';
import { AiOutlinePoweroff } from 'react-icons/ai';

export function MainHeader() {
  const { addr, disconnectWallet } = useContext(MainContext);
  return (
    <header className="main-header">
      <NavLinks />
      <h1 className="site-logo">
        <span className="dark">AR</span>
        <span className="light">cademy</span>    
      </h1>
      <div className="identity-container">
        {addr ?
          <Button auto onClick={disconnectWallet} className="identity-link signOutLink" icon={<AiOutlinePoweroff size={18} />} color="">Logout</Button>
          : <Link to="/identity" className="identity-link">
            {"Identity"}
          </Link>
          }
        <ThemeSwitch />
      </div>
    </header>
  );
}

export default MainHeader;