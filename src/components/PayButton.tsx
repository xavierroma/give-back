import { FC, useContext, useMemo } from 'react';
import Button from '@mui/material/Button';
import { erc20ABI, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { BigNumber } from 'ethers';
import { ERC20Token } from './interfaces/ERC20Token';
import { ConfigurationContext } from './ConfigurationContext';

interface Props {
    amount: number;
    token: ERC20Token;
    message: string;
}

const PayButton: FC<Props> = (props) => {
    const { amount, token, message } = props;
    const { receiverAddress } = useContext(ConfigurationContext);
    const { config } = usePrepareContractWrite({
        addressOrName: token.address,
        contractInterface: erc20ABI,
        functionName: 'transfer',
        args: [receiverAddress, BigNumber.from(10).pow(token.decimals).mul(amount)],
    });
    const configWithMessage = useMemo(() => {
        if (config.request?.data) {
            config.request.data += Buffer.from(` ${message}`).toString('hex');
        }
        return config;
    }, [config]);
    const { write } = useContractWrite(configWithMessage);

    return (
        <Button
            sx={{
                alignSelf: 'center',
                width: 'fit-content',
                mt: 2,
            }}
            disableElevation
            disabled={!write}
            variant="outlined"
            onClick={() => {
                write?.();
            }}
        >
            Donate&nbsp;
            <b>
                {' '}
                {amount} {token.symbol}
            </b>
        </Button>
    );
};
export default PayButton;
