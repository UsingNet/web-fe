import { createAction } from 'redux-actions';

export const getWechat = createAction('wechat/get');
export const getWechatSuccess = createAction('wechat/get/success');
export const putWechat = createAction('wechat/post');
export const deleteWechat = createAction('wechat/delete');

export const setEditWechat = createAction('wechat/edit/set');
export const updateWechatFields = createAction('wechat/fields/update');

export const toggleGeneralEditVisible = createAction('wechat/general/edit/visible/toggle');
export const toggleAdvanceEditVisible = createAction('wechat/advance/edit/visible/toggle');
