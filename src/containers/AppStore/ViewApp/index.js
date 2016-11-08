import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getApp } from 'actions/appstore';
import ViewApp from './ViewApp';

function mapStateToProps({ apps }) {
  return {
    link: apps.link,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getApp: bindActionCreators(getApp, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewApp);
