import { connect } from 'react-redux';
import ExtendInfo from './ExtendInfo';

const mapStateToProps = ({ order }) => ({
  extendInfo: order.selectedOrder.contact.extend,
});

export default connect(mapStateToProps)(ExtendInfo);
