import palette from '../palette';
import typography from '../typography';
import MuiButton from './MuiButton';

import ProximaNovaLight from '../../../assets/fonts/ProximaNova-Light.ttf';
import ProximaNovaRegular from '../../../assets/fonts/ProximaNova-Regular.ttf';
import ProximaNovaSemibold from '../../../assets/fonts/ProximaNova-Semibold.ttf';

const pnLight = {
  fontFamily: 'ProximaNova',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 100,
  src: `
    local('ProximaNova'),
    url(${ProximaNovaLight}) format('truetype')
  `,
};

const pnRegular = {
  fontFamily: 'ProximaNova',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('ProximaNova'),
    url(${ProximaNovaRegular}) format('truetype')
  `,
};

const pnSemibold = {
  fontFamily: 'ProximaNova',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 600,
  src: `
    local('ProximaNova'),
    url(${ProximaNovaSemibold}) format('truetype')
  `,
};

export default {
  MuiCssBaseline: {
    '@global': {
      '@font-face': [pnLight, pnRegular, pnSemibold],
    },
  },

  MuiTypography: {
    colorTextSecondary: {
      fontFamily: typography.fontFamily,
      fontWeight: 600,
      color: palette.common.white,
    },
  },

  MuiContainer: {
    root: {
      position: 'relative',
      height: '100%',
      '@media (min-width: 768px)': {
        paddingLeft: 20,
        paddingRight: 20,
      },
      '@media (min-width: 480px)': {
        paddingLeft: 16,
        paddingRight: 16,
      },
    },
    maxWidthLg: {
      '@media (min-width: 1024px)': {
        maxWidth: 1200,
      },
    },
  },

  MuiGrid: {
    'spacing-xs-5': {
      '@media (min-width: 1200px)': {
        width: 'calc(100% + 60px)',
        margin: -30,

        '& > .MuiGrid-item': {
          padding: 30,
        },
      },
    },
  },

  MuiPaper: {
    elevation1: {
      boxShadow: 'none',
    },
  },

  MuiLink: {
    root: {
      transitionProperty: 'color',
      transitionDuration: 200,
      cursor: 'pointer',
      '&:hover': {
        color: palette.primary.light,
      },
    },
    underlineNone: {
      '&:hover': {
        color: palette.primary.light,
      },
    },
    underlineAlways: {
      position: 'relative',
      textDecoration: 'none',
      '&::after': {
        position: 'absolute',
        content: '""',
        left: 0,
        right: 0,
        bottom: 0,
        height: 1,
        borderBottomStyle: 'solid',
        borderBottomColor: palette.primary.pale,
        borderBottomWidth: 1,
      },
      '&:hover': {
        '&::after': {
          borderBottomColor: palette.primary.light,
        },
      },
    },
  },

  MuiTableCell: {
    root: {
      verticalAlign: 'top',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 30,
      paddingBottom: 30,
      borderBottom: 0,

      '&:last-child': {
        paddingRight: 0,
      },
    },
    sizeSmall: {
      verticalAlign: 'top',
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: 15,
      paddingBottom: 15,
      borderBottom: 0,

      '&:last-child': {
        paddingRight: 0,
      },
    },
  },

  MuiButton,
};
