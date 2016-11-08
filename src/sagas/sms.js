import { takeLatest } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import { message } from 'antd';
import restHub from 'services/restHub';
import ApiUrls from 'constants/ApiUrls';
import * as SmsActions from 'actions/sms';

function* getSmsSetting() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.setting.sms);

  if (!errorMsg) {
    yield put(SmsActions.getSmsSettingSuccess(jsonResult.data));
  }
}

function* postSmsSetting() {
  const getSignatureState = state => state.sms.sms.signature;
  const signature = yield select(getSignatureState);

  const { errorMsg } = yield call(restHub.post, ApiUrls.setting.sms, {
    body: {
      signature,
    },
  });

  if (!errorMsg) {
    yield put(SmsActions.getSmsSetting());
    message.success('修改签名成功');
  }
}

function* getSmsTemplates() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.media.sms);

  if (!errorMsg) {
    yield put(SmsActions.getSmsTemplatesSuccess(jsonResult.data));
  }
}

function* createOrUpdateTemplate() {
  const getEditingTemplate = state => state.sms.editingTemplate;
  const template = yield select(getEditingTemplate);
  let error;

  if (template.id) {
    const url = `${ApiUrls.media.sms}/${template.id}`;
    const { errorMsg } = yield call(restHub.put, url, {
      body: template,
    });

    error = errorMsg;
  } else {
    const { errorMsg } = yield call(restHub.post, ApiUrls.media.sms, {
      body: template,
    });

    error = errorMsg;
  }

  if (!error) {
    yield put(SmsActions.getSmsTemplates());
    yield put(SmsActions.toggleModalVisible());
    message.success('保存成功');
  }
}

function* deleteTemplate(action) {
  const { payload } = action;

  const { errorMsg } = yield call(restHub.remove, `${ApiUrls.media.sms}/${payload}`);

  if (!errorMsg) {
    yield put(SmsActions.getSmsTemplates());
    message.success('删除成功');
  }
}

function* watchSmsGet() {
  yield takeLatest(`${SmsActions.getSmsSetting}`, getSmsSetting);
}

function* watchSmsPost() {
  yield takeLatest(`${SmsActions.postSmsSetting}`, postSmsSetting);
}

function* watchSmsTemplatesGet() {
  yield takeLatest(`${SmsActions.getSmsTemplates}`, getSmsTemplates);
}

function* watchSmsTemplateCreateOrUpdate() {
  yield takeLatest(`${SmsActions.createOrUpdateTemplate}`, createOrUpdateTemplate);
}

function* watchSmsTemplateDelete() {
  yield takeLatest(`${SmsActions.deleteTemplate}`, deleteTemplate);
}

export default function* watchSms() {
  yield fork(watchSmsGet);
  yield fork(watchSmsPost);
  yield fork(watchSmsTemplatesGet);
  yield fork(watchSmsTemplateCreateOrUpdate);
  yield fork(watchSmsTemplateDelete);
}
