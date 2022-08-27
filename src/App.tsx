import React from 'react';
import {Fab, ThemeProvider} from '@mui/material';
import './App.css';
import {theme} from "./materialUiTheme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Fab variant="extended" size="medium" color="primary" aria-label="add">
          Give back
        </Fab>
      </div>
    </ThemeProvider>
  );
}

export default App;
