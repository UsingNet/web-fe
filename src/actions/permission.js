import { createAction } from 'redux-actions';

export const getPermission = createAction('permission/get');
export const getPermissionSuccess = createAction('permission/get/success');

export const postPermission = createAction('permission/post');

export const updatePermission = createAction('permission/update');
