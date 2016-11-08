import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { shiftOrder, closeOrder } from 'actions/order';
import { getOnlineAgents } from 'actions/agent';
import { getAgentsWithoutMe } from './selectors';
import ChatHeader from './ChatHeader';

const mapStateToProps = (state) => ({
  /**
   * @todo agents 需要 filter，排除自己
   */
  agents: getAgentsWithoutMe(state),
  orderId: state.order.selectedOrder.id,
  contactName: state.order.selectedOrder.contact.name,
});

const mapDispatchToProps = (dispatch) => ({
  shiftOrder: bindActionCreators(shiftOrder, dispatch),
  closeOrder: bindActionCreators(closeOrder, dispatch),
  getOnlineAgents: bindActionCreators(getOnlineAgents, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
