import { createAction } from 'redux-actions';

export const getExpenseRecord = createAction('expense/record/get');
export const getExpenseRecordSuccess = createAction('expense/record/get/success');

export const setScrollHeight = createAction('expense/record/scroll/height/set');
export const setFetchQueryString = createAction('expense/record/fetch/querystring/set');
