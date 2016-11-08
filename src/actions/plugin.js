import { createAction } from 'redux-actions';

export const getPlugin = createAction('plugin/get');
export const getPluginSuccess = createAction('plugin/get/success');
export const postPlugin = createAction('plugin/post');

export const updatePluginFields = createAction('plugin/fields/update');
