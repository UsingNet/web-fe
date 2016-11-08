import { takeLatest } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import { message } from 'antd';
import restHub from 'services/restHub';
import ApiUrls from 'constants/ApiUrls';
import { getPermission } from 'actions/permission';
import * as MeActions from 'actions/me';

function* getMe() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.me);

  if (!errorMsg) {
    yield put(MeActions.getMeSuccess(jsonResult.data));
    yield put(getPermission());
  }
}

function* postMe() {
  const meState = state => {
    const me = state.me;

    if (me.changePassword) {
      return {
        img: me.img,
        password: me.password,
        newpassword: me.newpassword,
        newpassword_confirmation: me.newpassword_confirmation,
      };
    }

    return {
      img: me.img,
    };
  };

  const me = yield select(meState);

  const { errorMsg } = yield call(restHub.post, ApiUrls.me, {
    body: me,
  });

  if (!errorMsg) {
    message.success('修改成功');
    yield put(MeActions.getMe());
  }
}

function* watchMePost() {
  yield takeLatest(`${MeActions.postMe}`, postMe);
}

function* watchMeGet() {
  yield takeLatest(`${MeActions.getMe}`, getMe);
}

export default function* watchMe() {
  yield fork(watchMeGet);
  yield fork(watchMePost);
}
