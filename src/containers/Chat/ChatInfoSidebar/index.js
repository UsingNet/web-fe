import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as OrderActions from 'actions/order';
import { postContact } from 'actions/contact';
import ChatInfoSidebar from './ChatInfoSidebar';

const mapStateToProps = ({ order }) => ({
  selectedOrder: order.selectedOrder,
  activeTab: order.activeTab,
});

const mapDispatchToProps = (dispatch) => ({
  updateClientInfoFields: bindActionCreators(OrderActions.updateClientInfoFields, dispatch),
  infoTabChange: bindActionCreators(OrderActions.infoTabChange, dispatch),
  postContact: bindActionCreators(postContact, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChatInfoSidebar);
