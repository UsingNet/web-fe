import { connect } from 'react-redux';
import Sidebar from './Sidebar';

function mapStateToProps({ menus, baseSetting }) {
  return {
    menus,
    planSetting: baseSetting.plan,
  };
}

export default connect(mapStateToProps)(Sidebar);
