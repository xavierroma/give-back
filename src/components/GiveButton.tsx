import { FC } from 'react';
import Fab, { FabProps } from '@mui/material/Fab';

interface Props {
    onClick?: FabProps['onClick'];
}

const GiveButton: FC<Props> = ({ onClick }) => (
    <Fab variant="extended" size="medium" color="primary" aria-label="add" onClick={onClick}>
        Give back
    </Fab>
);

export default GiveButton;
