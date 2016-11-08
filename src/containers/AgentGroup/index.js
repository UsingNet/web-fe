import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getEditGroupWithUsers } from './selectors';
import * as AgentGroupActions from 'actions/agentGroup';
import AgentGroup from './AgentGroup';

function mapStateToProps(state) {
  return {
    agentGroup: state.agentGroup,
    editGroup: getEditGroupWithUsers(state),
    members: state.member.members,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    agentGroupActions: bindActionCreators(AgentGroupActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentGroup);
