import { createAction } from 'redux-actions';

export const getMail = createAction('mail/get');
export const getMailSuccess = createAction('mail/get/success');

export const updateMailFields = createAction('mail/form/update');
export const postMail = createAction('mail/post');
