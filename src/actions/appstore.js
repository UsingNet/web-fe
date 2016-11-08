import { createAction } from 'redux-actions';

export const getApps = createAction('apps/get');
export const getAppsSuccess = createAction('apps/get/success');
export const getApp = createAction('app/get');
export const getAppSuccess = createAction('app/get/success');
export const enableApp = createAction('apps/enable');
export const disableApp = createAction('apps/disable');
