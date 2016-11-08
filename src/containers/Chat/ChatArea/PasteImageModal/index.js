import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendMessage } from 'actions/messages';
import PasteImageModal from './PasteImageModal';

const mapStateToProps = ({ order }) => ({
  orderId: order.selectedOrder.id,
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: bindActionCreators(sendMessage, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PasteImageModal);
