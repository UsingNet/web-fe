import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setOrderExtraInfo } from 'actions/order';
import EmailArea from './EmailArea';

const mapDispatchToProps = (dispatch) => ({
  setOrderExtraInfo: bindActionCreators(setOrderExtraInfo, dispatch),
});

export default connect(null, mapDispatchToProps)(EmailArea);
