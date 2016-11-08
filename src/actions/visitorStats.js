import { createAction } from 'redux-actions';

export const getVisitStats = createAction('stats/visitor/get');
export const getVisitStatsSuccess = createAction('stats/visitor/get/success');

export const setScrollHeight = createAction('stats/visitor/scroll/height/set');
export const setFetchQueryString = createAction('stats/visitor/querystring/set');
export const deleteFetchQueryString = createAction('stats/visitor/querystring/delete');
