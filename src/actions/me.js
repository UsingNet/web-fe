import { createAction } from 'redux-actions';

export const getMe = createAction('me/get');
export const getMeSuccess = createAction('me/get/success');
export const postMe = createAction('me/post');

export const updateMeFields = createAction('me/fields/update');
