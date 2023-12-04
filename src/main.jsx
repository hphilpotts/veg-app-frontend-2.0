import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './utils/muiTheme.js';
import App from './App.jsx';
import './index.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <CssBaseline />
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
    </Router>
  </React.StrictMode>,
);
