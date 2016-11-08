import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeTab } from 'actions/statistics';
import Statistics from './Statistics';

const mapStateToProps = ({ statistics }) => ({
  activeTab: statistics.activeTab,
});

const mapDispatchToProps = (dispatch) => ({
  changeTab: bindActionCreators(changeTab, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
