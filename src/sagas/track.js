import { takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import ApiUrls from 'constants/ApiUrls';
import restHub from 'services/restHub';
import { concatUrlWithParams } from 'modules/helpers';
import * as TrackActions from 'actions/track';

function* getTrack(action) {
  const { visitorId, params, type } = action.payload;
  const url = concatUrlWithParams(ApiUrls.track, params);
  const { jsonResult, errorMsg } = yield call(restHub.get, url);

  if (!errorMsg) {
    if (type === 'order') {
      yield put(TrackActions.getOrderTrackSuccess(jsonResult));
    } else {
      yield put(TrackActions.getTrackSuccess({ id: visitorId, data: jsonResult }));
    }
  }
}

export default function* watchTrackGet() {
  yield takeLatest(`${TrackActions.getTrack}`, getTrack);
}
