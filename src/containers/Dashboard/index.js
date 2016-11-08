import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { postAgentOffline } from 'actions/agent'
import { launchChat } from 'actions/order';
import { getOnlineAgents } from 'actions/agent';
import { getOnlineClients } from 'actions/client';
import Dashboard from './Dashboard';

function mapStateToProps({ me, agents, clients }) {
  return {
    me,
    agents: agents.agents,
    clients: clients.clients,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getOnlineAgents: bindActionCreators(getOnlineAgents, dispatch),
    getOnlineClients: bindActionCreators(getOnlineClients, dispatch),
    agentOffline: bindActionCreators(postAgentOffline, dispatch),
    launchChat: bindActionCreators(launchChat, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
