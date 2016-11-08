import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import ApiUrls from 'constants/ApiUrls';
import restHub from 'services/restHub';
import * as TagActions from 'actions/tag';

function* getTags() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.tag);

  if (!errorMsg) {
    yield put(TagActions.getTagsSuccess(jsonResult.data));
  }
}

export default function* watchTagsGet() {
  yield takeLatest(`${TagActions.getTags}`, getTags);
}
