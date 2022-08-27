import { FC } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const PoweredBy: FC = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            p: 3,
        }}
    >
        <Typography variant="subtitle1">Powered by&nbsp;</Typography>
        <Typography sx={{ fontWeight: 'bold' }} variant="subtitle1">
            {' '}
            Give Back{' '}
        </Typography>
    </Box>
);

export default PoweredBy;
