import Button from '@material-ui/core/Button';
import Step from '@material-ui/core/Step';
import { StepIconProps } from '@material-ui/core/StepIcon';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import config from '../../config';
import useActions from '../../redux/actions';
import * as UserActions from '../../redux/actions/user';
import { history } from '../../redux/configureStore';
import { RootState } from '../../redux/reducers';
import useStyles from './styles';
import ModalPage from './Modalpage';
import { Paper, TextField } from '@material-ui/core';
import PasswordInput from '../PasswordInput/PasswordInput';
import WelcomeModal from './index';
function QontoStepIcon(props: StepIconProps) {
  const classes = useStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.rootStepper, {
        [classes.activeStepper]: active,
      })}
    >
      {completed ? (
        <div className={classes.circleStepper} />
      ) : (
        <div className={classes.circleStepper} />
      )}
    </div>
  );
}

function getSteps() {
  return ['', '', '', ''];
}


function CStepper() {
  const classes = useStyles();
  const user = useActions(UserActions);
  const { userData } = useSelector((state: RootState) => state);
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [info, setInfo] = React.useState({ email: '', name: '', password: '' });
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const funck=()=>{
       return <WelcomeModal isOpen={false}/>;// use this function to clode Modal
    };
  

  const [values, setValues] = React.useState({
    password: '',
    confirmPassword: '',
  });
  console.log(values);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const updateData = () => {
    const data = info;
    const searchParams = new URLSearchParams();

    if (!('name' in data) || data.name === '') setActiveStep(0);
    else if (!('email' in data) || data.email === '') setActiveStep(1);
    else if (!('password' in data) || data.password === '') setActiveStep(2);
    else {
      searchParams.append('name', data.name);
      searchParams.append('password', data.password);
      searchParams.append('email', data.email);

      fetch(`${config.auth.url}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${userData.token}`,
        },
        body: searchParams,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if ('error' in data) {
            console.error("Couldn't login :(");
          } else {
            user.updateUserDetails({ name: data.name, email: data.email });
            history.push('/');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  const setData = (key: string, value: string) => {
    let data = info;
    data = {
      ...data,
      [key]: value,
    };
    setInfo(data);
  };

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <ModalPage
            renderMenu={
              <Paper className={classes.inputArea}>  
              <TextField
                id="filled-projectname-input"
                label="Project Name"
                InputProps={{ disableUnderline: true }}
                data-cy="inputProjectEmail"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setData('nameProject', event.target.value);
                }}
              />
              </ Paper>
            }
            setName={"Administrator"}
            setText={'To get started, enter the name of your first project.'}
          />
        );
      case 1:
        return (
          <ModalPage
            renderMenu={
              <Paper className={classes.inputArea}> 
              <TextField
                id="filled-name-input"
                label="Full Name"
                InputProps={{ disableUnderline: true }}
                data-cy="inputName"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setData('name', event.target.value);
                }}
              />
              </ Paper>
            }
            setName={"Administrator"}
            setText={'How do i call you?'}
          />
        );
      case 2:
        return (
          <ModalPage
            renderMenu={
              <>       
                  <div > 
                    <PasswordInput
                      textType={'Password'}
                      value={values.password}
                      data-cy="inputEmail"
                      handleChange={(event) =>
                        setValues({
                          password: event.target.value,
                          confirmPassword: values.confirmPassword,
                        })
                      }
                    />                    
                    <PasswordInput
                      textType={'Confirm Password'}
                      value={values.confirmPassword}
                      data-cy="inputConfirmPassword"
                      handleChange={(event) =>
                        setValues({
                          password: values.password,
                          confirmPassword: event.target.value,
                        })
                      }
                    />
                  </div>
              </>
            }
            setName={"Name"}
            setText={'Set your personal Password'}
          />
        );
      case 3:
        return (
          <ModalPage
            renderMenu={
              <Paper className={classes.inputArea}> 
              <TextField
                id="filled-email-input"
                label="Email address"
                InputProps={{ disableUnderline: true }}
                data-cy="inputProjectEmail"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setData('name', event.target.value);
                }}
              />
              </ Paper>
            }
            //pass here corresponding name of user
            setName={"Administrator"}
            setText={'To get started, enter the email *optional*'}
          />
        );
      default:
        return (
          <ModalPage
            renderMenu={
              <Paper className={classes.inputArea}>  
              <TextField
                id="filled-projectname-input"
                label="Project Name"
                InputProps={{ disableUnderline: true }}
                data-cy="inputProjectEmail"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setData('nameProject', event.target.value);
                }}
              />
              </ Paper>
            }
            setName={"Administrator"}
            setText={'To get started, enter the name of your first project.'}
          />
        );
    }
  };

  /* Reset is used to reset the steps and further can be used */
  /* to route but keep handlereset */
  return (
    <div>
      <div>
        {activeStep === steps.length-1? (
          <div>
            <Typography>{getStepContent(activeStep)}</Typography>
            
            <div>
            <Button className={classes.buttonOutline} disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  updateData();

                  // close the Modal please look into it 
                  funck();
                  // add route here for the home page direction
                }}
                data-cy="selectProjectFinish"
              >
                Let&#39;s start
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <Typography>{getStepContent(activeStep)}</Typography>
            <div>
              <Button className={classes.buttonOutline} disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleNext}
                data-cy="Welcome-continue"
              >
                {activeStep === steps.length ? "Let's start" : 'Continue'}
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className={classes.stepper}>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          data-cy="Welcome-stepper"
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={QontoStepIcon} />
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
}
export default CStepper;