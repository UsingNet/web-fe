import { createAction } from 'redux-actions';

export const getAgentStats = createAction('stats/agent/get');
export const getAgentStatsSuccess = createAction('stats/agent/get/success');

export const setScrollHeight = createAction('stats/agent/scroll/height/set');
export const setFetchQueryString = createAction('stats/agent/querystring/set');
export const deleteFetchQueryString = createAction('stats/agent/querystring/delete');

export const setExpandedRowkeys = createAction('stats/agent/row/keys/set');

export const setAgentId = createAction('stats/agent/id/set');

export const getAgentHeadline = createAction('stats/agent/headline/get');
export const getAgentHeadlineSuccess = createAction('stats/agent/headline/get/success');

export const getAgentAttendance = createAction('stats/agent/attendance/get');
export const getAgentAttendanceSuccess = createAction('stats/agent/attendance/get/success');
