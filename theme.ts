import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  'palette': {
    'primary': {
      'main': '#3954E3'
    },
    'secondary': {
      'main': '#7C8286'
    },
    'neutral': {
      'main': '#586071',
      'contrastText': '#fff'
    },
    'danger': {
      'main': '#FF0007',
      'contrastText': '#fff'
    },
    // error: {
    //   main: red.A400,
    // },
    'info': {
      'main': '#F5F6F7',
      'contrastText': '#000'
    }
  },
  'typography': {
    'fontSize': 16,
    'button': {
      'textTransform': 'none',
      'fontFamily': 'Open Sans, sans-serif',
      'fontWeight': 400,
      'fontSize': '1rem',
      '@media (max-width: 767px)': {
        'fontSize': '0.875rem'
      }
    },
    'subtitle1': {
      'fontSize': '1.25rem',
      'lineHeight': 1.36,
      'fontWeight': 300
    },
    'subtitle2': {
      'fontSize': '0.875rem',
      'lineHeight': 1.36
    },
    'body1': {
      'fontSize': '0.875rem'
    },
    'body2': {
      'fontSize': '0.75rem'
    }
  },
  'breakpoints': {
    'values': {
      'xs': 0,
      'sm': 576,
      'md': 768,
      'lg': 992,
      'xl': 1200,
      'xxl': 1400
    }
  }
});

declare module '@mui/material/styles' {
  interface Palette {
    primary: Palette['primary']
    neutral: Palette['primary']
    danger: Palette['primary']
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    primary?: PaletteOptions['primary']
    neutral?: PaletteOptions['primary']
    danger?: PaletteOptions['primary']
  }
  interface BreakpointOverrides {
    xs: true
    sm: true
    md: true
    lg: true
    xl: true
    xxl: true
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    primary: true
    neutral: true
    danger: true
  }
}

export default theme;
