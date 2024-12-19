import React from 'react';
import './App.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAccount, WagmiProvider } from 'wagmi'
import { config } from './config/wagmiConfig';
import AppContent from './components/common/AppContent/AppContent';
import { WalletOption } from './components/WalletOption/WalletOption';

const queryClient = new QueryClient();

export const App = () => {
  function ConnectWallet() {
    const { isConnected } = useAccount();
    if (isConnected) return <AppContent />
    return <WalletOption />
  }

  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectWallet />
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
};

export default App;