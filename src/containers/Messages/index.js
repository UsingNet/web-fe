import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Messages from './Messages';
import * as MessagesActions from 'actions/messages';

function mapStateToProps({ messages }) {
  return {
    messagesState: messages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    messagesActions: bindActionCreators(MessagesActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
