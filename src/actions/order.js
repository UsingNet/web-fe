import { createAction } from 'redux-actions';

export const getOrder = createAction('order/get');
export const getOrderSuccess = createAction('order/get/success');

export const putOrder = createAction('order/put');
export const updateSelectedOrder = createAction('order/selected/update');
export const infoTabChange = createAction('order/info/tab/change');
export const updateContactTags = createAction('order/contact/tags/update');

export const getOrderCategory = createAction('order/category/get');
export const getOrderCategorySuccess = createAction('order/category/get/success');
export const updateSearchedCategory = createAction('order/searched/category/update');
export const updateCategory = createAction('order/category/update');

export const updatePrevOrders = createAction('order/prev/update');
export const updateLastTimeOrders = createAction('order/lasttime/update');
export const updateChatMessages = createAction('order/chat/messages/update');

export const shiftOrder = createAction('order/shift');
export const shiftOrderSuccess = createAction('order/shift/success');

export const closeOrder = createAction('order/close');
export const closeOrderSuccess = createAction('order/close/success');

export const unreadOrder = createAction('order/unread');
export const readOrder = createAction('order/read');

export const initOrderExtraInfo = createAction('order/extra/info/init');
export const setOrderExtraInfo = createAction('order/extra/info/set');

export const setSelectedOrder = createAction('order/selected/set');
export const updateClientInfoFields = createAction('order/client/info/fields/update');

export const setOrderUnread = createAction('order/unread/set');
export const setOrderLastReply = createAction('order/last/reply/set');

export const setNewOrderId = createAction('order/new/id/set');
export const afterGetNewOrder = createAction('order/new/get');

export const launchChat = createAction('order/chat/launch');

export const getStatsOrder = createAction('stats/order/get');
export const getStatsOrderSuccess = createAction('stats/order/get/success');
