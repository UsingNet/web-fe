import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MailActions from 'actions/mail';
import Mail from './Mail';

function mapStateToProps({ mail }) {
  return {
    mail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    mailActions: bindActionCreators(MailActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Mail);
