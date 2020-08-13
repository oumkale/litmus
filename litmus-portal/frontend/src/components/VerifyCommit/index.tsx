import { Button, Divider, Link, Modal, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import bfinance from '../../assets/icons/b-finance.png';
import AdjustedWeights from '../AdjustedWeights';
import ButtonFilled from '../Button/ButtonFilled';
import ButtonOutline from '../Button/ButtonOutline/index';
import CustomText from '../CustomText';
import CustomDate from '../DateTime/CustomDate';
import CustomTime from '../DateTime/CustomTime';
import useStyles from './styles';
import YamlEditor from '../YamlEditor/Editor';
import { WorkflowData, experimentMap } from '../../models/workflow';
import { RootState } from '../../redux/reducers';
import {
  parseYamlValidations,
  AceValidations,
} from '../YamlEditor/Validations';
<<<<<<< HEAD
import parsed from '../../utils/yamlUtils';
import { useMutation, gql } from '@apollo/client';
import { CREATE_WORKFLOW } from '../../schemas';
// refractor needed
=======
import useActions from '../../redux/actions';
import * as WorkflowActions from '../../redux/actions/workflow';

interface VerifyCommitProps {
  goto: () => void;
}
>>>>>>> upstream/litmus-portal

const VerifyCommit: React.FC<VerifyCommitProps> = ({ goto }) => {
  const classes = useStyles();
  const width1 = 700;
  const width2 = 700;

  const workflow = useActions(WorkflowActions);
  const [edit, setEdit] = useState(true);

  const workflowData: WorkflowData = useSelector(
    (state: RootState) => state.workflowData
  );
<<<<<<< HEAD
  const { name, link, yaml, id, description } = workflowData;
=======

  const { name, link, yaml, id, description, weights } = workflowData;
>>>>>>> upstream/litmus-portal

  const [open, setOpen] = React.useState(false);

  const [yamlStatus, setYamlStatus] = React.useState(
    'Your code is fine. You can move on!'
  );
 
  const [createChaosWorkFlow, { error, data }] = useMutation(CREATE_WORKFLOW);
  const ChaosWorkFlowInputs = {
  workflow_manifest:"Yaml will be here",
    cronSyntax: "",
    weightages: [{experiment_name:"ex", weightage:2}],
    workflow_name:"pod-delete",
    workflow_description:"good",
    isCustomWorkflow:true,
    project_id:"00000",
    cluster_id:"1"
  };


  const [modified, setModified] = React.useState(false);

  const handleOpen = () => {
    createChaosWorkFlow({variables:{ChaosWorkFlowInput : ChaosWorkFlowInputs}})
    setModified(false);
    setOpen(true);
  };

  const handleClose = () => {
    setModified(true);
    setOpen(false);
  };

  const handleNameChange = ({ changedName }: { changedName: string }) => {
    workflow.setWorkflowDetails({
      name: changedName,
    });
  };

  const handleDescChange = ({ changedDesc }: { changedDesc: string }) => {
    workflow.setWorkflowDetails({
      description: changedDesc,
    });
  };

  const WorkflowTestData: experimentMap[] = weights as any;

  useEffect(() => {
    let editorValidations: AceValidations = {
      markers: [],
      annotations: [],
    };
    editorValidations = parseYamlValidations(yaml, classes);
    const stateObject = {
      markers: editorValidations.markers,
      annotations: editorValidations.annotations,
    };
    if (stateObject.annotations.length > 0) {
      setYamlStatus('Error in CRD Yaml.');
    } else {
      setYamlStatus('Your code is fine. You can move on !');
    }
  }, [modified]);
  
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.suHeader}>
<<<<<<< HEAD
          <div className={classes.suSegments}>
            <div>
              <Typography className={classes.headerText}>
                <strong> Confirmation of Results</strong>
              </Typography>
              
              <div className={classes.suBody}>
                <Typography align="left" className={classes.description}>
                  Before committing the workflow changes to your, verify and if
                  needed go back to a corresponding section of the wizard to
                  modify.
                </Typography>
              </div>
            </div>
            <img src={bfinance} alt="bfinance" className={classes.bfinIcon} />
          </div>
          <Divider />
          <div className={classes.innerDiv2}>
            <Typography align="left" className={classes.sumText}>
              <strong>Summary</strong>
          </Typography> 
            <div className={classes.outerSum}>
              <div className={classes.summaryDiv}>
                <div className={classes.innerSumDiv}>
                  <Typography className={classes.col1}>
                    Workflow name:
=======
          <div className={classes.suBody}>
            <Typography className={classes.headerText}>
              <strong> Confirmation of Results</strong>
            </Typography>
            <Typography className={classes.description}>
              Before committing the workflow changes to your, verify and if
              needed go back to a corresponding section of the wizard to modify.
            </Typography>
          </div>
          <img src={bfinance} alt="bfinance" className={classes.bfinIcon} />
        </div>
        <Divider />

        <Typography className={classes.sumText}>
          <strong>Summary</strong>
        </Typography>

        <div className={classes.outerSum}>
          <div className={classes.summaryDiv}>
            <div className={classes.innerSumDiv}>
              <Typography className={classes.col1}>Workflow name:</Typography>
            </div>
            <div className={classes.col2}>
              <CustomText
                value={name}
                id="name"
                width={width1}
                onchange={(changedName: string) =>
                  handleNameChange({ changedName })
                }
              />
            </div>
          </div>
          <div className={classes.summaryDiv}>
            <div className={classes.innerSumDiv}>
              <Typography className={classes.col1}>Description:</Typography>
            </div>
            <div
              className={classes.col2}
              style={{
                width: 724,
              }}
            >
              <CustomText
                value={description}
                id="desc"
                width={width2}
                onchange={(changedDesc: string) =>
                  handleDescChange({ changedDesc })
                }
              />
            </div>
          </div>
          <div className={classes.summaryDiv}>
            <div className={classes.innerSumDiv}>
              <Typography className={classes.col1}>Schedule:</Typography>
            </div>
            <div className={classes.schCol2}>
              <CustomDate disabled={edit} />
              <CustomTime ampm disabled={edit} />
              <div className={classes.editButton1}>
                <ButtonOutline
                  isDisabled={false}
                  handleClick={() => setEdit(!edit)}
                  data-cy="testRunButton"
                >
                  <Typography className={classes.buttonOutlineText}>
                    Edit
>>>>>>> upstream/litmus-portal
                  </Typography>
                </ButtonOutline>
              </div>
            </div>
          </div>
          <div className={classes.summaryDiv}>
            <div className={classes.innerSumDiv}>
              <Typography className={classes.col1}>
                Adjusted Weights:
              </Typography>
            </div>
            {WorkflowTestData[0].experimentName === 'Invalid CRD' ||
            WorkflowTestData[0].experimentName === 'Yaml Error' ? (
              <div>
                {' '}
                <Typography className={classes.errorText}>
                  <strong>
                    {' '}
                    Invalid Workflow CRD found ! Please correct the errors.
                  </strong>
                </Typography>
              </div>
            ) : (
              <div className={classes.adjWeights}>
                <div className={classes.progress} style={{ flexWrap: 'wrap' }}>
                  {WorkflowTestData.map((Test) => (
                    <AdjustedWeights
                      testName={`${Test.experimentName} test`}
                      testValue={Test.weight}
                    />
                  ))}
                </div>
                {/* <div className={classes.editButton2}> */}
                <ButtonOutline
                  isDisabled={false}
                  handleClick={() => goto()}
                  data-cy="testRunButton"
                >
                  <Typography className={classes.buttonOutlineText}>
                    Edit
                  </Typography>
                </ButtonOutline>
                {/* </div> */}
              </div>
<<<<<<< HEAD
              <div className={classes.summaryDiv}>
                <div className={classes.innerSumDiv}>
                  <Typography className={classes.col1}>YAML:</Typography>
                </div>
                <div className={classes.yamlCol2}>
                  {WorkflowTestNames[0] === 'Invalid CRD' ||
                  WorkflowTestNames[0] === 'Yaml Error' ? (
                    <Typography> Error in CRD Yaml. </Typography>
                  ) : (
                    <Typography>{yamlStatus}</Typography>
                  )}
                </div>
                <div className={classes.yamlButton}>
                  <ButtonFilled handleClick={handleOpen} isPrimary>
                    <div>View YAML</div>                    
                  </ButtonFilled>
                </div>
=======
            )}
          </div>
          <div className={classes.summaryDiv}>
            <div className={classes.innerSumDiv}>
              <Typography className={classes.col1}>YAML:</Typography>
            </div>
            <div className={classes.yamlFlex}>
              {WorkflowTestData[0].experimentName === 'Invalid CRD' ||
              WorkflowTestData[0].experimentName === 'Yaml Error' ? (
                <Typography> Error in CRD Yaml. </Typography>
              ) : (
                <Typography>{yamlStatus}</Typography>
              )}
              <div className={classes.yamlButton}>
                <ButtonFilled handleClick={handleOpen} isPrimary>
                  <div>View YAML</div>
                </ButtonFilled>
>>>>>>> upstream/litmus-portal
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div>
          <Typography className={classes.config}>
            The configuration details of this workflow will be committed to:{' '}
            <span>
              <Link
                href="https://github.com/abcorn-org/reputeops/sandbox-repute.yaml"
                onClick={preventDefault}
                className={classes.link}
              >
                https://github.com/abcorn-org/reputeops/sandbox-repute.yaml
              </Link>
            </span>
          </Typography>
        </div>
      </div>

      <Modal open={open} onClose={handleClose}>
        <div className={classes.modalContainer}>
          <div className={classes.modalContainerClose}>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.closeButtonStyle}
              onClick={handleClose}
            >
              &#x2715;
            </Button>
          </div>
          <YamlEditor
            content={yaml}
            filename={name}
            yamlLink={link}
            id={id}
            description={description}
            readOnly
            optionsDisplay={false}
          />
        </div>
      </Modal>
    </div>
  );
};

export default VerifyCommit;
