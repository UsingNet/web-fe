import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import { Tabs } from 'antd';
import Member from 'containers/Member';
import AgentGroup from 'containers/AgentGroup';
import styles from './agent.less';

const TabPane = Tabs.TabPane;

class Agent extends React.Component {
  static propTypes = {
    agentActions: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { agentActions, location } = this.props;
    const key = location.pathname.split('/')[2] || 'all';

    if (key) {
      agentActions.changeTab(key);
    }
  }

  changeTab = (key) => {
    const { agentActions, router } = this.props;
    agentActions.changeTab(key);
    router.push(`/agent/${key}`);
  }

  render() {
    return (
      <div className={styles.agent}>
        <Tabs
          style={{ padding: 20 }}
          className={styles['agent-tabs']}
          onChange={(key) => this.changeTab(key)}
        >
          <TabPane tab="所有人" key="all">
            <Member />
          </TabPane>
          <TabPane tab="分组" key="group">
            <AgentGroup />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default withRouter(Agent);
