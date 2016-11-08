import { createAction } from 'redux-actions';

export const changeTab = createAction('agent/tab/change');

export const postAgentOffline = createAction('agent/offline/post');

export const setStatus = createAction('agent/status/set');

export const getOnlineAgents = createAction('agent/online/get');
export const getOnlineAgentsSuccess = createAction('agent/online/get/success');
