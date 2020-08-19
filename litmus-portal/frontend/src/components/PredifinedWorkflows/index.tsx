import React from 'react';
import { preDefinedWorkflowData } from '../../models/predefinedWorkflow';
import CustomCard from '../WorkflowCard';
import CustomWorkflowCard from '../WorkflowCard/CustomWorkflow';
import useStyles from './styles';

interface PredifinedWorkflowsProps {
  workflows: preDefinedWorkflowData[];
  CallbackOnSelectWorkflow: (index: number) => void;
}

const PredifinedWorkflows: React.FC<PredifinedWorkflowsProps> = ({
  workflows,
  CallbackOnSelectWorkflow,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {workflows &&
        workflows.map((w: preDefinedWorkflowData, index: number) =>
          w.isCustom ? (
            <CustomWorkflowCard
              handleClick={() => CallbackOnSelectWorkflow(index)}
            />
          ) : (
            <CustomCard
              key={w.workflowID}
              title={w.title}
              urlToIcon={w.urlToIcon}
              provider={w.provider}
              chaosWkfCRDLink={w.chaosWkfCRDLink}
              selectedID={w.workflowID}
              handleClick={() => CallbackOnSelectWorkflow(index)}
              description={w.description}
              totalRuns={w.totalRuns}
              gitLink={w.gitLink}
              workflowID={w.workflowID}
            />
          )
        )}
    </div>
  );
};

export default PredifinedWorkflows;
