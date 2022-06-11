import { useContext } from 'react';
import { NavLinks } from "../NavLinks";
import { Link } from "react-router-dom";
import ThemeSwitch from "../ThemeSwitch";
import MainContext from 'src/context';
import { Button  } from '@nextui-org/react';
import { AiOutlinePoweroff } from 'react-icons/ai';

export function MainHeader() {
  const { addr, disconnectWallet } = useContext(MainContext);
  console.log(addr,"addr");
  console.log(disconnectWallet,"disconnectWallet");
  return (
    <header className="main-header">
      <NavLinks />
      <h1 className="site-logo">Arcademy</h1>
      <div className="form-redirect-container">
        {addr ?
              <Button auto onClick={disconnectWallet} icon={<AiOutlinePoweroff size={18} />} color="error">Logout</Button>
          // <button className="form-redirect-button">{addr}</button>
          : <Link to="/identity" className="form-redirect-link identityLink">
            {"Identity"}
          </Link>}
        <ThemeSwitch />
      </div>
    </header>
  );
}

export default MainHeader;