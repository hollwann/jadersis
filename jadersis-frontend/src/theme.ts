import { createTheme } from '@mui/material/styles';

// Create a theme instance
export const theme = createTheme({
  palette: {
    primary: {
      main: '#4a7ee1',
      light: '#7aa3e9',
      dark: '#2f58a8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#6c757d',
      light: '#9da3a9',
      dark: '#495057',
      contrastText: '#ffffff',
    },
    error: {
      main: '#dc3545',
      light: '#e57373',
      dark: '#c62828',
    },
    warning: {
      main: '#ffc107',
      light: '#ffcd38',
      dark: '#f57c00',
    },
    info: {
      main: '#17a2b8',
      light: '#4fc3f7',
      dark: '#0288d1',
    },
    success: {
      main: '#28a745',
      light: '#66bb6a',
      dark: '#2e7d32',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#212529',
      secondary: '#6c757d',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        },
      },
    },
  },
});
