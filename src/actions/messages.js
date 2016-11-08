import { createAction } from 'redux-actions';

export const showMail = createAction('messages/mail/show');
export const hideMail = createAction('messages/mail/hide');

export const receiveMessage = createAction('messages/receive');
export const pushMessage = createAction('messages/push');

export const getMessageList = createAction('message/list/get');
export const getMessageListSuccess = createAction('message/list/get/success');

export const sendMessage = createAction('message/send');
export const sendMessageSuccess = createAction('message/send/success');

export const sendNoteOrSms = createAction('message/note/or/sms/send');

export const getMoreMessage = createAction('message/more/get');
export const getMoreMessageSuccess = createAction('message/more/get/success');

export const undoMessage = createAction('message/undo');
export const toggleMessageUndoStatus = createAction('message/undo/status/toggle');

export const readMessages = createAction('messages/read');
