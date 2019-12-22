import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette';
import typography from './typography';
import overrides from './overrides';

const index = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1200,
    },
  },
  palette,
  typography,
  spacing: factor => [
    0, //  0
    5, //  1
    10, // 2
    15, // 3
    20, // 4
    30, // 5
    40, // 6
    50, // 7
    60, // 8
    70, // 9
    80, // 10
    90, // 11
    100, // 12
  ][factor],
  shape: {
    borderRadius: 3,
  },
  overrides,
});

export default index;
