import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCommonQuickReply, getPersonalQuickReply } from 'actions/quickReply';
import { setFastReplyTab, toggleFastReplyVisible } from 'actions/chat';
import { setOrderExtraInfo } from 'actions/order';
import FastReply from './FastReply';

const mapStateToProps = ({ quickReply, chat, order }) => ({
  commonReplies: quickReply.commonReplies,
  personalReplies: quickReply.personalReplies,
  fastReplyVisible: chat.fastReplyVisible,
  activeReplyTab: chat.activeReplyTab,
  orderId: order.selectedOrder.id,
});

const mapDispatchToProps = (dispatch) => ({
  getCommonQuickReply: bindActionCreators(getCommonQuickReply, dispatch),
  getPersonalQuickReply: bindActionCreators(getPersonalQuickReply, dispatch),
  setFastReplyTab: bindActionCreators(setFastReplyTab, dispatch),
  setOrderExtraInfo: bindActionCreators(setOrderExtraInfo, dispatch),
  toggleFastReplyVisible: bindActionCreators(toggleFastReplyVisible, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FastReply);
