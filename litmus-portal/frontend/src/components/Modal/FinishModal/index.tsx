import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import React from 'react';
import useStyles from './styles';
import { history } from '../../../redux/configureStore';

/* Icon function is used for finish modal to show mark */
function Icon() {
  const classes = useStyles();

  return <img src="icons/finish.png" className={classes.mark} alt="mark" />;
}

interface FinishModal {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const FinishModal: React.FC<FinishModal> = ({ isOpen, setOpen }) => {
  const classes = useStyles();

  /* Body part for modal */
  const body = (
    <div className={classes.rootContainer}>
      <Icon />
      <div className={classes.heading}>
        A new chaos workflow,
        <br />
        <strong>was successfully created!</strong>
      </div>
      <div className={classes.headWorkflow}>
        Congratulations on creating your first workflow! Now information about{' '}
        <br /> it will be displayed on the main screen of the application.
      </div>
      <div className={classes.button}>
        <Button
          variant="contained"
          color="secondary"
          data-cy="selectFinish"
          onClick={() => {
            history.push('/workflows');
            setOpen(false);
          }}
        >
          Back to workflow
        </Button>
      </div>
    </div>
  );

  return (
    <div>
      {/* Finish Modal is added */}

      <Modal
        open={isOpen}
        onClose={() => {
          history.push('/workflows');
          setOpen(false);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default FinishModal;
