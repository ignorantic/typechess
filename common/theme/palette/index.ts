import { PaletteOptions } from '@material-ui/core/styles/createPalette';
import blue from '@material-ui/core/colors/blue';
import indigo from '@material-ui/core/colors/indigo';

const palette: PaletteOptions = {
  primary: {
    light: indigo[100],
    main: indigo[400],
    dark: indigo[500],
  },
  secondary: {
    light: blue[200],
    main: blue[500],
    dark: blue[800],
  },
};

export default palette;
