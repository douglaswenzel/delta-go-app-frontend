import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const baseTheme = createTheme({  // <-- Defina como baseTheme primeiro
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#9c27b0',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    error: {
      main: '#d32f2f',
    },
    warning: {
      main: '#ed6c02',
    },
    info: {
      main: '#0288d1',
    },
    success: {
      main: '#2e7d32',
    },
  },
  shape: {
    borderRadius: 8,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,  
    },
  },
  spacing: 8,
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.2)',
    '0px 3px 1px -2px rgba(0,0,0,0.2)',
    '0px 3px 3px -2px rgba(0,0,0,0.2)',
    '0px 2px 4px -1px rgba(0,0,0,0.2)',
    '0px 4px 5px 0px rgba(0,0,0,0.14)',
    '0px 1px 10px 0px rgba(0,0,0,0.12)',
    '0px 2px 16px 1px rgba(0,0,0,0.14)',
    '0px 3px 5px -1px rgba(0,0,0,0.2)',
    '0px 5px 8px 0px rgba(0,0,0,0.14)',
    '0px 1px 14px 0px rgba(0,0,0,0.12)',
    '0px 3px 14px 2px rgba(0,0,0,0.12)',
    '0px 4px 5px -2px rgba(0,0,0,0.2)',
    '0px 7px 10px 1px rgba(0,0,0,0.14)',
    '0px 2px 16px 1px rgba(0,0,0,0.12)',
    '0px 5px 5px -3px rgba(0,0,0,0.2)',
    '0px 8px 10px 1px rgba(0,0,0,0.14)',
    '0px 3px 14px 2px rgba(0,0,0,0.12)',
    '0px 6px 6px -3px rgba(0,0,0,0.2)',
    '0px 9px 12px 1px rgba(0,0,0,0.14)',
    '0px 4px 16px 3px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2)',
    '0px 12px 17px 2px rgba(0,0,0,0.14)',
    '0px 5px 22px 4px rgba(0,0,0,0.12)',
    '0px 8px 10px -5px rgba(0,0,0,0.2)'
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // Adicionei para evitar uppercase automático
          [createTheme().breakpoints.down('sm')]: {
            padding: '8px 16px',
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
  },
});

const theme = responsiveFontSizes(baseTheme);

export default theme;
