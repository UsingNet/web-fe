import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getOnlineAgents } from 'actions/agent';
import { getTrack } from 'actions/track';
import * as OrderActions from 'actions/order';
import * as ChatActions from 'actions/chat';
import * as MessageActions from 'actions/messages';
import ChatWrapper from './ChatWrapper';

const mapStateToProps = ({
  messages,
  agents,
  me,
  order,
  chat,
}) => ({
  chat,
  me,
  orders: order.orders,
  orderExtraInfo: order.orderExtraInfo,
  messages: messages.messages,
  agents: agents.agents,
  action: messages.action,
  hasMoreMessage: messages.hasMoreMessage,
});

const mapDispathToProps = (dispatch) => ({
  chatActions: bindActionCreators(ChatActions, dispatch),
  orderActions: bindActionCreators(OrderActions, dispatch),
  messageActions: bindActionCreators(MessageActions, dispatch),
  getOnlineAgents: bindActionCreators(getOnlineAgents, dispatch),
  getTrack: bindActionCreators(getTrack, dispatch),
});

export default connect(mapStateToProps, mapDispathToProps)(ChatWrapper);
