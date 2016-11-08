import { takeLatest } from 'redux-saga';
import { put, call, fork, select } from 'redux-saga/effects';
import restHub from 'services/restHub';
import ApiUrls from 'constants/ApiUrls';
import * as QuickReplyActions from 'actions/quickReply';

function* getCommonReply() {
  const url = `${ApiUrls.setting.quickReply}?type=COMMON`;
  const { jsonResult, errorMsg } = yield call(restHub.get, url);

  if (!errorMsg) {
    yield put(QuickReplyActions.getCommonQuickReplySuccess(jsonResult.data));
  }
}

function* getPersonalReply() {
  const url = `${ApiUrls.setting.quickReply}?type=PERSONAL`;
  const { jsonResult, errorMsg } = yield call(restHub.get, url);

  if (!errorMsg) {
    yield put(QuickReplyActions.getPersonalQuickReplySuccess(jsonResult.data));
  }
}

function* removeQuickReply(action) {
  const { payload } = action;
  const url = `${ApiUrls.setting.quickReply}/${payload.id}`;

  const { errorMsg } = yield call(restHub.remove, url);

  if (!errorMsg) {
    if (payload.type === 'COMMON') {
      yield put(QuickReplyActions.getCommonQuickReply());
    } else if (payload.type === 'PERSONAL') {
      yield put(QuickReplyActions.getPersonalQuickReply());
    }
  }
}

function* submitQuickReply() {
  const replyState = state => state.quickReply.editReply;
  const activeTabState = state => state.quickReply.activeTab;
  const reply = yield select(replyState);
  const activeTab = yield select(activeTabState);
  let error = '';

  if (reply.id) {
    const url = `${ApiUrls.setting.quickReply}/${reply.id}`;
    const { errorMsg } = yield call(restHub.put, url, {
      body: {
        shortcut: reply.shortcut,
        content: reply.content,
      },
    });
    error = errorMsg;
  } else {
    const { errorMsg } = yield call(restHub.post, ApiUrls.setting.quickReply, {
      body: {
        shortcut: reply.shortcut,
        content: reply.content,
        type: activeTab,
      },
    });

    error = errorMsg;
  }

  if (!error) {
    if (activeTab === 'COMMON') {
      yield put(QuickReplyActions.getCommonQuickReply());
    } else if (activeTab === 'PERSONAL') {
      yield put(QuickReplyActions.getPersonalQuickReply());
    }

    yield put(QuickReplyActions.toggleModalVisible(false));
  }
}

function* watchCommonReplyGet() {
  yield takeLatest(`${QuickReplyActions.getCommonQuickReply}`, getCommonReply);
}

function* watchPersonalReplyGet() {
  yield takeLatest(`${QuickReplyActions.getPersonalQuickReply}`, getPersonalReply);
}

function* watchQuickReplyRemove() {
  yield takeLatest(`${QuickReplyActions.removeQuickReply}`, removeQuickReply);
}

function* watchQuickReplySubmit() {
  yield takeLatest(`${QuickReplyActions.submitQuickReply}`, submitQuickReply);
}

export default function* watchQuickReply() {
  yield fork(watchCommonReplyGet);
  yield fork(watchPersonalReplyGet);
  yield fork(watchQuickReplyRemove);
  yield fork(watchQuickReplySubmit);
}
