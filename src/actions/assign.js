import { createAction } from 'redux-actions';

export const updateAssignFields = createAction('assign/fields/update');
export const submitAssignFields = createAction('assign/fields/submit');

export const getAssign = createAction('assign/get');
export const getAssignSuccess = createAction('assign/get/success');
