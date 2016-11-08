import { createAction } from 'redux-actions';

export const setScrollHeight = createAction('history/scroll/height/set');
export const setFetchQueryString = createAction('history/fetch/querystring/set');
export const deleteFetchQueryString = createAction('history/fetch/querystring/delete');
export const toggleRecordOpen = createAction('history/record/open/toggle');

export const setOpenedOrder = createAction('history/opened/order/set');
export const setAction = createAction('history/action/set');
