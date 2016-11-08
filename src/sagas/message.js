import { takeLatest } from 'redux-saga';
import { call, put, fork, select } from 'redux-saga/effects';
import { message as messageNotify } from 'antd';
import moment from 'moment';
import restHub from 'services/restHub';
import ApiUrls from 'constants/ApiUrls';
import * as MessageActions from 'actions/messages';
import { getOrder, setOrderUnread, setNewOrderId, setOrderLastReply } from 'actions/order';
import { push } from 'react-router-redux';
import notify from 'modules/notify';
import store from 'store';

function* getMessage(args) {
  const { payload } = args;
  const orderId = parseInt(payload.order_id, 10);
  const url = `${ApiUrls.message.list}/${orderId}`;
  const { jsonResult, errorMsg } = yield call(restHub.get, url);
  if (!errorMsg) {
    let hasMoreMessage = false;
    if (jsonResult.data.length === 11) {
      jsonResult.data.splice(10, 1);
      hasMoreMessage = true;
    }
    yield put(MessageActions.getMessageListSuccess({ messages: jsonResult.data, hasMoreMessage }));

    const selectedOrderState = state => state.order.selectedOrder;
    const selectedOrder = yield select(selectedOrderState);

    if (selectedOrder.unread > 0) {
      yield put(MessageActions.readMessages(orderId));
    }
  }
}

function* watchMessageGet() {
  yield takeLatest(`${MessageActions.getMessageList}`, getMessage);
}

function* receiveMessage(action) {
  if (!Array.isArray(action.payload)) {
    const message = action.payload;
    const orderId = message.package.order_id;
    const ordersState = state => state.order.orders;
    const orders = yield select(ordersState);

    const isOrderExist = orders.find(o => o.id === orderId);

    if (!isOrderExist) {
      yield put(getOrder({ type: 'getNew' }));
      yield put(setNewOrderId(orderId));
    } else {
      // 需要修改成 valueOf
      const timestamp = moment(message.updated_at).unix();
      yield put(setOrderLastReply({ id: orderId, time: timestamp }));
    }

    if (location.pathname.indexOf(orderId) === -1) {
      yield put(setOrderUnread({ id: orderId, type: 'inc' }));

      notify.message(orderId, message.package.contact.name, () => {
        store.dispatch(push(`/chat/${message.package.order_id}`));
        store.dispatch(setOrderUnread({ id: orderId, type: 'reset' }));
        notify.clearMessage();
      });
    } else {
      yield put(MessageActions.pushMessage(message));
    }

    // const orderState = state => state.order.orders;
    // let orders = yield select(orderState);
    // const message = action.payload;
    //
    // // 发送通知
    // if (location.pathname.indexOf('/chat') === -1) {
    //   notify.message(message.package.contact.name, () => {
    //     store.dispatch(push(`/chat/${message.package.order_id}`));
    //   });
    // }
    //
    // let exists = null;
    // const orderId = parseInt(message.package.order_id, 10);
    // orders.forEach(o => {
    //   if (o.id === orderId) {
    //     exists = true;
    //   }
    // });
    //
    // if (!exists) {
    //   yield put(getOrder());
    // }
    //
    // // 发送未读
    // if (location.pathname.indexOf(message.package.order_id) === -1) {
    //   orders = yield select(orderState);
    //   orders = orders.map(_o => {
    //     const o = _o;
    //     o.unread = o.unread ? o.unread : 0;
    //     if (o.id === orderId) {
    //       o.unread++;
    //     }
    //     return o;
    //   });
    //
    //   yield put(unreadOrder(orders));
    // } else {
    //   const messageState = state => state.message.messages;
    //   const messages = yield select(messageState);
    //   yield put(MessageActions.pushMessage(messages));
    // }
  }
}

function* watchMessageReceive() {
  yield takeLatest(`${MessageActions.receiveMessage}`, receiveMessage);
}

function* sendMessage(action) {
  const { jsonResult, errorMsg } = yield call(restHub.post, ApiUrls.message.send, {
    body: action.payload,
  });

  // 需改成 valueOf
  const now = moment().unix();
  const orderId = action.payload.order_id;

  yield put(setOrderLastReply({ id: orderId, time: now }));

  if (!errorMsg) {
    yield put(MessageActions.pushMessage(jsonResult.data));
  }
}

function* watchMessageSend() {
  yield takeLatest(`${MessageActions.sendMessage}`, sendMessage);
}

function* sendNote(action) {
  const { errorMsg } = yield call(restHub.post, ApiUrls.message.agent, {
    body: action.payload,
  });

  if (!errorMsg) {
    if (action.payload.type === 'NOTE') {
      messageNotify.success('备注保存成功');
    } else if (action.payload.type === 'SMS') {
      messageNotify.success('短信发送成功');
    }
  }
}

function* watchNoteSend() {
  yield takeLatest(`${MessageActions.sendNoteOrSms}`, sendNote);
}

function* getMoreMessage(action) {
  const { payload } = action;
  const url = `${ApiUrls.message.list}/${payload.orderId}?last_message_id=${payload.lastMessageId}`;
  const { jsonResult, errorMsg } = yield call(restHub.get, url);

  if (!errorMsg) {
    let hasMoreMessage = false;
    if (jsonResult.data.length === 11) {
      hasMoreMessage = true;
      jsonResult.data.splice(0, 1);
    }
    const messageState = state => state.message.messages;
    const messages = yield select(messageState);
    const newMessages = jsonResult.data.concat(messages);
    yield put(MessageActions.getMoreMessageSuccess({ messages: newMessages, hasMoreMessage }));
  }
}

function* watchGetMessageMore() {
  yield takeLatest(`${MessageActions.getMoreMessage}`, getMoreMessage);
}

function* undoMessage(action) {
  const { payload } = action;

  const { errorMsg } = yield call(restHub.get, `${ApiUrls.message.undo}/${payload}`);

  if (!errorMsg) {
    messageNotify.success('已撤销');
    yield put(MessageActions.toggleMessageUndoStatus({ id: payload, undoStatus: true }));
  }
}

function* watchUndoMessage() {
  yield takeLatest(`${MessageActions.undoMessage}`, undoMessage);
}

function* readMessages(action) {
  const { payload } = action;

  const { errorMsg } = yield call(restHub.post, `${ApiUrls.message.read}`, {
    body: {
      order_id: payload,
    },
  });

  if (!errorMsg) {
    yield put(setOrderUnread({ id: payload, type: 'reset' }));
  }
}

function* watchMessagesRead() {
  yield takeLatest(`${MessageActions.readMessages}`, readMessages);
}

export default function* watchMessage() {
  yield fork(watchMessageGet);
  yield fork(watchMessageReceive);
  yield fork(watchMessageSend);
  yield fork(watchGetMessageMore);
  yield fork(watchNoteSend);
  yield fork(watchUndoMessage);
  yield fork(watchMessagesRead);
}
