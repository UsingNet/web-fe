import { takeLatest } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import restHub from 'services/restHub';
import ApiUrls from 'constants/ApiUrls';
import * as AgentGroupActions from 'actions/agentGroup';

function* getAgentGroup() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.group);

  if (!errorMsg) {
    yield put(AgentGroupActions.getAgentGroupSuccess(jsonResult));
  }
}

function* submitEditGroup() {
  const getGroup = state => {
    const userIds = state.agentGroup.editGroup.users.map(u => (u.id ? `${u.id}` : u));

    return {
      ...state.agentGroup.editGroup,
      users: userIds,
    };
  };

  const group = yield select(getGroup);
  let error = '';

  if (group.id) {
    const { errorMsg } = yield call(restHub.put, `${ApiUrls.group}/${group.id}`, {
      body: group,
    });

    error = errorMsg;
  } else {
    const { errorMsg } = yield call(restHub.post, ApiUrls.group, {
      body: group,
    });

    error = errorMsg;
  }

  if (!error) {
    yield put(AgentGroupActions.getAgentGroup());
    yield put(AgentGroupActions.toggleEditModalVisible());
  }
}

function* deleteGroup(action) {
  const url = `${ApiUrls.group}/${action.payload}`;

  const { errorMsg } = yield call(restHub.remove, url);

  if (!errorMsg) {
    yield put(AgentGroupActions.getAgentGroup());
  }
}

function* watchAgentGroupGet() {
  yield takeLatest(`${AgentGroupActions.getAgentGroup}`, getAgentGroup);
}

function* watchAgentGroupSubmit() {
  yield takeLatest(`${AgentGroupActions.submitEditGroup}`, submitEditGroup);
}

function* watchAgentGroupDelete() {
  yield takeLatest(`${AgentGroupActions.deleteGroup}`, deleteGroup);
}

export default function* watchAgentGroup() {
  yield fork(watchAgentGroupGet);
  yield fork(watchAgentGroupSubmit);
  yield fork(watchAgentGroupDelete);
}
