import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import React from 'react';
import useStyles from './styles';
import ButtonFilled from '../Button/ButtonFilled';
/* Icon function is used for finish modal to show mark */
function Icon() {
  const classes = useStyles();

  return <img src="icons/finish.png" className={classes.mark} alt="mark" />;
}

const FinishModal = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [modified, setModified] = React.useState(false);

  const handleOpen = () => {
    setModified(false);
    setOpen(true);
  };

  const handleClose = () => {
    setModified(true);
    setOpen(false);
  };
  
  const body = (
    <div className={classes.rootContainer}>
      <img src="icons/finish.png" className={classes.mark} alt="mark" />;
      <div className={classes.heading}>
        A new chaos workflow,
        <br />
        <strong>was succusssfully created!</strong>
      </div>
      <div className={classes.headWorkflow}>
        Congratulations on creating your first workflow! Now information about{' '}
        <br /> it will be displayed on the main screen of the application.
      </div>
      <div className={classes.button}>
        <ButtonFilled handleClick={handleClose} data-cy="selectFinish" isPrimary>
          <div>Back to workflow</div>
        </ButtonFilled>
      </div>
    </div>
  );

  return (
    <div>
      <div>
        <ButtonFilled handleClick={handleOpen} isPrimary>
          <div>Completed</div>
        </ButtonFilled>
      </div >  
       {/* Finish Modal is added */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

export default FinishModal;