import { takeLatest } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import ApiUrls from 'constants/ApiUrls';
import restHub from 'services/restHub';
import * as AgentActions from 'actions/agent'
import { postAgentOffline as agentOffline } from 'actions/agent';

function* getAgents() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.agent.online);
  if (!errorMsg) {
    yield put(AgentActions.getOnlineAgentsSuccess(jsonResult.data));
  }
}

function* postAgentOffline(action) {
  let id;
  if (!action.payload) {
    const meState = state => state.me;
    const me = yield select(meState);
    id = me.id;
    yield put(setStatus('offline'));
  } else {
    id = action.payload.id;
    const agentState = state => state.agents.agents;
    let agents = yield select(agentState);
    agents.forEach(agent => {
      if (agent.id === id) {
        agent.status = 'offlineing';
      }
    });
    agents = [...agents];
    yield put(AgentActions.getOnlineAgentsSuccess(agents));
  }

  const url = `${ApiUrls.agent.offline}/${id}`;
  const { errorMsg } = yield call(restHub.post, url, {});
  if (!errorMsg) {
    yield put(AgentActions.getOnlineAgents());
  }
}

function* watchAgentsGet() {
  yield takeLatest(`${AgentActions.getOnlineAgents}`, getAgents);
}

function* watchAgentOfflinePost() {
  yield takeLatest(`${agentOffline}`, postAgentOffline);
}

export default function* watchAgents() {
  yield fork(watchAgentsGet);
  yield fork(watchAgentOfflinePost);
}
