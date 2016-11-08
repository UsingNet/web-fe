import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PermissionActions from 'actions/permission';
import Permission from './Permission';

function mapStateToProps({ permission }) {
  return {
    permission,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    permissionActions: bindActionCreators(PermissionActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Permission);
