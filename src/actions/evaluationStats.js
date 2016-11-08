import { createAction } from 'redux-actions';

export const getEvaluationStats = createAction('stats/evaluation/get');
export const getEvaluationStatsSuccess = createAction('stats/evaluation/get/success');

export const setScrollHeight = createAction('stats/evaluation/scroll/height/set');
export const setFetchQueryString = createAction('stats/evaluation/querystring/set');
export const deleteFetchQueryString = createAction('stats/evaluation/querystring/delete');

export const toggleModalVisible = createAction('stats/evaluation/modal/visible/toggle');
export const setEvaluationContent = createAction('stats/evaluation/content/set');
