/* eslint-disable */
import React from 'react';
import { withRouter } from 'react-router';
import { Tabs, Icon } from 'antd';
import OverviewStats from 'containers/OverviewStats';
import AgentStats from 'containers/AgentStats';
import EvaluationStats from 'containers/EvaluationStats';
import VistorStats from 'containers/VisitorStats';

const TabPane = Tabs.TabPane;

class Statistics extends React.Component {
  componentDidMount() {
    const { changeTab, location } = this.props;
    const key = location.pathname.split('/')[2] || 'overview';

    if (key) {
      changeTab(key);
    }
  }

  changeTab = (key) => {
    const { changeTab, router } = this.props;
    changeTab(key);
    router.push(`/statistics/${key}`);
  }

  render() {
    const { activeTab } = this.props;

    return (
      <Tabs
        activeKey={activeTab}
        onChange={this.changeTab}
        style={{ padding: 20 }}>
        <TabPane
          key="overview"
          tab={<span><Icon type="book" />总览</span>}
        >
          <OverviewStats />
        </TabPane>

        <TabPane
          key="agent"
          tab={<span><Icon type="user" />客服</span>}
        >
          <AgentStats />
        </TabPane>

        <TabPane
          key="evaluation"
          tab={<span><Icon type="like" />评价</span>}
        >
          <EvaluationStats />
        </TabPane>

        <TabPane
          key="visitor"
          tab={<span><Icon type="team" />访客</span>}
        >
          <VistorStats />
        </TabPane>
      </Tabs>
    );
  }
}

export default withRouter(Statistics);
