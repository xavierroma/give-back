import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import GiveButton from './GiveButton';
import GiveModal from './GiveModal';

export type SupportedWallets = {
    address: string;
    chain: 'eth' | 'cosmos' | 'btc';
};

type Donation = {
    amount: number;
    tokenAddress: string;
    tokenSymbol: string;
};

export interface GiveBackProps {
    config: {
        suggestedDonation: Donation;
        name: string;
        wallets: SupportedWallets[];
    };
}

const GiveBack: FC<GiveBackProps> = ({ config }) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Box sx={{ position: 'absolute', top: '50%', left: '50%' }}>
            <GiveButton onClick={handleOpen} />
            <GiveModal
                sx={{
                    top: 10,
                    left: 0,
                }}
                config={config}
                open={open}
                closeCallback={() => setOpen(false)}
            />
        </Box>
    );
};

export default GiveBack;
