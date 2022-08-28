import { ChangeEvent, FC, useCallback, useState } from 'react';
import { useNetwork } from 'wagmi';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import TextField from '@mui/material/TextField';
import { SxProps, Theme } from '@mui/material';

import { GiveBackProps } from './GiveBack';
import PoweredBy from './PoweredBy';
import PayButton from './PayButton';
import ConnectWallet from './ConnectWallet';
import { DAI } from './dai';

const GiveModal: FC<GiveBackProps & { open: boolean; closeCallback: () => void; sx?: SxProps<Theme> }> = (props) => {
    const {
        config: { suggestedDonation, name },
        open,
        closeCallback,
        sx = {},
    } = props;
    const [amount, setAmount] = useState(suggestedDonation.amount);
    const { chain: selectedChain } = useNetwork();
    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (!Number.isNaN(value)) {
            setAmount(value);
        }
    }, []);
    const token = DAI.find((v) => v.chainId === selectedChain?.id);
    return (
        <Paper
            elevation={15}
            sx={{
                minWidth: '300px',
                ...sx,
                backgroundColor: '#f7f7f778',
                display: open ? undefined : 'none',
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    borderRadius: (t) => `${t.shape.borderRadius}px`,
                    boxShadow: 1,
                    backgroundColor: '#ffffff',
                    p: 2,
                }}
            >
                <IconButton
                    onClick={closeCallback}
                    sx={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                    }}
                >
                    <CloseRoundedIcon />
                </IconButton>

                <Box
                    sx={{
                        mt: 3,
                        gap: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        width: '100%',
                    }}
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Donate to {name}
                    </Typography>
                    <ConnectWallet sx={{ alignSelf: 'flex-end' }} />
                    <TextField
                        id="standard-adornment-amount"
                        value={amount}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">{token?.symbol}</InputAdornment>,
                        }}
                        onChange={handleChange}
                    />
                    <TextField variant="outlined" multiline rows={3} placeholder="Your message" />
                    {token && <PayButton amount={amount} message="Hey there Im using give back" token={token} />}
                </Box>
            </Box>
            <PoweredBy />
        </Paper>
    );
};

export default GiveModal;
