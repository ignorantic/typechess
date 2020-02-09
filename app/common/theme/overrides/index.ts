import { Overrides } from '@material-ui/core/styles/overrides';

const overrides: Overrides = {
  MuiCssBaseline: {
    '@global': {
      html: {
        height: '100%',
        WebkitTextSizeAdjust: '100%',
      },
      body: {
        height: '100%',
      },
      'body *': {
        margin: 0,
        padding: 0,
        border: 0,
        outline: 0,
        backgroundColor: 'transparent',
        boxSizing: 'border-box',
      },
      img: {
        maxWidth: '100%',
      },
      ul: {
        listStyle: 'none',
      },
      input: {
        appearance: 'none',
      },
      textarea: {
        appearance: 'none',
      },
      button: {
        appearance: 'none',
      },
      label: {
        cursor: 'pointer',
      },
    },
  },
};

export default overrides;
