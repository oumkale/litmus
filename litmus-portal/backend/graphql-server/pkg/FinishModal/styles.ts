import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  rootContainer: {
    marginLeft: theme.spacing(37),
    marginRight: theme.spacing(37),
    marginTop: theme.spacing(12),
    paddingBottom: theme.spacing(12),
    background: theme.palette.common.white,
    borderRadius: 3,
    textAlign: 'center',
    outline: 'none',
  },
  mark: {
    marginTop: theme.spacing(14),
    textAlign: 'center',
  },
  heading: {
    fontSize: '40px',
    textalign: 'center',
    marginTop: theme.spacing(5),
    color: theme.palette.common.black,
  },
  headWorkflow: {
    fontsize: '16px',
    lineheight: '170%',
    textalign: 'center',
    color: theme.palette.common.black,
    marginTop: theme.spacing(6),
  },

  button: {
    color: 'white',
    textAlign: 'center',
    marginTop: theme.spacing(6),
  },
}));

export default useStyles;