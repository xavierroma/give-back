import { ChangeEvent, FC, useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ToggleButton from '@mui/material/ToggleButton';
import TextField from '@mui/material/TextField';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { SxProps, Theme } from '@mui/material';

import { GiveBackProps, SupportedWallets } from './GiveBack';
import PoweredBy from './PoweredBy';

const GiveModal: FC<GiveBackProps & { open: boolean; closeCallback: () => void; sx?: SxProps<Theme> }> = (props) => {
    const {
        config: { suggestedDonation, wallets, name },
        open,
        closeCallback,
        sx = {},
    } = props;
    const [amount, setAmount] = useState(suggestedDonation.amount);

    const [selectedChain, setSelectedChain] = useState<SupportedWallets['chain']>('eth');

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (!Number.isNaN(value)) {
            setAmount(value);
        }
    }, []);

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
                    <TextField
                        id="standard-adornment-amount"
                        value={amount}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">{suggestedDonation.tokenSymbol}</InputAdornment>
                            ),
                        }}
                        onChange={handleChange}
                    />
                    <TextField variant="outlined" multiline rows={3} placeholder="Your message" />
                    <ToggleButtonGroup
                        sx={{
                            mt: 2,
                            alignSelf: 'center',
                        }}
                        color="primary"
                        value={selectedChain}
                        onChange={(e, newValue: SupportedWallets['chain']) => setSelectedChain(newValue)}
                        exclusive
                        aria-label="Platform"
                    >
                        {wallets.map((w) => (
                            <ToggleButton value={w.chain}>{w.chain}</ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    <Button
                        sx={{
                            alignSelf: 'center',
                            width: 'fit-content',
                            mt: 2,
                        }}
                        disableElevation
                        variant="outlined"
                    >
                        Donate&nbsp;
                        <b>
                            {' '}
                            {amount} {suggestedDonation.tokenSymbol}
                        </b>
                    </Button>
                </Box>
            </Box>
            <PoweredBy />
        </Paper>
    );
};

export default GiveModal;
