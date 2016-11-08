import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import ApiUrls from 'constants/ApiUrls';
import restHub from 'services/restHub';
import { setStatus } from 'actions/agent';
import { getOnlineSuccess } from 'actions/dashboard';
import { offline as postOfflineAction } from 'actions/agent';

function* postOffline() {
  const { jsonResult, errorMsg } = yield call(restHub.post, ApiUrls.user.offline, {});

  if (!errorMsg) {
    const getOnlineAgents = (state) => state.agents.agents;
    const agents = yield select(getOnlineAgents);

    const onlineAgents = agents.filter(agent => agent.id !== jsonResult.data.id);

    yield put(getOnlineSuccess(onlineAgents));
    yield put(setStatus('offline'));
  }
}

export default function* watchOfflinePost() {
  yield takeLatest(`${postOfflineAction}`, postOffline);
}
