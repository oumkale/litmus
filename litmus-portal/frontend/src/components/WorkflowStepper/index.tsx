/* eslint-disable camelcase */
import React from 'react';
import Step from '@material-ui/core/Step';
import { StepIconProps } from '@material-ui/core/StepIcon';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import ButtonFilled from '../Button/ButtonFilled';
import ButtonOutline from '../Button/ButtonOutline';
import FinishModal from '../Modal/FinishModal';
import ReliablityScore from '../Sections/Workflow/ReliabilityScore';
import ScheduleWorkflow from '../Sections/Workflow/ScheduleWorkflow';
import VerifyCommit from '../Sections/Workflow/VerifyCommit';
import ChooseAWorkflowCluster from '../Sections/Workflow/WorkflowCluster';
import QontoConnector from './quontoConnector';
import useStyles from './styles';
import useQontoStepIconStyles from './useQontoStepIconStyles';
import TuneWorkflow from '../Sections/Workflow/TuneWorkflow/index';
import ChooseWorkflow from '../Sections/Workflow/ChooseWorkflow/index';
import { WorkflowData, experimentMap } from '../../models/workflow';
import { UserData } from '../../models/user';
import { RootState } from '../../redux/reducers';
import useActions from '../../redux/actions';
import * as WorkflowActions from '../../redux/actions/workflow';
import parsed from '../../utils/yamlUtils';
import { CREATE_WORKFLOW } from '../../schemas';

function getSteps(): string[] {
  return [
    'Target Cluster',
    'Choose a workflow',
    'Tune workflow',
    'Reliability score',
    'Schedule',
    'Verify and Commit',
  ];
}

function QontoStepIcon(props: StepIconProps) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  if (completed) {
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        <img src="./icons/NotPass.png" alt="Not Completed Icon" />
      </div>
    );
  }
  if (active) {
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        <div className={classes.circle} />
      </div>
    );
  }
  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {/* <img src="./icons/workflowNotActive.svg" /> */}
      <div className={classes.outerCircle}>
        <div className={classes.innerCircle} />
      </div>
    </div>
  );
}

function getStepContent(
  stepIndex: number,
  goto: (page: number) => void
): React.ReactNode {
  switch (stepIndex) {
    case 0:
      return <ChooseAWorkflowCluster goto={(page: number) => goto(page)} />;
    case 1:
      return <ChooseWorkflow />;
    case 2:
      return <TuneWorkflow />;
    case 3:
      return <ReliablityScore />;
    case 4:
      return <ScheduleWorkflow />;
    case 5:
      return <VerifyCommit goto={(page: number) => goto(page)} />;
    default:
      return <ChooseAWorkflowCluster goto={(page: number) => goto(page)} />;
  }
}

const CustomStepper = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const workflowData: WorkflowData = useSelector(
    (state: RootState) => state.workflowData
  );
  const {
    yaml,
    weights,
    description,
    isCustomWorkflow,
    name,
    clusterid,
  } = workflowData;

  const userData: UserData = useSelector((state: RootState) => state.userData);

  const { projectID } = userData;

  const [modalOpen, setModalOpen] = React.useState(false);
  const workflow = useActions(WorkflowActions);

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === 2) {
      const tests = parsed(yaml);
      const arr: experimentMap[] = [];
      const hashMap = new Map();
      weights.forEach((weight) => {
        hashMap.set(weight.experimentName, weight.weight);
      });
      tests.forEach((test) => {
        let value = 0;
        if (hashMap.has(test)) {
          value = hashMap.get(test);
        }
        arr.push({ experimentName: test, weight: value });
      });
      workflow.setWorkflowDetails({
        weights: arr,
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [createChaosWorkFlow] = useMutation(CREATE_WORKFLOW, {
    onCompleted: () => {
      setModalOpen(true);
    },
  });

  const handleMutation = () => {
    if (
      name.length !== 0 &&
      description.length !== 0 &&
      weights[0].experimentName !== 'Invalid CRD'
    ) {
      const weightData: { experiment_name: string; weightage: number }[] = []; // eslint-disable-line no-eval

      weights.forEach((data) => {
        weightData.push({
          experiment_name: data.experimentName,
          weightage: data.weight,
        }); // eslint-disable-line no-eval
      });

      const yamlJson = JSON.stringify(yaml, null, 2);

      const ChaosWorkFlowInputs = {
        workflow_manifest: yamlJson,
        cronSyntax: '',
        workflow_name: name,
        workflow_description: description,
        isCustomWorkflow,
        weightages: weightData,
        project_id: projectID,
        cluster_id: clusterid,
      };
      createChaosWorkFlow({
        variables: { ChaosWorkFlowInput: ChaosWorkFlowInputs },
      });
    }
  };

  function goto({ page }: { page: number }) {
    setActiveStep(page);
  }

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
        connector={<QontoConnector />}
        className={classes.stepper}
        alternativeLabel
      >
        {steps.map((label, i) => (
          <Step key={label}>
            {activeStep === i ? (
              <StepLabel StepIconComponent={QontoStepIcon}>
                <div className={classes.activeLabel} data-cy="labelText">
                  {label}
                </div>
              </StepLabel>
            ) : (
              <StepLabel StepIconComponent={QontoStepIcon}>
                <div className={classes.normalLabel} data-cy="labelText">
                  {label}
                </div>
              </StepLabel>
            )}
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          <div className={classes.content}>
            <FinishModal
              isOpen={modalOpen}
              setOpen={(open: boolean) => setModalOpen(open)}
            />
            {getStepContent(activeStep, (page: number) => goto({ page }))}
          </div>

          {/* Control Buttons */}
          {activeStep !== 0 ? (
            <div className={classes.buttonGroup}>
              <ButtonOutline isDisabled={false} handleClick={handleBack}>
                <Typography>Back</Typography>
              </ButtonOutline>
              {activeStep === steps.length - 1 ? (
                <ButtonFilled
                  handleClick={() => {
                    handleMutation();
                  }}
                  isPrimary
                >
                  <div>Finish</div>
                </ButtonFilled>
              ) : (
                <ButtonFilled handleClick={() => handleNext()} isPrimary>
                  <div>
                    Next{' '}
                    <img
                      alt="next"
                      src="icons/nextArrow.svg"
                      className={classes.nextArrow}
                    />
                  </div>
                </ButtonFilled>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CustomStepper;
