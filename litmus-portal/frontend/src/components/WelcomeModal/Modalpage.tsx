import React from 'react';
import useStyles from './styles';

function Icon() {
  const classes = useStyles();
  return (
    <img src="icons/LitmusLogo.png" className={classes.mark} alt="markLitmus" />
  );
}
interface ModalData {
  renderMenu: any;
  setText?: string;
  setName?: string;
}

/* This is main page to take input for Project */
const ModalPage: React.FC<ModalData> = ({
  renderMenu,
  setText,
  setName,
}) => {
  const classes = useStyles();
  return (
    <div>
      <div>
        <Icon />
      </div>
      <div className={classes.heading}>
        Welcome to Litmus Portal,
        <br />
        {/* Pass here corrosponding name of user */}
          <strong> {setName} </strong>
      </div>
      <div className={classes.infoHeading}>
        {setText} <br />
      </div>

      <div>{renderMenu}</div>
      
    </div>
  );
};
export default ModalPage;