import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PluginActions from 'actions/plugin';
import Plugin from './Plugin';

function mapStateToProps({ plugin }) {
  return {
    plugin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pluginActions: bindActionCreators(PluginActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Plugin);
