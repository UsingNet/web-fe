import { takeLatest } from 'redux-saga';
import { call, put, select, fork } from 'redux-saga/effects';
import restHub from 'services/restHub';
import ApiUrls from 'constants/ApiUrls';
import { setSidebarMenu } from 'actions/menu';
import * as PermissionActions from 'actions/permission';
import { Message } from 'antd';

function* getPermission() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.permission);

  if (!errorMsg) {
    yield put(PermissionActions.getPermissionSuccess(jsonResult.data));

    const getMe = (state) => state.me;
    const me = yield select(getMe);

    yield put(setSidebarMenu({
      permission: jsonResult.data,
      me,
    }));
  }
}

function* postPermission() {
  const getPermissionState = state => {
    const ids = [];
    const usedPermissions = state.permission.permissions.filter(p => p.used);

    for (const pm of usedPermissions) {
      ids.push(pm.id);
    }

    return ids;
  };

  const permissions = yield select(getPermissionState);

  const { errorMsg } = yield call(restHub.post, ApiUrls.permission, {
    body: {
      ids: permissions,
    },
  });

  if (!errorMsg) {
    Message.success('保存成功')
  } else {
    Message.error(errorMsg);
  }
}

function* watchPermissionGet() {
  yield takeLatest(`${PermissionActions.getPermission}`, getPermission);
}

function* watchPermissionPost() {
  yield takeLatest(`${PermissionActions.postPermission}`, postPermission);
}

export default function* watchPermission() {
  yield fork(watchPermissionGet);
  yield fork(watchPermissionPost);
}
