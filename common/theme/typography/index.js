import grey from '../palette/grey';

const fontFamily = [
  'ProximaNova',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',');

const typography = {
  fontFamily,
  fontSize: 16,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  body1: {
    fontSize: 14,
  },
  h1: {
    fontSize: 30,
    textTransform: 'uppercase',
    marginBottom: 60,
    fontWeight: 600,
    '@media (min-width: 480px)': {
      fontSize: 40,
    },
  },
  h2: {
    fontSize: 30,
    textTransform: 'uppercase',
    marginBottom: 40,
    fontWeight: 600,
  },
  h3: {
    fontSize: 25,
    textTransform: 'uppercase',
    marginBottom: 20,
    fontWeight: 600,
  },
  h4: {
    fontSize: 18,
    textTransform: 'uppercase',
    marginBottom: 25,
    fontWeight: 600,
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: 600,
  },
  caption: {
    fontSize: 14,
    marginBottom: 2,
    color: grey[700],
  },
  button: {
    fontSize: 14,
    fontWeight: 600,
  },
};

export default typography;
