import { createAction } from 'redux-actions';

export const getAgentGroup = createAction('agent/group/get');
export const getAgentGroupSuccess = createAction('agent/group/get/success');

export const editAgentGroup = createAction('agent/group/edit');
export const toggleEditModalVisible = createAction('agent/group/edit/modal/toggle');
export const updateGroupFields = createAction('agent/group/fields/update');
export const submitEditGroup = createAction('agent/edit/group/submit');
export const deleteGroup = createAction('agent/group/delete');
