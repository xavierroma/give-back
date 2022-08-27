import { ThemeProvider } from '@mui/material';
import theme from './materialUiTheme';
import GiveBack from './components/GiveBack';

const App = () => (
    <ThemeProvider theme={theme}>
        <GiveBack
            config={{
                name: 'X',
                wallets: [
                    { chain: 'eth', address: 'xroma.eth' },
                    { chain: 'cosmos', address: '' },
                    { chain: 'btc', address: '' },
                ],
                suggestedDonation: {
                    amount: 5,
                    tokenSymbol: 'DAI',
                    tokenAddress: '',
                },
            }}
        />
    </ThemeProvider>
);

export default App;
