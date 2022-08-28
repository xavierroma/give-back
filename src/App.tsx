import { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { connectorsForWallets, RainbowKitProvider, wallet } from '@rainbow-me/rainbowkit';
// eslint-disable-next-line import/no-unresolved
import '@rainbow-me/rainbowkit/styles.css';
import theme from './materialUiTheme';
import GiveBack from './components/GiveBack';
import { ConfigurationContext } from './components/ConfigurationContext';
import { DAI } from './components/dai';

const { chains, provider, webSocketProvider } = configureChains(
    [chain.polygonMumbai, chain.optimism, chain.mainnet, chain.polygon, chain.arbitrum],
    [publicProvider()],
);

const connectors = connectorsForWallets([
    {
        groupName: 'Popular',
        wallets: [
            wallet.metaMask({ chains }),
            wallet.walletConnect({ chains }),
            wallet.coinbase({ chains, appName: 'My RainbowKit App' }),
            wallet.rainbow({ chains }),
        ],
    },
    {
        groupName: 'More',
        wallets: [
            wallet.argent({ chains }),
            wallet.trust({ chains }),
            wallet.ledger({ chains }),
            wallet.steak({ chains }),
        ],
    },
]);

const wagmiClient = createClient({
    autoConnect: true,
    webSocketProvider,
    connectors,
    provider,
});

const App = () => {
    const [config] = useState({ receiverAddress: '0x9E2504e3943c510a9AFeA5733e69a1f94b607437' });
    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <ThemeProvider theme={theme}>
                    <ConfigurationContext.Provider value={config}>
                        <GiveBack
                            config={{
                                name: 'X',
                                suggestedDonation: {
                                    amount: 5,
                                    token: DAI[0],
                                },
                            }}
                        />
                    </ConfigurationContext.Provider>
                </ThemeProvider>
            </RainbowKitProvider>
        </WagmiConfig>
    );
};

export default App;
