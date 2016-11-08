import { takeLatest } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import { message } from 'antd';
import restHub from 'services/restHub';
import ApiUrls from 'constants/ApiUrls';
import * as PluginActions from 'actions/plugin';

function* getPlugin() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.setting.plugin);

  if (!errorMsg) {
    yield put(PluginActions.getPluginSuccess(jsonResult.data));
  }
}

function* postPlugin() {
  const getPluginState = state => state.plugin;
  const plugin = yield select(getPluginState);

  const { errorMsg } = yield call(restHub.post, ApiUrls.setting.plugin, {
    body: plugin,
  });

  if (!errorMsg) {
    message.success('提交成功');
  }
}

function* watchPluginGet() {
  yield takeLatest(`${PluginActions.getPlugin}`, getPlugin);
}

function* watchPluginPost() {
  yield takeLatest(`${PluginActions.postPlugin}`, postPlugin);
}

export default function* watchPlugin() {
  yield fork(watchPluginGet);
  yield fork(watchPluginPost);
}
