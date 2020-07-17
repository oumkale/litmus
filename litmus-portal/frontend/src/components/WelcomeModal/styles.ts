import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      // width: 350,
      outline: 'none',
      marginTop: 30,
    },
  },
  rootContainer: {
    marginLeft: '22rem',
    marginRight: '22rem',
    marginTop: '7.8rem',
    marginBottom: '7.8rem',
    paddingBottom: '6rem',
    background: theme.palette.common.white,
    borderRadius: 3,
    textAlign: 'center',
    outline: 'none',
  },
  buttonOutline: {
    minWidth: '4.375rem',
    height: '2.2.2rem',
    border: '0.0625rem solid',
    borderColor: theme.palette.secondary.dark,
    marginRight: theme.spacing(2),
  },
  heading: {
    fontfamily: 'Ubuntu',
    fontstyle: 'normal',
    fontweight: 'normal',
    fontSize: '40px',
    textalign: 'center',
    marginTop: '2rem',
    color: theme.palette.common.black,
  },
  infoHeading: {
    fontfamily: 'Ubuntu',
    fontstyle: 'normal',
    fontweight: 'normal',
    fontsize: '16px',
    lineheight: '170%',
    textalign: 'center',
    color: theme.palette.common.black,
    marginTop: '2.5rem',
    marginBottom: 15,
  },
  mark: {
    marginTop: 80,
    textAlign: 'center',
  },
  experimentname: {
    textAlign: 'center',
    marginBottom: 30,
  },
  stepper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  /* CSS for input and password field */
  inputArea: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
    display: 'flex',
    //textAlign: 'center',
    marginLeft: theme.spacing(32),
    marginRight: theme.spacing(32),
    textDecoration: 'none',
    flexDirection: 'column',
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2.2),
    //alignItems: 'center',
    borderRadius: 3,
    border: '0.0625rem solid #5B44BA',
    borderLeft: '0.0625rem solid #5B44BA',
  },
  inputDiv: {
    marginTop: theme.spacing(6.26),
    textAlign: 'center',
    marginLeft: 30,
  },
  /* CSS for stpper */
  rootStepper: {
    color: '#D1D2D7',
    display: 'flex',
    height: 22,
    alignItems: 'center',
  },
  activeStepper: {
    color: theme.palette.secondary.dark,
  },
  circleStepper: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));
export default useStyles;