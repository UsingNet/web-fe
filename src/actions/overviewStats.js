import { createAction } from 'redux-actions';

export const getHeadlineStats = createAction('stats/headline/get');
export const getHeadlineStatsSuccess = createAction('stats/headline/get/success');

export const setFetchQueryString = createAction('stats/headline/querystring/set');
