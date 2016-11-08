import { takeLatest } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';
import ApiUrls from 'constants/ApiUrls';
import restHub from 'services/restHub';
import { getOnlineClients, getOnlineClientsSuccess } from 'actions/client';


function* getClients() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.client.online);
  if (!errorMsg) {
    yield put(getOnlineClientsSuccess(jsonResult.data));
  }
}

function* watchClientsGet() {
  yield takeLatest(`${getOnlineClients}`, getClients);
}

export default function* watchClients() {
  yield fork(watchClientsGet);
}
