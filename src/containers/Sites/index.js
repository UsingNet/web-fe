import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Sites from './Sites';
import { getSites, addSite, removeSite, setActiveTab } from 'actions/web';
import { getBaseSetting } from 'actions/baseSetting';

function mapStateToProps({ web, baseSetting }) {
  return {
    sites: web.sites,
    site: web.site,
    activeTab: web.activeTab,
    plan: baseSetting.plan,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setActiveTab: bindActionCreators(setActiveTab, dispatch),
    getSites: bindActionCreators(getSites, dispatch),
    addSite: bindActionCreators(addSite, dispatch),
    removeSite: bindActionCreators(removeSite, dispatch),
    getBaseSetting: bindActionCreators(getBaseSetting, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sites);
