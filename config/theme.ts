import { extendTheme, useColorModeValue } from '@chakra-ui/react'

// example theme
const theme = extendTheme({
  colors: {
    primary: '#fff', //
    secondary: '#fafafb', //
    primary_d: '#2d2d2d',
    secondary_d: '#202020',
    bg1: 'linear-gradient(45deg, #fd2e44, #fe3852)',
    error: 'crimson',
    text1: '#44545b',
    text1_d: '#cad0c3'
  },
  fonts: {
    body: "system-ui, sans-serif",
    heading: "Georgia, serif",
    mono: "Menlo, monospace",
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  shadows: {
    card: '0px 0px 1px 1px rgb(194 194 194 / 10%), 0px 0px 10px 0px rgb(194 194 194 / 10%)'
  }
});

export default  theme