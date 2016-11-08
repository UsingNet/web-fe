import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as VoipActions from 'actions/voip';
import Voip from './Voip';

function mapStateToProps({ voip, baseSetting }) {
  return {
    voip,
    baseSetting,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    voipActions: bindActionCreators(VoipActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Voip);
