import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AgentActions from 'actions/agent';
import Agent from './Agent';

function mapStateToProps({ agents }) {
  return {
    agents,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    agentActions: bindActionCreators(AgentActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Agent);
