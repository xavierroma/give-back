import { FC, useState } from 'react';
import Box from '@mui/material/Box';
import GiveButton from './GiveButton';
import GiveModal from './GiveModal';
import { ERC20Token } from './interfaces/ERC20Token';

type Donation = {
    amount: number;
    token: ERC20Token;
};

export interface GiveBackProps {
    config: {
        suggestedDonation: Donation;
        name: string;
    };
}

const GiveBack: FC<GiveBackProps> = ({ config }) => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Box sx={{ position: 'absolute', top: '10%', left: '10%' }}>
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
