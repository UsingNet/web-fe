import { createAction } from 'redux-actions';

export const getContacts = createAction('contacts/get');
export const getContactsSuccess = createAction('contacts/get/success');

export const setScrollHeight = createAction('contact/scroll/height/set');
export const setFetchQueryString = createAction('contact/fetch/querystring/set');
export const deleteFetchQueryString = createAction('contact/fetch/querystring/delete');
export const changeSearchKeyword = createAction('contact/search/keyword/change');
export const searchContacts = createAction('contact/search');

export const changeModalTitle = createAction('contact/modal/title/change');
export const toggleModalVisible = createAction('contact/modal/visible/toggle');
export const setEditContact = createAction('contact/edit/set');
export const updateEditContact = createAction('contact/edit/update');

export const postContact = createAction('contact/post');
export const deleteContact = createAction('contact/delete');
