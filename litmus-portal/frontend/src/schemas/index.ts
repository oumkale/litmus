import { gql, useMutation } from '@apollo/client';

export const WORKFLOW_DETAILS = gql`
  query {
    getWorkFlowRuns(project_id: "00000") {
      workflow_id
      workflow_name
      workflow_run_id
      execution_data
      project_id
      cluster_name
      last_updated
    }
  }
`;

export const WORKFLOW_EVENTS = gql`
  subscription {
    workflowEventListener(project_id: "00000") {
      workflow_id
      workflow_name
      workflow_run_id
      execution_data
      project_id
      cluster_name
      last_updated
    }
  }
`;

export const CREATE_WORKFLOW = gql`
  mutation createWorkflow($workflow: WorkflowInput) {
    createWorkflow(workflow: $workflow) {
      workflow_manifest: String
      cronSyntax: String
      workflow_name: String
      workflow_description: String
      weightages: [WeightagesInput]
      isCustomWorkflow: Boolean
      
    }
  }
`;
