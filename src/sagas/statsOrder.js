import { takeLatest } from 'redux-saga';
import { put, call, select } from 'redux-saga/effects';
import restHub from 'services/restHub';
import { concatUrlWithParams } from 'modules/helpers';
import ApiUrls from 'constants/ApiUrls';
import * as OrderActions from 'actions/order';


function* getStatsOrder() {
  const getQuerystring = state => state.history.querystring;
  const querystring = yield select(getQuerystring);
  const url = concatUrlWithParams(ApiUrls.stats.order, querystring);

  const { jsonResult, errorMsg } = yield call(restHub.get, url);

  if (!errorMsg) {
    yield put(OrderActions.getStatsOrderSuccess(jsonResult));
  }
}

export default function* watchStatsOrderGet() {
  yield takeLatest(`${OrderActions.getStatsOrder}`, getStatsOrder);
}
