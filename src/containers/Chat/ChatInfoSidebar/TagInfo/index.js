import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postContact } from 'actions/contact';
import { updateContactTags } from 'actions/order';
import { getSelectedTags } from './selectors';
import TagInfo from './TagInfo';

const mapStateToProps = ({ tag, order }) => ({
  tags: tag,
  contactId: order.selectedOrder.contact.id,
  selectedTags: getSelectedTags(order.selectedOrder.contact),
});

const mapDispatchToProps = (dispatch) => ({
  postContact: bindActionCreators(postContact, dispatch),
  updateContactTags: bindActionCreators(updateContactTags, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TagInfo);
