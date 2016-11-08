import { createAction } from 'redux-actions';

export const getCommonQuickReply = createAction('quickReply/common/get');
export const getCommonQuickReplySuccess = createAction('quickReply/common/get/success');
export const getPersonalQuickReply = createAction('quickReply/personal/get');
export const getPersonalQuickReplySuccess = createAction('quickReply/personal/get/success');

export const removeQuickReply = createAction('quickReply/remove');

export const setScrollHeight = createAction('quickReply/scroll/height/set');
export const setActiveTab = createAction('quickReply/active/tab/set');

export const toggleModalVisible = createAction('quickReply/modal/visible/toggle');
export const setEditReply = createAction('quickReply/edit/reply/set');
export const setModalTitle = createAction('quickReply/modal/title/set');

export const updateReplyFields = createAction('quickReply/fields/update');

export const submitQuickReply = createAction('quickReply/submit');
