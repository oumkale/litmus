import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  rootContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  backdrop: {
    background: theme.palette.border.main,
    display: 'flex',
    flexDirection: 'column',
  },

  root: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },

  mainDiv: {
    padding: theme.spacing(3.75),
    backgroundColor: theme.palette.background.paper,
    width: '50rem',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    marginRight: theme.spacing(6.5),
    [theme.breakpoints.down('sm')]: {
      width: '95%',
      flexDirection: 'column',
    },
  },

  workflowCardDiv: {
    marginRight: theme.spacing(10),
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(3),
      height: '20rem',
      width: '95%',
    },
  },

  userName: {
    fontSize: '2.5rem',
    marginTop: theme.spacing(1.75),
    marginBottom: theme.spacing(2.75),
  },

  cardAreaBody: {
    height: '100%',
  },

  createWorkflowHeading: {
    fontSize: '0.9375rem',
    position: 'absolute',
    marginLeft: theme.spacing(3.75),
    top: '10%',
  },

  createWorkflowTitle: {
    fontSize: 25,
    position: 'absolute',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    marginLeft: theme.spacing(3.75),
    top: '30%',
  },

  headingDiv: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  arrowForwardIcon: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(1),
    height: '1.65rem',
    width: '1.65rem',
  },

  arrowForwardIconCard: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(22.5),
    position: 'absolute',
    bottom: '10%',
  },

  mainHeading: {
    color: theme.palette.secondary.main,
    fontSize: '1.5625rem',
    marginBottom: theme.spacing(0.625),
  },

  mainResult: {
    color: theme.palette.text.primary,
    fontSize: '1.5625rem',
    maxWidth: '27.5rem',
    marginBottom: theme.spacing(3.125),
  },

  mainDesc: {
    color: theme.palette.text.primary,
    fontSize: '1.125rem',
    maxWidth: '36rem',
  },

  imageDiv: {
    marginLeft: theme.spacing(10),
    marginTop: theme.spacing(10),
    '& img': {
      userDrag: 'none',
    },
  },

  contentDiv: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: theme.spacing(3.75),
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down(1150)]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  statDiv: {
    width: '70%',
    flexGrow: 1,
    backgroundColor: theme.palette.cards.background,
    borderRadius: 3,
    [theme.breakpoints.down(1150)]: {
      width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
  },

  statsHeading: {
    fontSize: '1.5625rem',
    marginBottom: theme.spacing(3.75),
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(5),
  },

  quickActionDiv: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    marginLeft: theme.spacing(3),
    background: 'inherit',
  },

  cardDiv: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  predefinedBtn: {
    marginTop: theme.spacing(2.5),
  },

  btnHeaderDiv: {
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  seeAllBtn: {
    marginTop: theme.spacing(1.5),
    marginRight: theme.spacing(6),
    marginLeft: 'auto',
    backgroundColor: 'transparent !important',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(0.2),
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(3.8),
    },
  },

  btnSpan: {
    display: 'flex',
    flexDirection: 'row',
  },

  btnText: {
    paddingRight: theme.spacing(1.25),
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontSize: '1rem',
  },
}));

export default useStyles;
