import React from 'react';
import useStyles from './styles';

const Icon = () => {
  const classes = useStyles();
  return (
    <img src="icons/LitmusLogo.png" className={classes.mark} alt="markLitmus" />
  );
};

interface ModalDataProps {
  renderMenu: JSX.Element;
  setText?: string;
  setName?: string;
}

/* This is main page to take input for Project */
const ModalPage: React.FC<ModalDataProps> = ({
  renderMenu,
  setText,
  setName,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.insideModal}>
      <Icon />
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
