import React, { PropTypes } from 'react';
import ClientTable from './components/ClientTable';
import AgentTable from './components/AgentTable';
import styles from './dashboard.less';

class Dashboard extends React.Component {
  static propTypes = {
    me: PropTypes.object.isRequired,
    agents: PropTypes.array.isRequired,
    clients: PropTypes.array.isRequired,
    getOnlineAgents: PropTypes.func.isRequired,
    getOnlineClients: PropTypes.func.isRequired,
    launchChat: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { getOnlineAgents, getOnlineClients } = this.props;

    setTimeout(() => {
      getOnlineAgents();
      getOnlineClients();
    }, 1000);

    this.onlineInterval = setInterval(() => {
      getOnlineAgents();
      getOnlineClients();
    }, 10000);
  }

  componentWillUnmount() {
    if (this.onlineInterval) {
      clearInterval(this.onlineInterval);
      this.onlineInterval = null;
    }
  }

  render() {
    const { me, agents, clients, launchChat, agentOffline } = this.props;
    return (
      <div className={styles.dashboard}>
        <AgentTable agents={agents} me={me} agentOffline={agentOffline}/>
        <ClientTable launchChat={launchChat} clients={clients} />
      </div>
    );
  }
}

export default Dashboard;
