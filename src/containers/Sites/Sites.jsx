import React, { PropTypes } from 'react';
import { Tabs, Button } from 'antd';
import SiteForm from './SiteForm';
import styles from './sites.less';

const TabPane = Tabs.TabPane;

class Sites extends React.Component {
  static propTypes = {
    getSites: PropTypes.func.isRequired,
    getBaseSetting: PropTypes.func.isRequired,
    addSite: PropTypes.func.isRequired,
    setActiveTab: PropTypes.func.isRequired,
    sites: PropTypes.array.isRequired,
    plan: PropTypes.object.isRequired,
    activeTab: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.props.getBaseSetting();
    this.props.getSites();
  }

  onAddSite = () => {
    const { sites, addSite } = this.props;
    if (sites[sites.length - 1].id) {
      addSite();
    }
  }

  render() {
    const { setActiveTab, sites, activeTab } = this.props;
    const sitesTabPanes = sites.map((s, i) => (
      <TabPane
        key={i}
        tab={s.name}
      >
        <SiteForm
          siteCount={sites.length}
          site={s}
          siteIndex={i}
        />
      </TabPane>
    ));

    let operations = (
      <div>
        <Button onClick={this.onAddSite}>添加站点</Button>
      </div>
    );

    return (
      <div className={styles.sites}>
        <h3>网站接入</h3>
        <Tabs
          tabBarExtraContent={operations}
          activeKey={activeTab}
          onChange={v => setActiveTab(v)}
        >
          {sitesTabPanes}
        </Tabs>
      </div>
    );
  }
}

export default Sites;
