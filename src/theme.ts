import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    sidebarWidth: number;
    sidebarMobileHeight: number;
    brand: string;
    footerHeight: number;
    mobileTopBarHeight: number;
    mobileFooterHeight: number;
    sidebarMobilePadding: number;
    participantBorderWidth: number;
    rightDrawerWidth: number;
    galleryViewBackgroundColor: string;
  }

  interface ThemeOptions {
    sidebarWidth?: number;
    sidebarMobileHeight?: number;
    brand: string;
    footerHeight: number;
    mobileTopBarHeight: number;
    mobileFooterHeight: number;
    sidebarMobilePadding: number;
    participantBorderWidth: number;
    rightDrawerWidth?: number;
    galleryViewBackgroundColor: string;
  }
}

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#2A6DFF',
    },
    background: {
      default: '#050505',
      paper: '#0f172a',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 12,
          fontWeight: 600,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        'html, body, #root': {
          height: '100%',
        },
      },
    },
  },
});

theme.brand = '#2A6DFF';
theme.footerHeight = 72;
theme.mobileFooterHeight = 64;
theme.sidebarWidth = 300;
theme.sidebarMobileHeight = 90;
theme.sidebarMobilePadding = 12;
theme.participantBorderWidth = 2;
theme.mobileTopBarHeight = 56;
theme.rightDrawerWidth = 320;
theme.galleryViewBackgroundColor = '#0f172a';

export default theme;
