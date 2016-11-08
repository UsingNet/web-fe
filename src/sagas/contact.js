import { takeLatest } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import { message } from 'antd';
import { concatUrlWithParams } from 'modules/helpers';
import ApiUrls from 'constants/ApiUrls';
import restHub from 'services/restHub';
import {
  getContacts as getContactsAction,
  getContactsSuccess,
  searchContacts as searchContactsAction,
  postContact as postContactAction,
  deleteContact as deleteContactAction,
  toggleModalVisible,
} from 'actions/contact';

function* getContacts() {
  const getQuerystring = state => state.contact.querystring;
  const querystring = yield select(getQuerystring);
  const url = concatUrlWithParams(ApiUrls.contact, querystring);

  const { jsonResult, errorMsg } = yield call(restHub.get, url);

  if (!errorMsg) {
    yield put(getContactsSuccess(jsonResult));
  }
}

function* searchContacts() {
  const getQuerystring = state => state.contact.querystring;
  const querystring = yield select(getQuerystring);
  const url = concatUrlWithParams(ApiUrls.contact, querystring);

  const { jsonResult, errorMsg } = yield call(restHub.get, url);

  if (!errorMsg) {
    yield put(getContactsSuccess(jsonResult));
  }
}

function* postContact(action) {
  const { payload } = action;
  let contact = {};
  if (payload) {
    contact = payload;
  } else {
    const getContact = state => state.contact.editContact;
    contact = yield select(getContact);
  }

  const url = contact.id ? `${ApiUrls.contact}/${contact.id}` : ApiUrls.contact;
  let res;

  if (contact.id) {
    res = yield call(restHub.put, url, {
      body: contact,
    });
  } else {
    res = yield call(restHub.post, url, {
      body: contact,
    });
  }

  if (res && !res.errorMsg) {
    yield put(getContactsAction());
    yield put(toggleModalVisible());
    message.success('修改成功');
  }
}

function* deleteContact(action) {
  const id = action.payload;
  const url = `${ApiUrls.contact}/${id}`;
  const { errorMsg } = yield call(restHub.remove, url);

  if (!errorMsg) {
    yield put(getContactsAction());
    message.success('删除成功');
  }
}

function* watchContactsGet() {
  yield takeLatest(`${getContactsAction}`, getContacts);
}

function* watchContactsSearch() {
  yield takeLatest(`${searchContactsAction}`, searchContacts);
}

function* watchContactPost() {
  yield takeLatest(`${postContactAction}`, postContact);
}

function* watchContactDelete() {
  yield takeLatest(`${deleteContactAction}`, deleteContact);
}

export default function* watchContact() {
  yield fork(watchContactsGet);
  yield fork(watchContactsSearch);
  yield fork(watchContactPost);
  yield fork(watchContactDelete);
}
