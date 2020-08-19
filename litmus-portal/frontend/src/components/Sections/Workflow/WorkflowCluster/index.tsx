import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import * as React from 'react';
import { useLazyQuery } from '@apollo/client';
import { useSelector } from 'react-redux';
import ButtonFilled from '../../../Button/ButtonFilled';
import ButtonOutLine from '../../../Button/ButtonOutline';
import useStyles from './styles';
import { GET_CLUSTER } from '../../../../schemas';
import { RootState } from '../../../../redux/reducers';
import { UserData } from '../../../../models/user';
import useActions from '../../../../redux/actions';
import * as WorkflowActions from '../../../../redux/actions/workflow';

/*
  Check is image which is used as
  a sign on cluster page
*/
function Check() {
  const classes = useStyles();

  return <img src="icons/check.png" className={classes.check} alt="Check" />;
}

/*
  This screen is starting page of workflow
*/

interface WorkflowClusterProps {
  goto: (page: number) => void;
}

const WorkflowCluster: React.FC<WorkflowClusterProps> = ({ goto }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('Experiment');
  const workflow = useActions(WorkflowActions);
  const [select, setSelect] = React.useState(true);
  const userData: UserData = useSelector((state: RootState) => state.userData);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const [getCluster] = useLazyQuery(GET_CLUSTER, {
    onCompleted: (data) => {
      if (data && data.getCluster) {
        workflow.setWorkflowDetails({
          clusterid: data.getCluster[0].cluster_id,
          project_id: userData.projectID,
        });
        goto(1);
      }
    },
  });

  const handleClick = () => {
    getCluster({
      variables: { project_id: userData.projectID, cluster_type: 'internal' },
    });
  };

  return (
    <div className={classes.rootcontainer}>
      {/* Arrow mark */}
      <div>
        <Check />
      </div>
      <div>
        <Typography className={classes.heading}>
          <strong> Choose the target Kubernetes cluster</strong>
        </Typography>
        <Typography className={classes.headchaos}>
          You are creating a <strong> new chaos workflow.</strong>
        </Typography>
        <Typography className={classes.headcluster}>
          Select a target Kubernetes cluster to run this workflow.
        </Typography>

        <div className={classes.radiobutton}>
          <FormControl component="fieldset">
            <RadioGroup
              data-cy="selectRadio"
              onClick={() => setSelect(false)}
              aria-label="D"
              name="radio-button-demo"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="d"
                control={<Radio />}
                label={
                  <Typography>
                    Ignite-cluster(where this Litmus portal is install and
                    running)
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      {/* 
        Division is used for Ignite-cluster(where this Litmus portal
        is install and running) or alternative Install Litmus Agent to 
        other Kubernetes cluster 
      */}
      <div className={classes.buttonDiv}>
        <div className={classes.button} data-cy="Internal">
          <ButtonFilled
            data-cy="gotItButton"
            isPrimary
            isDisabled={select}
            handleClick={() => handleClick()}
          >
            <div>Select and Continue</div>
          </ButtonFilled>
        </div>

        <div className={classes.or}>or</div>
        <div data-cy="External">
          <ButtonOutLine
            isDisabled
            data-cy="selectLitmusKubernetes"
            handleClick={() => handleClick()}
          >
            <Typography>
              Install Litmus agents to other Kubernetes cluster
            </Typography>
          </ButtonOutLine>
        </div>
      </div>
    </div>
  );
};

export default WorkflowCluster;
