import { createAction } from 'redux-actions';

export const getMember = createAction('member/get');
export const getMemberSuccess = createAction('member/get/success');

export const setEditMember = createAction('member/edit/set');

export const updateEditMember = createAction('member/edit/update');
export const toggleModalVisible = createAction('member/modal/visible/toggle');

export const postMember = createAction('member/post');
export const deleteMember = createAction('member/delete');
