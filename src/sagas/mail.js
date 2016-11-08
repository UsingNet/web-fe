import { takeLatest } from 'redux-saga';
import { put, call, fork, select } from 'redux-saga/effects';
import { message } from 'antd';
import restHub from 'services/restHub';
import ApiUrls from 'constants/ApiUrls';
import * as MailActions from 'actions/mail';

function* getMail() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.setting.mail);

  if (!errorMsg) {
    yield put(MailActions.getMailSuccess(jsonResult.data));
  }
}

function* postMail() {
  const getMailState = state => state.mail;
  const mail = yield select(getMailState);

  const { errorMsg } = yield call(restHub.post, ApiUrls.setting.mail, {
    body: mail,
  });

  if (!errorMsg) {
    message.success('提交成功');
  }
}

function* watchMailGet() {
  yield takeLatest(`${MailActions.getMail}`, getMail);
}

function* watchMailPost() {
  yield takeLatest(`${MailActions.postMail}`, postMail);
}

export default function* watchMail() {
  yield fork(watchMailPost);
  yield fork(watchMailGet);
}
