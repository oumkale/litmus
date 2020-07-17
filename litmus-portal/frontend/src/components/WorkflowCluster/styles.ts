import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  rootcontainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(255, 255, 255, 0.6)',
    paddingBottom: '7rem',
  },
  check: {
    marginLeft: 167,
    marginTop: 102,
    '&:hover': {
      shadow: theme.palette.secondary.dark,
    },
  },
  heading: {
    marginLeft: 167,
    marginTop: 30,
    marginBottom: 30,
    textAlign: 'left',
    fontSize: 36,
    lineHeight: '130.02%',
    color: theme.palette.common.black,
  },
  headchaos: {
    textAlign: 'left',
    marginLeft: 167,
    marginBottom: 10,
    color: theme.palette.common.black,
  },
  headcluster: {
    marginLeft: 168,
    textAlign: 'left',
  },
  radiobutton: {
    marginLeft: 167,
    textAlign: 'left',
    marginTop: 30,
    marginRight: 15,
  },
  button: {
    marginLeft: 167,
    textAlign: 'left',
    marginTop: 64,
  },
  or: {
    marginLeft: 347,
    marginTop: -25,
    textAlign: 'left',
    fontSize: 14,
    lineHeight: '130%',
    color: '#7D7E8C',
  },
}));

export default useStyles;
