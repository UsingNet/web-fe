import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ContactActions from 'actions/contact';
import EditContactModal from './EditContactModal';

function mapStateToProps({ contact, tag }) {
  return {
    editContact: contact.editContact,
    modalTitle: contact.modalTitle,
    modalVisible: contact.modalVisible,
    tags: tag,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    contactActions: bindActionCreators(ContactActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContactModal);
