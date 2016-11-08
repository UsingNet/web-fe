import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SmsActions from 'actions/sms';
import Sms from './Sms';

const mapStateToProps = ({ sms }) => ({
  sms,
});

const mapDispatchToProps = (dispatch) => ({
  smsActions: bindActionCreators(SmsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sms);
