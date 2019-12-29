import { makeStyles } from '@material-ui/styles';

const useGlobalStyles = makeStyles((theme) => ({
  '@global': {
    html: {
      height: '100%',
      WebkitTextSizeAdjust: '100%',
    },
    body: {
      height: '100%',
      backgroundColor: theme.palette.common.white,
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
      fontFamily: theme.typography.fontFamily,
    },
    textarea: {
      appearance: 'none',
      fontFamily: theme.typography.fontFamily,
    },
    button: {
      appearance: 'none',
    },
    label: {
      cursor: 'pointer',
    },
  },
}));

export default useGlobalStyles;
