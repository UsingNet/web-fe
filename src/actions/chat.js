import { createAction } from 'redux-actions';

export const togglePicPreview = createAction('chat/pic/preview/toggle');
export const setPicUrl = createAction('chat/pic/url/set');

export const toggleFastReplyVisible = createAction('chat/fastreply/visible/toggle');
export const setFastReplyTab = createAction('chat/fastreply/tab/set');

export const togglePasteImageVisible = createAction('chat/paste/image/visible/toggle');
export const sendImageBlob = createAction('chat/image/blob/send');

export const setMatchedReplies = createAction('chat/quick/reply/matched/set');
export const setActiveReply = createAction('chat/active/reply/set');

export const setSmsTemplateContent = createAction('chat/sms/template/content/set');
export const setSmsTemplateHtml = createAction('chat/sms/template/html/set');

export const toggleAppsVisible = createAction('chat/apps/visible/toggle');
