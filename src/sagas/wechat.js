import { takeLatest } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import { message } from 'antd';
import restHub from 'services/restHub';
import ApiUrls from 'constants/ApiUrls';
import * as WechatActions from 'actions/wechat';

function* getWechat() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.setting.wechat);

  if (!errorMsg) {
    yield put(WechatActions.getWechatSuccess(jsonResult.data));
  }
}

function* putWechat(action) {
  const { payload } = action;
  let getEditWechat;

  if (payload === 'general') {
    getEditWechat = state => ({
      id: state.wechat.editWechat.id,
      evaluation: state.wechat.editWechat.evaluation,
      default_reply: state.wechat.editWechat.default_reply,
      not_online_agent_reply: state.wechat.editWechat.not_online_agent_reply,
    });
  } else if (payload === 'advance') {
    getEditWechat = state => ({
      id: state.wechat.editWechat.id,
      url: state.wechat.editWechat.url,
      encoding_aes_key: state.wechat.editWechat.encoding_aes_key,
      mode: state.wechat.editWechat.mode,
      token: state.wechat.editWechat.token,
    });
  }

  if (!getEditWechat) {
    yield false;
  }

  const wechat = yield select(getEditWechat);
  const url = `${ApiUrls.setting.wechat}/${wechat.id}?type=${payload}`;

  const { errorMsg } = yield call(restHub.put, url, {
    body: wechat,
  });

  if (!errorMsg) {
    message.success('保存成功');
    yield put(WechatActions.getWechat());

    if (payload === 'general') {
      yield put(WechatActions.toggleGeneralEditVisible());
    } else if (payload === 'advance') {
      yield put(WechatActions.toggleAdvanceEditVisible());
    }
  }
}

function* deleteWechat(action) {
  const { payload } = action;
  const url = `${ApiUrls.setting.wechat}/${payload}`;

  const { errorMsg } = yield call(restHub.remove, url);

  if (!errorMsg) {
    message.success('删除成功');
  }
}

function* watchWechatGet() {
  yield takeLatest(`${WechatActions.getWechat}`, getWechat);
}

function* watchWechatPut() {
  yield takeLatest(`${WechatActions.putWechat}`, putWechat);
}

function* watchWechatDelete() {
  yield takeLatest(`${WechatActions.deleteWechat}`, deleteWechat);
}

export default function* watchWechat() {
  yield fork(watchWechatGet);
  yield fork(watchWechatPut);
  yield fork(watchWechatDelete);
}
