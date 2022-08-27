import { Fab, ThemeProvider } from '@mui/material';
import theme from './materialUiTheme';

const App = () => (
    <ThemeProvider theme={theme}>
        <div className="App">
            <Fab variant="extended" size="medium" color="primary" aria-label="add">
                Give back
            </Fab>
        </div>
    </ThemeProvider>
);

export default App;
