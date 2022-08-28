import React, { FC } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Logout } from '@mui/icons-material';
import { ListItemIcon } from '@mui/material';

const SelectedWallet: FC = () => {
    const { address } = useAccount();
    const { disconnect } = useDisconnect();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpenNetworkMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseNetworkMenu = () => {
        setAnchorEl(null);
    };

    if (!address || !disconnect) {
        return null;
    }

    return (
        <div>
            <Button
                id="manage-wallet-button"
                aria-controls={open ? 'manage-wallet-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpenNetworkMenu}
                sx={{
                    width: 'fit-content',
                }}
                variant="text"
            >
                <Typography sx={{ fontWeight: 'bold', textTransform: 'none' }} variant="subtitle1">
                    {address.substring(0, 6)}...{address.slice(-4)}
                </Typography>
            </Button>
            <Menu
                id="manage-wallet-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseNetworkMenu}
                MenuListProps={{
                    'aria-labelledby': 'manage-wallet-button',
                }}
            >
                <MenuItem onClick={() => disconnect()}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Disconnect
                </MenuItem>
            </Menu>
        </div>
    );
};

export default SelectedWallet;
