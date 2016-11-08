import { takeLatest } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import { message } from 'antd';
import restHub from 'services/restHub';
import ApiUrls from 'constants/ApiUrls';
import * as WeiboActions from 'actions/weibo';

function* getWeibo() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.setting.weibo);

  if (!errorMsg) {
    yield put(WeiboActions.getWeiboSuccess(jsonResult.data));
  }
}

function* putWeibo(action) {
  const { payload } = action;
  let getEditWeibo;

  if (payload === 'general') {
    getEditWeibo = state => ({
      id: state.weibo.editWeibo.id,
      // evaluation: state.weibo.editWeibo.evaluation,
      default_reply: state.weibo.editWeibo.default_reply,
      not_online_agent_reply: state.weibo.editWeibo.not_online_agent_reply,
    });
  }

  if (!getEditWeibo) {
    yield false;
  }

  const weibo = yield select(getEditWeibo);
  const url = `${ApiUrls.setting.weibo}/${weibo.id}?type=${payload}`;

  const { errorMsg } = yield call(restHub.put, url, {
    body: weibo,
  });

  if (!errorMsg) {
    message.success('保存成功');
    yield put(WeiboActions.getWeibo());

    if (payload === 'general') {
      yield put(WeiboActions.toggleGeneralEditVisible());
    }
  }
}

function* deleteWeibo(action) {
  const { payload } = action;
  const url = `${ApiUrls.setting.weibo}/${payload}`;

  const { errorMsg } = yield call(restHub.remove, url);

  if (!errorMsg) {
    message.success('删除成功');
  }
}

function* watchWeiboGet() {
  yield takeLatest(`${WeiboActions.getWeibo}`, getWeibo);
}

function* watchWeiboPut() {
  yield takeLatest(`${WeiboActions.putWeibo}`, putWeibo);
}

function* watchWeiboDelete() {
  yield takeLatest(`${WeiboActions.deleteWeibo}`, deleteWeibo);
}

export default function* watchWeibo() {
  yield fork(watchWeiboGet);
  yield fork(watchWeiboPut);
  yield fork(watchWeiboDelete);
}
