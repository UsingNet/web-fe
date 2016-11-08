import { createAction } from 'redux-actions';

export const getSmsSetting = createAction('setting/sms/get');
export const getSmsSettingSuccess = createAction('setting/sms/get/success');

export const updateSmsFormFields = createAction('sms/form/fields/update');

export const postSmsSetting = createAction('setting/sms/post');

export const getSmsTemplates = createAction('sms/template/get');
export const getSmsTemplatesSuccess = createAction('sms/template/get/success');

export const toggleModalVisible = createAction('sms/modal/visible/toggle');
export const changeModalTitle = createAction('sms/modal/title/change');
export const changeEditingTemplate = createAction('sms/template/editing/change');
export const updateEditingTemplateFields = createAction('sms/template/fields/update');

export const createOrUpdateTemplate = createAction('sms/template/create/or/update');
export const deleteTemplate = createAction('sms/template/delete');
