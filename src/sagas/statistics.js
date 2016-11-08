import { takeLatest } from 'redux-saga';
import { put, call, fork, select } from 'redux-saga/effects';
import restHub from 'services/restHub';
import { concatUrlWithParams } from 'modules/helpers';
import ApiUrls from 'constants/ApiUrls';
import * as OverviewStatsActions from 'actions/overviewStats';
import * as AgentStatsActions from 'actions/agentStats';
import * as EvaluationStatsActions from 'actions/evaluationStats';
import * as VisitorStatsActions from 'actions/visitorStats';

function* getHeadline() {
  const getQuerystring = state => state.overviewStats.querystring;
  const querystring = yield select(getQuerystring);
  const url = concatUrlWithParams(ApiUrls.stats.headline, querystring);

  const { jsonResult, errorMsg } = yield call(restHub.get, url);

  if (!errorMsg) {
    yield put(OverviewStatsActions.getHeadlineStatsSuccess(jsonResult));
  }
}

function* getAgent() {
  const getQuerystring = state => state.agentStats.querystring;
  const querystring = yield select(getQuerystring);
  const url = concatUrlWithParams(ApiUrls.stats.agent, querystring);

  const { jsonResult, errorMsg } = yield call(restHub.get, url);

  if (!errorMsg) {
    yield put(AgentStatsActions.getAgentStatsSuccess(jsonResult));
  }
}

function* getAgentHeadline() {
  const getQuerystring = state => state.agentStats.querystring;
  const getAgentId = state => state.agentStats.agentId;
  const querystring = yield select(getQuerystring);
  const querystringCopy = { ...querystring };
  delete querystringCopy.user_id;
  const agentId = yield select(getAgentId);
  const url = concatUrlWithParams(`${ApiUrls.stats.headline}/${agentId}`, querystringCopy);

  const { jsonResult, errorMsg } = yield call(restHub.get, url);

  if (!errorMsg) {
    yield put(AgentStatsActions.getAgentHeadlineSuccess(jsonResult));
  }
}

function* getAgentAttendance() {
  const getQuerystring = state => state.agentStats.querystring;
  const getAgentId = state => state.agentStats.agentId;
  const querystring = yield select(getQuerystring);
  const agentId = yield select(getAgentId);
  querystring.user_id = agentId;

  const url = concatUrlWithParams(ApiUrls.stats.agenttiming, querystring);

  const { jsonResult, errorMsg } = yield call(restHub.get, url);

  if (!errorMsg) {
    yield put(AgentStatsActions.getAgentAttendanceSuccess(jsonResult.data));
  }
}

function* getEvaluation() {
  const getQuerystring = state => state.evaluationStats.querystring;
  const querystring = yield select(getQuerystring);
  const url = concatUrlWithParams(ApiUrls.stats.evaluation, querystring);

  const { jsonResult, errorMsg } = yield call(restHub.get, url);

  if (!errorMsg) {
    yield put(EvaluationStatsActions.getEvaluationStatsSuccess(jsonResult));
  }
}

function* getVisit() {
  const getQuerystring = state => state.visitorStats.querystring;
  const querystring = yield select(getQuerystring);
  const url = concatUrlWithParams(ApiUrls.stats.visit, querystring);

  const { jsonResult, errorMsg } = yield call(restHub.get, url);

  if (!errorMsg) {
    yield put(VisitorStatsActions.getVisitStatsSuccess(jsonResult));
  }
}

function* watchHeadlineGet() {
  yield takeLatest(`${OverviewStatsActions.getHeadlineStats}`, getHeadline);
}

function* watchAgentGet() {
  yield takeLatest(`${AgentStatsActions.getAgentStats}`, getAgent);
}

function* watchAgentHeadlineGet() {
  yield takeLatest(`${AgentStatsActions.getAgentHeadline}`, getAgentHeadline);
}

function* watchAgentAttendance() {
  yield takeLatest(`${AgentStatsActions.getAgentAttendance}`, getAgentAttendance);
}

function* watchEvaluationGet() {
  yield takeLatest(`${EvaluationStatsActions.getEvaluationStats}`, getEvaluation);
}

function* watchVisitGet() {
  yield takeLatest(`${VisitorStatsActions.getVisitStats}`, getVisit);
}

export default function* watchStats() {
  yield fork(watchHeadlineGet);
  yield fork(watchAgentGet);
  yield fork(watchAgentHeadlineGet);
  yield fork(watchAgentAttendance);
  yield fork(watchEvaluationGet);
  yield fork(watchVisitGet);
}
