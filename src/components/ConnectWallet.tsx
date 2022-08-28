import { FC } from 'react';
import Button from '@mui/material/Button';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material';
import NetworkPicker from './NetworkPicker';
import SelectedWallet from './SelectedWallet';

interface Props {
    sx?: SxProps<Theme>;
}

const ConnectWallet: FC<Props> = ({ sx }) => {
    const { openConnectModal } = useConnectModal();

    if (openConnectModal) {
        return (
            <Button
                sx={{
                    alignSelf: 'center',
                    width: 'fit-content',
                    mt: 2,
                }}
                disableElevation
                variant="outlined"
                onClick={() => {
                    openConnectModal();
                }}
            >
                Connect Wallet
            </Button>
        );
    }

    return (
        <Box sx={{ ...sx, display: 'flex' }}>
            <NetworkPicker />
            <SelectedWallet />
        </Box>
    );
};

export default ConnectWallet;
