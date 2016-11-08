import { takeLatest } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import restHub from 'services/restHub';
import ApiUrls from 'constants/ApiUrls';
import * as VoipActions from 'actions/voip';

function* applyVoip() {
  const { errorMsg } = yield call(restHub.post, ApiUrls.setting.voip, {
    body: {
      status: 'CHECKING',
    },
  });

  if (!errorMsg) {
    yield put(VoipActions.getVoip());
  }
}

function* watchVoipApply() {
  yield takeLatest(`${VoipActions.applyVoip}`, applyVoip);
}

function* getVoip() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.setting.voip);

  if (!errorMsg) {
    yield put(VoipActions.getVoipSuccess(jsonResult.data));
  }
}

function* postVoip() {
  const getVoipState = state => state.voip.voip;
  const voip = yield select(getVoipState);

  const { jsonResult, errorMsg } = yield call(restHub.post, ApiUrls.setting.voip, {
    body: {
      display_number: voip.display_number,
      display_number_files: voip.display_number_files,
      evaluation: voip.evaluation,
    },
  });

  if (!errorMsg) {
    yield put(VoipActions.getVoipSuccess(jsonResult.data));
  }
}

function* watchVoipGet() {
  yield takeLatest(`${VoipActions.getVoip}`, getVoip);
}

function* watchVoipPost() {
  yield takeLatest(`${VoipActions.postVoip}`, postVoip);
}

export default function* watchVoip() {
  yield fork(watchVoipGet);
  yield fork(watchVoipApply);
  yield fork(watchVoipPost);
}
