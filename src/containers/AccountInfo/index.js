import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as MeActions from 'actions/me';
import AccountInfo from './AccountInfo';

const mapStateToProps = ({ me }) => ({
  me,
});

const mapDispatchToProps = (dispatch) => ({
  meActions: bindActionCreators(MeActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
