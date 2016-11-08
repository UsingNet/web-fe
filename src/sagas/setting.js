import { takeLatest } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import cookie from 'js-cookie';
import { message } from 'antd';
import { push } from 'react-router-redux';
import restHub from 'services/restHub';
import ApiUrls from 'constants/ApiUrls';
import * as BaseSettingActions from 'actions/baseSetting';
import * as AssignActions from 'actions/assign';
import { postAgentOffline } from 'actions/agent';
import { connect } from 'actions/socket';
import {
  getSites as getSitesAction,
  getSitesSuccess as getSitesSuccessAction,
  submitSite as submitSiteAction,
  removeSite as removeSiteAction,
  removeAddedSite,
  setActiveTab,
} from 'actions/web';

const getAssignState = state => state.assign;

/**
 * 基础设置
 */
function* getBaseSetting() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.setting.base);

  if (!errorMsg) {
    yield put(BaseSettingActions.getBaseSettingSuccess(jsonResult.data));

    const setting = jsonResult.data;

    if (setting.plan.slug !== 'experience'
        && setting.expiration < 15
        && !cookie.get('plan_expiration_tips')
    ) {
      message.warning(`您的套餐还有 ${setting.expiration} 天到期，请及时续费`, 5);
      cookie.set('plan_expiration_tips', 1, { path: '/' });
    }

    if (setting.online + 1 > setting.plan.agent_num) {
      yield put(postAgentOffline());
    } else if (location.pathname === '/limit') {
      yield put(push('/'));
    }

    if (cookie.get('agent_status') === 'online') {
      yield put(connect(jsonResult.data.socket_token));
    }
  }
}

function* watchBaseGet() {
  yield takeLatest(`${BaseSettingActions.getBaseSetting}`, getBaseSetting);
}

/**
 * 网站设置
 */
function* getSites() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.setting.web);

  if (!errorMsg) {
    yield put(getSitesSuccessAction(jsonResult.data));
  }
}

function* watchSitesGet() {
  yield takeLatest(`${getSitesAction}`, getSites);
}

function* submitSite(action) {
  const { payload } = action;
  const getSiteState = state => state.web.sites[payload];
  const site = yield select(getSiteState);
  let url = `${ApiUrls.setting.web}`;
  let error = '';

  if (site.id) {
    url = `${ApiUrls.setting.web}/${site.id}`;
    const { errorMsg } = yield call(restHub.put, url, {
      body: site,
    });
    error = errorMsg;
  } else {
    const { errorMsg } = yield call(restHub.post, url, {
      body: site,
    });
    error = errorMsg;
  }

  if (!error) {
    message.success('提交成功');
    yield put(getSitesAction());
  }
}

function* watchSiteSubmit() {
  yield takeLatest(`${submitSiteAction}`, submitSite);
}

function* removeSite(action) {
  const { payload } = action;

  if (payload) {
    const { errorMsg } = yield call(restHub.remove, `${ApiUrls.setting.web}/${payload}`);

    if (!errorMsg) {
      message.success('删除成功');
      yield put(setActiveTab('0'));
    }
  } else {
    yield put(removeAddedSite());
  }
}

function* watchSiteRemove() {
  yield takeLatest(`${removeSiteAction}`, removeSite);
}

function* getAssign() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.setting.assign);

  if (!errorMsg) {
    yield put(AssignActions.getAssignSuccess(jsonResult.data));
  }
}

function* watchAssignGet() {
  yield takeLatest(`${AssignActions.getAssign}`, getAssign);
}

function* postAssign() {
  const assignData = yield select(getAssignState);

  const { jsonResult, errorMsg } = yield call(restHub.post, ApiUrls.setting.assign, {
    body: assignData,
  })

  // eslint-disable-next-line no-empty
  if (!errorMsg) {
    yield put(AssignActions.getAssignSuccess(jsonResult.data));
  }
}

function* watchAssignPost() {
  yield takeLatest(`${AssignActions.submitAssignFields}`, postAssign);
}

export default function* watchSettingGet() {
  yield fork(watchBaseGet);
  yield fork(watchAssignGet);
  yield fork(watchSitesGet);
  yield fork(watchAssignPost);
  yield fork(watchSiteSubmit);
  yield fork(watchSiteRemove);
}
