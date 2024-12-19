import { Link } from 'react-router-dom';
import './Header.css';
import { useAccount, useDisconnect } from 'wagmi';
import { formatAddress } from '../../../utils/utils';
import appIcon from '../../../assets/images/cocktail-icon.png'

const Header = () => {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();

  return (
    <header>
      <div className="header-left">
        <img className='app-icon' src={appIcon} alt="app icon" />
        <h2>Beans Love Cocktails</h2>
      </div>
      <div className="header-right">
        {address && <span className="address">Address: {formatAddress(address)}</span>}
        <nav>
          <Link to="/">Home</Link>
          <Link to="/random-cocktail">Random Cocktail</Link>
          <Link to="/favourites">Favourites</Link>
          <Link onClick={() => disconnect()}>Disconnect Wallet</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;