import cookie from 'js-cookie';
import { handleActions } from 'redux-actions';
import { setStatus, getOnlineAgentsSuccess, changeTab } from 'actions/agent';

const agents = handleActions({
  [`${getOnlineAgentsSuccess}`](state, action) {
    return {
      ...state,
      agents: action.payload,
    };
  },
  [`${setStatus}`](state, action) {
    cookie.set('agent_status', action.payload);
    return {
      ...state,
      status: action.payload,
    };
  },
  [`${changeTab}`](state, action) {
    return {
      ...state,
      activeTab: action.payload,
    };
  },
}, {
  agents: [],
  status:  cookie.get('agent_status') || 'online',
  activeTab: '',
});

export default agents;
