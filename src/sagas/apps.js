import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import ApiUrls from 'constants/ApiUrls';
import restHub from 'services/restHub';
import * as AppstoreActions from 'actions/appstore';

function* getApps() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.appstore);

  if (!errorMsg) {
    yield put(AppstoreActions.getAppsSuccess(jsonResult.data));
  }
}

function* enableApp(action) {
  const { payload } = action;
  const { errorMsg } = yield call(restHub.post, ApiUrls.appstore, {
    body: {
      id: payload,
    },
  });

  if (!errorMsg) {
    yield put(AppstoreActions.getApps());
  }
}

function* disableApp(action) {
  const { payload } = action;
  const { errorMsg } = yield call(restHub.remove, `${ApiUrls.appstore}/${payload}`);

  if (!errorMsg) {
    yield put(AppstoreActions.getApps());
  }
}

function* getApp(action) {
  const { payload } = action;
  const { jsonResult, errorMsg } = yield call(restHub.get, `${ApiUrls.appstore}/${payload}`);

  if (!errorMsg) {
    yield put(AppstoreActions.getAppSuccess(jsonResult.data.url));
  }
}

function* watchAppsGet() {
  yield takeLatest(`${AppstoreActions.getApps}`, getApps);
}

function* watchAppEnable() {
  yield takeLatest(`${AppstoreActions.enableApp}`, enableApp);
}

function* watchAppDisable() {
  yield takeLatest(`${AppstoreActions.disableApp}`, disableApp);
}

function* watchAppGet() {
  yield takeLatest(`${AppstoreActions.getApp}`, getApp);
}

export default function* watchApps() {
  yield fork(watchAppsGet);
  yield fork(watchAppEnable);
  yield fork(watchAppDisable);
  yield fork(watchAppGet);
}
