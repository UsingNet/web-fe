import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as OrderActions from 'actions/order';
import * as HistoryActions from 'actions/history';
import { getMessageList } from 'actions/messages';
import { getMember as getMemberAction } from 'actions/member';
import History from './History';

function mapStateToProps({ statsOrder, member, messages, history }) {
  return {
    scrollHeight: history.scrollHeight,
    querystring: history.querystring,
    isRecordOpen: history.isRecordOpen,
    openedOrder: history.openedOrder,
    action: history.action,
    statsOrder,
    members: member.members,
    messages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OrderActions: bindActionCreators(OrderActions, dispatch),
    getMember: bindActionCreators(getMemberAction, dispatch),
    getMessageList: bindActionCreators(getMessageList, dispatch),
    historyActions: bindActionCreators(HistoryActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
