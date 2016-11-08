import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as QuickReplyActions from 'actions/quickReply';
import QuickReply from './QuickReply';

const mapStateToProps = ({ quickReply }) => ({
  ...quickReply,
});

const mapDispatchToProps = (dispatch) => ({
  quickReplyActions: bindActionCreators(QuickReplyActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuickReply);
