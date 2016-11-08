import { createAction } from 'redux-actions';

export const getWeibo = createAction('weibo/get');
export const getWeiboSuccess = createAction('weibo/get/success');
export const putWeibo = createAction('weibo/post');
export const deleteWeibo = createAction('weibo/delete');

export const setEditWeibo = createAction('weibo/edit/set');
export const updateWeiboFields = createAction('weibo/fields/update');

export const toggleGeneralEditVisible = createAction('weibo/general/edit/visible/toggle');
