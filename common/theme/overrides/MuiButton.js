import palette from '../palette';

const MuiButton = {
  root: {
    paddingTop: 10,
    paddingRight: 40,
    paddingBottom: 10,
    paddingLeft: 40,
  },

  label: {
    fontWeight: 600,
  },

  contained: {
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.15)',

    '&$disabled': {
      backgroundColor: palette.common.grey[300],
    },
  },

  containedPrimary: {
    color: palette.common.white,
    fontSize: 20,

    '&:hover': {
      backgroundColor: palette.primary.lighter,
    },
  },

  containedSecondary: {
    backgroundColor: palette.common.green[600],
    color: palette.common.white,
    fontSize: 20,

    '&:hover': {
      backgroundColor: palette.common.green[500],
    },
  },

  sizeSmall: {
    fontSize: 14,
    padding: 10,
  },
};

export default MuiButton;
