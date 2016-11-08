import { connect } from 'react-redux';
import AccessInfo from './AccessInfo';

const mapStateToProps = ({ order }) => {
  const contact = order.selectedOrder.contact;
  return ({
    address: contact.package.address,
    ip: contact.ip,
    userAgent: contact.package.user_agent,
  });
};

export default connect(mapStateToProps)(AccessInfo);
