import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOnlineAgents } from 'actions/agent';
import { setMatchedReplies, setActiveReply } from 'actions/chat';
import { getApps } from 'actions/appstore';
import * as OrderActions from 'actions/order';
import * as MessageActions from 'actions/messages';
import ChatArea from './ChatArea';

const mapStateToProps = ({ order, messages, quickReply, chat }) => ({
  orderType: order.selectedOrder.type,
  contactId: order.selectedOrder.contact.id,
  orderExtraInfo: order.orderExtraInfo,
  messages: messages.messages,
  matchedReplies: chat.matchedReplies,
  activeQuickReply: chat.activeQuickReply,
  allQuickReplies: quickReply.commonReplies.concat(quickReply.personalReplies),
  action: messages.action,
  hasMoreMessage: messages.hasMoreMessage,
});

const mapDispatchToProps = (dispatch) => ({
  orderAction: bindActionCreators(OrderActions, dispatch),
  messageAction: bindActionCreators(MessageActions, dispatch),
  getOnlineAgents: bindActionCreators(getOnlineAgents, dispatch),
  setMatchedReplies: bindActionCreators(setMatchedReplies, dispatch),
  setActiveReply: bindActionCreators(setActiveReply, dispatch),
  getApps: bindActionCreators(getApps, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatArea);
