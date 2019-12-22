import red from './red';
import golden from './golden';
import yellow from './yellow';
import green from './green';
import teal from './teal';
import blue from './blue';
import grey from './grey';

const palette = {
  primary: {
    pale: golden[50],
    light: golden.A500,
    lighter: golden[300],
    main: golden[400],
    dark: golden[500],
  },
  secondary: {
    pale: blue[50],
    light: blue[200],
    main: blue[500],
    dark: blue[800],
  },
  success: {
    pale: green[50],
    light: green[200],
    main: green[400],
    dark: green[900],
  },
  warning: {
    pale: yellow[50],
    light: yellow[200],
    main: yellow[600],
    dark: yellow[900],
  },
  danger: {
    pale: red[50],
    light: red[200],
    main: red[500],
    dark: red[900],
  },
  common: {
    grey,
    golden,
    yellow,
    green,
    teal,
    blue,
    red,
    white: grey[0],
    black: grey[1000],
  },
  vendor: {
    telegram: '#2ca5e0',
    viber: '#834995',
    whatsapp: '#00d370',
  },
};

export default palette;
