import { takeLatest } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import { message } from 'antd';
import ApiUrls from 'constants/ApiUrls';
import restHub from 'services/restHub';
import * as MemberActions from 'actions/member';

function* getMember() {
  const { jsonResult, errorMsg } = yield call(restHub.get, ApiUrls.member);

  if (!errorMsg) {
    yield put(MemberActions.getMemberSuccess(jsonResult.data));
  }
}

function* postMember() {
  const getMemberState = state => state.member.editMember;
  const member = yield select(getMemberState);

  const url = member.id ? `${ApiUrls.member}/${member.id}` : ApiUrls.member;

  let res;

  if (member.id) {
    res = yield call(restHub.put, url, {
      body: member,
    });
  } else {
    res = yield call(restHub.post, url, {
      body: member,
    });
  }

  if (res && !res.errorMsg) {
    yield put(MemberActions.toggleModalVisible());
    yield put(MemberActions.getMember());
  }
}

function* deleteMember(action) {
  const { payload } = action;
  const url = `${ApiUrls.member}/${payload}`;

  const { errorMsg } = yield call(restHub.remove, url);

  if (!errorMsg) {
    message.success('删除成功');
    yield put(MemberActions.getMember());
  }
}

function* watchMemberGet() {
  yield takeLatest(`${MemberActions.getMember}`, getMember);
}

function* watchMemberPost() {
  yield takeLatest(`${MemberActions.postMember}`, postMember);
}

function* watchMemberDelete() {
  yield takeLatest(`${MemberActions.deleteMember}`, deleteMember);
}

export default function* watchMember() {
  yield fork(watchMemberGet);
  yield fork(watchMemberPost);
  yield fork(watchMemberDelete);
}
