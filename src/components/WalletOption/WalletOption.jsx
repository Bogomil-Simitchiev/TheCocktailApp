import { useConnect } from 'wagmi';
import './WalletOption.css'
import metamaskIcon from '../../assets/images/metamaskIcon.png';

export function WalletOption() {
    const { connectors, connect } = useConnect();

    return (
        <div className="wallet-options">
            <h2>Connect Your MetaMask Wallet to Access the App</h2><img src={metamaskIcon} />
            <div className="wallet-buttons">
                {connectors.map((connector) => (
                    <button
                        key={connector.id}
                        onClick={() => connect({ connector })}
                        className="wallet-button"
                    >
                        Connect with {connector.name}
                    </button>
                ))}
            </div>
        </div>
    );
}