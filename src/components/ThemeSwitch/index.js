import { Switch } from '@nextui-org/react';
import { useContext } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';
import MainContext from '../../context';


function ThemeSwitch() {
  const { theme, setTheme } = useContext(MainContext);

  return (
    <Switch
      checked={true}
      size="xl"
      iconOn={<BiMoon />}
      iconOff={<BiSun />}
      onChange={() => setTheme(!theme)}
      color="secondary"
      style={{ color: 'black' }}
    />
  );
}

export default ThemeSwitch;