import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette';
import typography from './typography';
import overrides from './overrides';

const index = createMuiTheme({
  palette,
  typography,
  overrides,
});

export default index;
