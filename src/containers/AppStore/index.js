import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getApps, enableApp, disableApp } from 'actions/appstore';
import AppStore from './AppStore';

function mapStateToProps({ apps }) {
  return {
    apps: apps.apps,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getApps: bindActionCreators(getApps, dispatch),
    enableApp: bindActionCreators(enableApp, dispatch),
    disableApp: bindActionCreators(disableApp, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppStore);
