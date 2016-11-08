import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setStatus } from 'actions/agent';
import * as socketActions from 'actions/socket';
import Header from './Header';

function mapStateToProps({ me, agents }) {
  return {
    me,
    status: agents.status,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAgentStatus: bindActionCreators(setStatus, dispatch),
    socketActions: bindActionCreators(socketActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
