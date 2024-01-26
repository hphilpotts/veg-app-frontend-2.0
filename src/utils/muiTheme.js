import { createTheme } from "@mui/material";
import { green, grey } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary : {
            main: green[800],
            light: green[500],
            dark: green[900],
            contrastText: '#FFFFFF'
        },
        secondary: {
            main: '#FFFFFF'
        },
        highlighted: {
            main: green[400],
            contrastText: '#FFFFFF'
        },
        grey : {
            main: grey[700]
        }
    },
    typography: {
        fontFamily: [
            'Inter', 
            'sans-serif',
            'Outfit', 
            'sans-serif'
        ].join(','),
      },
});

export const flexColumnCentered = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
};

export const topMargin = {
    marginTop: '3%'
};