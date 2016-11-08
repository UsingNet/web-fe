import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Contact from './Contact';
import { getTags } from 'actions/tag';
import * as ContactActions from 'actions/contact';
import { launchChat } from 'actions/order';

function mapStateToProps({ contact, tag }) {
  return {
    contact,
    tags: tag,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    contactActions: bindActionCreators(ContactActions, dispatch),
    getTags: bindActionCreators(getTags, dispatch),
    launchChat: bindActionCreators(launchChat, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
