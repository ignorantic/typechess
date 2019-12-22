import { makeStyles } from '@material-ui/styles';

const useGlobalStyles = makeStyles(theme => ({
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

    // react-slick
    '.slick-slider': {
      position: 'relative',
      display: 'block',
      boxSizing: 'border-box',
      '-webkitUserSelect': 'none',
      '-mozUserSelect': 'none',
      '-msUserSelect': 'none',
      userSelect: 'none',
      '-webkitTouchCallout': 'none',
      '-msTouchAction': 'pan-y',
      touchAction: 'pan-y',
      '-webkitTapHighlightColor': 'transparent',
    },
    '.slick-list': {
      position: 'relative',
      display: 'block',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
    },
    '.slick-list-focus': {
      outline: 'none',
    },
    '.slick-list.dragging': {
      cursor: 'pointer',
    },
    '.slick-slider .slick-track': {
      transform: 'translate3d(0, 0, 0)',
    },
    '.slick-slider .slick-list': {
      transform: 'translate3d(0, 0, 0)',
    },
    '.slick-track': {
      position: 'relative',
      top: 0,
      left: 0,
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    '.slick-track::before': {
      display: 'table',
      content: '""',
    },
    '.slick-track::after': {
      clear: 'both',
    },
    '.slick-loading .slick-track': {
      visibility: 'hidden',
    },
    '.slick-slide': {
      display: 'none',
      float: 'left',
      height: '100%',
      minHeight: '1px',
    },
    '[dir="rtl"] .slick-slide': {
      float: 'right',
    },
    '.slick-slide div': {
      fontSize: 0,
    },
    '.slick-slide img': {
      display: 'block',
    },
    '.slick-slide.slick-loading img': {
      display: 'none',
    },
    '.slick-slide.dragging img': {
      pointerEvents: 'none',
    },
    '.slick-initialized .slick-slide': {
      display: 'block',
    },
    '.slick-loading .slick-slide': {
      visibility: 'hidden',
    },
    '.slick-vertical .slick-slide': {
      display: 'block',
      height: 'auto',
      border: '1px solid transparent',
    },
    '.slick-arrow.slick-hidden': {
      display: 'none',
    },

    // react-toastify
    '.Toastify__toast-container': {
      zIndex: '9999',
      transform: 'translate3d(0, 0, 9999px)',
      position: 'fixed',
      padding: 4,
      width: 320,
      boxSizing: 'border-box',
      color: theme.palette.common.white,
    },
    '.Toastify__toast-container--top-left': {
      top: '1em',
      left: '1em',
    },
    '.Toastify__toast-container--top-center': {
      top: '1em',
      left: '50%',
      marginLeft: -160,
    },
    '.Toastify__toast-container--top-right': {
      top: '1em',
      right: '1em',
    },
    '.Toastify__toast-container--bottom-left': {
      bottom: '1em',
      left: '1em',
    },
    '.Toastify__toast-container--bottom-center': {
      bottom: '1em',
      left: '50%',
      marginLeft: -160,
    },
    '.Toastify__toast-container--bottom-right': {
      bottom: '1em',
      right: '1em',
    },
    '@media only screen and (max-width: 480px)': {
      '.Toastify__toast-container': {
        width: '100vw',
        padding: '0',
        left: '0',
        margin: '0',
      },
      '.Toastify__toast-container--top-left, .Toastify__toast-container--top-center, .Toastify__toast-container--top-right': {
        top: '0',
      },
      '.Toastify__toast-container--bottom-left, .Toastify__toast-container--bottom-center, .Toastify__toast-container--bottom-right': {
        bottom: '0',
      },
      '.Toastify__toast-container--rtl': {
        right: '0',
        left: 'initial',
      },
      '.Toastify__toast': {
        marginBottom: '0',
      },
    },
    '.Toastify__toast': {
      position: 'relative',
      minHeight: 64,
      boxSizing: 'border-box',
      marginBottom: '1rem',
      padding: 8,
      borderRadius: theme.shape.borderRadius,
      borderWidth: 1,
      borderStyle: 'solid',
      boxShadow: '0 1px 10px 0 rgba(0, 0, 0, 0.1), 0 2px 15px 0 rgba(0, 0, 0, 0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      maxHeight: 800,
      overflow: 'hidden',
      fontFamily: theme.typography.fontFamily,
      cursor: 'pointer',
      direction: 'ltr',
    },
    '.Toastify__toast--rtl': {
      direction: 'rtl',
    },
    '.Toastify__toast--default': {
      background: theme.palette.common.white,
      color: theme.palette.common.grey[700],
      borderColor: theme.palette.common.grey[700],
    },
    '.Toastify__toast--info': {
      background: theme.palette.common.blue[200],
      color: theme.palette.common.blue[500],
      borderColor: theme.palette.common.blue[500],
    },
    '.Toastify__toast--success': {
      background: theme.palette.success.pale,
      color: theme.palette.success.main,
      borderColor: theme.palette.success.main,
    },
    '.Toastify__toast--warning': {
      background: theme.palette.warning.pale,
      color: theme.palette.warning.main,
      borderColor: theme.palette.warning.main,
    },
    '.Toastify__toast--error': {
      background: theme.palette.danger.pale,
      color: theme.palette.danger.main,
      borderColor: theme.palette.danger.main,
    },
    '.Toastify__toast-body': {
      margin: 'auto 0',
      flex: '1',
    },
    '.Toastify__close-button': {
      color: theme.palette.common.white,
      fontWeight: 'bold',
      fontSize: 14,
      background: 'transparent',
      outline: 'none',
      border: 'none',
      padding: '0',
      cursor: 'pointer',
      opacity: '0.7',
      transition: '0.3s ease',
      M: 'start',
      alignSelf: 'flex-start',
    },
    '.Toastify__close-button--default': {
      color: theme.palette.common.black,
      opacity: '0.3',
    },
    '.Toastify__close-button:hover, .Toastify__close-button:focus': {
      opacity: '1',
    },
    '@keyframes Toastify__trackProgress': {
      '0%': {
        transform: 'scaleX(1)',
      },
      '100%': {
        transform: 'scaleX(0)',
      },
    },
    '.Toastify__progress-bar': {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      height: 5,
      zIndex: '9999',
      opacity: '0.7',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      transformOrigin: 'left',
    },
    '.Toastify__progress-bar--animated': {
      animation: 'Toastify__trackProgress linear 1 forwards',
    },
    '.Toastify__progress-bar--controlled': {
      transition: 'transform .2s',
    },
    '.Toastify__progress-bar--rtl': {
      right: '0',
      left: 'initial',
      transformOrigin: 'right',
    },
    '.Toastify__progress-bar--default': {
      background: 'linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55)',
    },
    '@keyframes Toastify__bounceInRight': {
      'from, 60%, 75%, 90%, to': {
        animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      },
      from: {
        opacity: '0',
        transform: 'translate3d(3000px, 0, 0)',
      },
      '60%': {
        opacity: '1',
        transform: 'translate3d(-25px, 0, 0)',
      },
      '75%': {
        transform: 'translate3d(10px, 0, 0)',
      },
      '90%': {
        transform: 'translate3d(-5px, 0, 0)',
      },
      to: {
        transform: 'none',
      },
    },
    '@keyframes Toastify__bounceOutRight': {
      '20%': {
        opacity: '1',
        transform: 'translate3d(-20px, 0, 0)',
      },
      to: {
        opacity: '0',
        transform: 'translate3d(2000px, 0, 0)',
      },
    },
    '@keyframes Toastify__bounceInLeft': {
      'from, 60%, 75%, 90%, to': {
        animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      },
      '0%': {
        opacity: '0',
        transform: 'translate3d(-3000px, 0, 0)',
      },
      '60%': {
        opacity: '1',
        transform: 'translate3d(25px, 0, 0)',
      },
      '75%': {
        transform: 'translate3d(-10px, 0, 0)',
      },
      '90%': {
        transform: 'translate3d(5px, 0, 0)',
      },
      to: {
        transform: 'none',
      },
    },
    '@keyframes Toastify__bounceOutLeft': {
      '20%': {
        opacity: '1',
        transform: 'translate3d(20px, 0, 0)',
      },
      to: {
        opacity: '0',
        transform: 'translate3d(-2000px, 0, 0)',
      },
    },
    '@keyframes Toastify__bounceInUp': {
      'from, 60%, 75%, 90%, to': {
        animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      },
      from: {
        opacity: '0',
        transform: 'translate3d(0, 3000px, 0)',
      },
      '60%': {
        opacity: '1',
        transform: 'translate3d(0, -20px, 0)',
      },
      '75%': {
        transform: 'translate3d(0, 10px, 0)',
      },
      '90%': {
        transform: 'translate3d(0, -5px, 0)',
      },
      to: {
        transform: 'translate3d(0, 0, 0)',
      },
    },
    '@keyframes Toastify__bounceOutUp': {
      '20%': {
        transform: 'translate3d(0, -10px, 0)',
      },
      '40%, 45%': {
        opacity: '1',
        transform: 'translate3d(0, 20px, 0)',
      },
      to: {
        opacity: '0',
        transform: 'translate3d(0, -2000px, 0)',
      },
    },
    '@keyframes Toastify__bounceInDown': {
      'from, 60%, 75%, 90%, to': {
        animationTimingFunction: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
      },
      '0%': {
        opacity: '0',
        transform: 'translate3d(0, -3000px, 0)',
      },
      '60%': {
        opacity: '1',
        transform: 'translate3d(0, 25px, 0)',
      },
      '75%': {
        transform: 'translate3d(0, -10px, 0)',
      },
      '90%': {
        transform: 'translate3d(0, 5px, 0)',
      },
      to: {
        transform: 'none',
      },
    },
    '@keyframes Toastify__bounceOutDown': {
      '20%': {
        transform: 'translate3d(0, 10px, 0)',
      },
      '40%, 45%': {
        opacity: '1',
        transform: 'translate3d(0, -20px, 0)',
      },
      to: {
        opacity: '0',
        transform: 'translate3d(0, 2000px, 0)',
      },
    },
    '.Toastify__bounce-enter--top-left, .Toastify__bounce-enter--bottom-left': {
      animationName: 'Toastify__bounceInLeft',
    },
    '.Toastify__bounce-enter--top-right, .Toastify__bounce-enter--bottom-right': {
      animationName: 'Toastify__bounceInRight',
    },
    '.Toastify__bounce-enter--top-center': {
      animationName: 'Toastify__bounceInDown',
    },
    '.Toastify__bounce-enter--bottom-center': {
      animationName: 'Toastify__bounceInUp',
    },
    '.Toastify__bounce-exit--top-left, .Toastify__bounce-exit--bottom-left': {
      animationName: 'Toastify__bounceOutLeft',
    },
    '.Toastify__bounce-exit--top-right, .Toastify__bounce-exit--bottom-right': {
      animationName: 'Toastify__bounceOutRight',
    },
    '.Toastify__bounce-exit--top-center': {
      animationName: 'Toastify__bounceOutUp',
    },
    '.Toastify__bounce-exit--bottom-center': {
      animationName: 'Toastify__bounceOutDown',
    },
    '@keyframes Toastify__zoomIn': {
      from: {
        opacity: '0',
        transform: 'scale3d(0.3, 0.3, 0.3)',
      },
      '50%': {
        opacity: '1',
      },
    },
    '@keyframes Toastify__zoomOut': {
      from: {
        opacity: '1',
      },
      '50%': {
        opacity: '0',
        transform: 'scale3d(0.3, 0.3, 0.3)',
      },
      to: {
        opacity: '0',
      },
    },
    '.Toastify__zoom-enter': {
      animationName: 'Toastify__zoomIn',
    },
    '.Toastify__zoom-exit': {
      animationName: 'Toastify__zoomOut',
    },
    '@keyframes Toastify__flipIn': {
      from: {
        transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
        animationTimingFunction: 'ease-in',
        opacity: '0',
      },
      '40%': {
        transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
        animationTimingFunction: 'ease-in',
      },
      '60%': {
        transform: 'perspective(400px) rotate3d(1, 0, 0, 10deg)',
        opacity: '1',
      },
      '80%': {
        transform: 'perspective(400px) rotate3d(1, 0, 0, -5deg)',
      },
      to: {
        transform: 'perspective(400px)',
      },
    },
    '@keyframes Toastify__flipOut': {
      from: {
        transform: 'perspective(400px)',
      },
      '30%': {
        transform: 'perspective(400px) rotate3d(1, 0, 0, -20deg)',
        opacity: '1',
      },
      to: {
        transform: 'perspective(400px) rotate3d(1, 0, 0, 90deg)',
        opacity: '0',
      },
    },
    '.Toastify__flip-enter': {
      animationName: 'Toastify__flipIn',
    },
    '.Toastify__flip-exit': {
      animationName: 'Toastify__flipOut',
    },
    '@keyframes Toastify__slideInRight': {
      from: {
        transform: 'translate3d(110%, 0, 0)',
        visibility: 'visible',
      },
      to: {
        transform: 'translate3d(0, 0, 0)',
      },
    },
    '@keyframes Toastify__slideInLeft': {
      from: {
        transform: 'translate3d(-110%, 0, 0)',
        visibility: 'visible',
      },
      to: {
        transform: 'translate3d(0, 0, 0)',
      },
    },
    '@keyframes Toastify__slideInUp': {
      from: {
        transform: 'translate3d(0, 110%, 0)',
        visibility: 'visible',
      },
      to: {
        transform: 'translate3d(0, 0, 0)',
      },
    },
    '@keyframes Toastify__slideInDown': {
      from: {
        transform: 'translate3d(0, -110%, 0)',
        visibility: 'visible',
      },
      to: {
        transform: 'translate3d(0, 0, 0)',
      },
    },
    '@keyframes Toastify__slideOutRight': {
      from: {
        transform: 'translate3d(0, 0, 0)',
      },
      to: {
        visibility: 'hidden',
        transform: 'translate3d(110%, 0, 0)',
      },
    },
    '@keyframes Toastify__slideOutLeft': {
      from: {
        transform: 'translate3d(0, 0, 0)',
      },
      to: {
        visibility: 'hidden',
        transform: 'translate3d(-110%, 0, 0)',
      },
    },
    '@keyframes Toastify__slideOutDown': {
      from: {
        transform: 'translate3d(0, 0, 0)',
      },
      to: {
        visibility: 'hidden',
        transform: 'translate3d(0, 500px, 0)',
      },
    },
    '@keyframes Toastify__slideOutUp': {
      from: {
        transform: 'translate3d(0, 0, 0)',
      },
      to: {
        visibility: 'hidden',
        transform: 'translate3d(0, -500px, 0)',
      },
    },
    '.Toastify__slide-enter--top-left, .Toastify__slide-enter--bottom-left': {
      animationName: 'Toastify__slideInLeft',
    },
    '.Toastify__slide-enter--top-right, .Toastify__slide-enter--bottom-right': {
      animationName: 'Toastify__slideInRight',
    },
    '.Toastify__slide-enter--top-center': {
      animationName: 'Toastify__slideInDown',
    },
    '.Toastify__slide-enter--bottom-center': {
      animationName: 'Toastify__slideInUp',
    },
    '.Toastify__slide-exit--top-left, .Toastify__slide-exit--bottom-left': {
      animationName: 'Toastify__slideOutLeft',
    },
    '.Toastify__slide-exit--top-right, .Toastify__slide-exit--bottom-right': {
      animationName: 'Toastify__slideOutRight',
    },
    '.Toastify__slide-exit--top-center': {
      animationName: 'Toastify__slideOutUp',
    },
    '.Toastify__slide-exit--bottom-center': {
      animationName: 'Toastify__slideOutDown',
    },

    // react-day-picker
    '.DayPicker': {
      display: 'inline-block',
      fontSize: '1rem',
    },
    '.DayPicker-wrapper': {
      position: 'relative',
      flexDirection: 'row',
      paddingBottom: '0.5em',
      userSelect: 'none',
    },
    '.DayPicker-wrapper::before': {
      content: '""',
      position: 'absolute',
      height: '1px',
      top: '85px',
      left: '15px',
      right: '17px',
      borderBottom: '1px solid theme.palette.common.gray[100]',
    },
    '.DayPicker-Months': {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    '.DayPicker-Month': {
      display: 'table',
      margin: '1em 0.5em 0',
      borderSpacing: 0,
      borderCollapse: 'collapse',
      userSelect: 'none',
    },
    '.DayPicker-NavButton': {
      position: 'absolute',
      top: '1em',
      right: '1.5em',
      left: 'auto',
      display: 'inline-block',
      marginTop: '2px',
      width: '1.25em',
      height: '1.25em',
      backgroundPosition: 'center',
      backgroundSize: '50%',
      backgroundRepeat: 'no-repeat',
      cursor: 'pointer',
    },
    '.DayPicker-NavButton:hover': {
      opacity: '0.8',
    },
    '.DayPicker-NavButton--prev': {
      left: '1.5em',
      width: '1em',
      backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjE0IiB2aWV3Qm94PSIwIDAgOCAxNCI+PGc+PGcgb3BhY2l0eT0iLjIiPjxwYXRoIGQ9Ik0uMDUgNi41MDNMNi41MzYtLjAxMmwxLjQxNCAxLjQyTDIuNDIzIDYuOTZsNS41OSA1LjYxNC0xLjQzMyAxLjQ0LTYuNTkyLTYuNjIyLjQ3My0uNDc2eiIvPjwvZz48L2c+PC9zdmc+")',
    },
    '.DayPicker-NavButton--next': {
      right: '1.5em',
      width: '1em',
      backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjE0IiB2aWV3Qm94PSIwIDAgOCAxNCI+PGc+PGcgb3BhY2l0eT0iLjIiPjxwYXRoIGQ9Ik0uMDUgMS40NjVMMS40NjQuMDUgNy45NSA2LjUzN2wtLjQxMS40MS40NzMuNDc0LTYuNTkyIDYuNTkzLTEuNDMyLTEuNDMzIDUuNTktNS41OXoiLz48L2c+PC9nPjwvc3ZnPg==")',
    },
    '.DayPicker-NavButton--interactionDisabled': {
      display: 'none',
    },
    '.DayPicker-Caption': {
      display: 'table-caption',
      marginBottom: '0.5em',
      padding: '0 0.5em',
      textAlign: 'center',
      color: theme.palette.common.black,
      lineHeight: '22px',
      textTransform: 'uppercase',
      '& div': {
        fontWeight: 600,
        fontSize: 14,
      },
    },
    '.DayPicker-Weekdays': {
      display: 'table-header-group',
      marginTop: '1em',
    },
    '.DayPicker-WeekdaysRow': {
      display: 'table-row',
    },
    '.DayPicker-Weekday': {
      display: 'table-cell',
      padding: '0.5em 0.5em 1.25em',
      textAlign: 'center',
      fontSize: '0.875em',
      color: theme.palette.common.grey[500],
      fontWeight: '400',
      lineHeight: '22px',
    },
    '.DayPicker-Weekday abbr[title]': {
      borderBottom: 'none',
      textDecoration: 'none',
    },
    '.DayPicker-Body': {
      display: 'table-row-group',
    },
    '.DayPicker-Week': {
      display: 'table-row',
    },
    '.DayPicker-Day': {
      display: 'table-cell',
      verticalAlign: 'middle',
      textAlign: 'center',
      position: 'relative',
      color: theme.palette.common.black,
      fontSize: 14,
      fontWeight: '400',
      lineHeight: '10px',
      padding: 10,
      letterSpacing: '-0.5px',
      borderRadius: '3px',
      backgroundColor: 'transparent',
      border: '1px solid transparent',
      cursor: 'pointer',
      '&:after': {
        content: '""',
        position: 'absolute',
        top: 3,
        bottom: 3,
        left: 3,
        right: 3,
        borderRadius: 3,
        border: '1px solid transparent',
      },
      '&:hover': {
        backgroundColor: 'transparent',
        '&::after': {
          borderColor: theme.palette.common.black,
        },
      },
    },
    '@media (min-width: 360px)': {
      '.DayPicker-Day': {
        padding: 13,
      },
    },
    '@media (min-width: 380px)': {
      '.DayPicker-Day': {
        padding: 15,
      },
    },
    '.DayPicker-Footer': {
      paddingTop: '0.5em',
    },
    '.DayPicker-Day--past, .DayPicker-Day--disabled': {
      color: theme.palette.common.grey[400],
      textDecoration: 'line-through',
      pointerEvents: 'none',
      cursor: 'default',
    },
    '.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside)': {
      position: 'relative',
      backgroundColor: 'transparent',
      color: theme.palette.primary.main,
      '&::after': {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: theme.palette.primary.main,
      },
      '&:hover': {
        backgroundColor: 'transparent',
        '&::after': {
          borderColor: theme.palette.common.black,
        },
      },
    },
  },
}));

export default useGlobalStyles;
