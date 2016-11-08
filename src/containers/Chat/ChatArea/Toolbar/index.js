import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendMessage } from 'actions/messages';
import { putOrder } from 'actions/order';
import * as ChatActions from 'actions/chat';
import Toolbar from './Toolbar';

const mapStateToProps = ({ order, chat, baseSetting, apps }) => {
  const contact = order.selectedOrder.contact;
  return ({
    orderId: order.selectedOrder.id,
    orderType: order.selectedOrder.type,
    phone: contact.phone,
    openid: contact.openid,
    weiboId: contact.weibo_id,
    email: contact.email,
    voipStatus: baseSetting.functions.chat.voip.status,
    smsStatus: baseSetting.functions.chat.sms.status,
    chat,
    apps: apps.apps,
  });
};

const mapDispatchToProps = (dispatch) => ({
  sendMessage: bindActionCreators(sendMessage, dispatch),
  putOrder: bindActionCreators(putOrder, dispatch),
  chatActions: bindActionCreators(ChatActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
