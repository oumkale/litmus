import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
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
}));
export default useStyles;