import React, { FC } from 'react';
import { Chain, chain, useNetwork, useSwitchNetwork } from 'wagmi';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';

import { ReactComponent as Arbitrum } from './assets/arbitrum.svg';
import { ReactComponent as Ethereum } from './assets/ethereum.svg';
import { ReactComponent as Optimism } from './assets/optimism.svg';
import { ReactComponent as Polygon } from './assets/polygon.svg';

const ChainAvatar: FC<{ id: number | string }> = ({ id }) => {
    switch (id) {
        case chain.arbitrum.id:
            return <Arbitrum />;
        case chain.optimism.id:
            return <Optimism />;
        case chain.polygon.id:
            return <Polygon />;
        case chain.mainnet.id:
        default:
            return <Ethereum />;
    }
};

const NetworkItem: FC<Chain> = ({ id, name }) => (
    <>
        <ChainAvatar id={id} />
        <Typography sx={{ ml: 2 }}>{name}</Typography>
    </>
);

const NetworkPicker: FC = () => {
    const { chain: selectedChain } = useNetwork();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // TODO: handle: error, isLoading, pendingChainId
    const { chains, switchNetwork } = useSwitchNetwork();
    const open = Boolean(anchorEl);
    const handleOpenNetworkMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    if (!selectedChain) {
        return null;
    }

    const handleSwitchNetwork = (event: React.MouseEvent) => {
        const newChainId = Number(event.currentTarget.getAttribute('data-chain-id'));
        switchNetwork?.(newChainId);
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="manage-network-button"
                aria-controls={open ? 'manage-network-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleOpenNetworkMenu}
            >
                <ChainAvatar id={selectedChain.id} />
                <ExpandMoreRoundedIcon />
            </Button>
            <Menu
                id="manage-network-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleSwitchNetwork}
                MenuListProps={{
                    'aria-labelledby': 'manage-network-button',
                }}
            >
                {switchNetwork &&
                    chains.map((c) => (
                        <MenuItem key={c.id} onClick={handleSwitchNetwork} data-chain-id={c.id}>
                            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                            <NetworkItem {...c} />
                        </MenuItem>
                    ))}
                {!switchNetwork && (
                    <Typography sx={{ p: 2, maxWidth: '200px', textAlign: 'center' }}>
                        Your wallet does not support switching networks from this app. Try switching networks from
                        within your wallet instead.
                    </Typography>
                )}
            </Menu>
        </div>
    );
};

export default NetworkPicker;
