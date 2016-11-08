import { createAction } from 'redux-actions';

export const getSites = createAction('sites/get');
export const getSitesSuccess = createAction('sites/get/success');

export const setActiveTab = createAction('sites/tab/active/set');

export const addSite = createAction('site/add');
export const removeSite = createAction('site/remove');
export const removeAddedSite = createAction('site/added/remove');

export const updateSiteValue = createAction('site/value/update');
export const togglePageDistanceEdit = createAction('site/pagedistance/edit/hide');

export const changeOrder = createAction('site/order/change');
export const addOrderForm = createAction('site/order/form/add');
export const editOrderForm = createAction('site/order/form/edit');
export const updateOrderForm = createAction('site/order/form/update');
export const toggleOrderFormModalVisible = createAction('site/order/modal/visible/toggle');

export const addOrderFormItem = createAction('site/order/item/add');
export const updateOrderFormItemValue = createAction('site/order/item/value/update');
export const upOrderFormItem = createAction('site/order/item/up');
export const downOrderFormItem = createAction('site/order/item/down');
export const removeOrderFormItem = createAction('site/order/item/remove');

export const toggleAccessCode = createAction('site/access/modal/toggle');

export const toggleCustomColorVisible = createAction('site/color/custom/visible/toggle');

export const updateInviteImage = createAction('site/invite/image/update');

export const submitSite = createAction('site/form/submit');
