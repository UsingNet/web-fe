/* eslint-disable */
import { Message } from 'antd';
import { eventChannel } from 'redux-saga';
import { take, call, put, fork, cancel } from 'redux-saga/effects';
import { SOCKET } from 'constants/Network';
import { connect as connectSocket, disconnect as disconnectSocket } from 'actions/socket';
import { connect, disconnect } from 'services/websocket';
import { setStatus } from 'actions/agent';
import { receiveMessage } from 'actions/messages';

import { updatePrevOrders, updateChatMessages } from 'actions/order';

function subscribe(socket) {
  return eventChannel(emitter => {
    socket.on('message', msg => {
      if (msg && msg._id) {
        emitter(receiveMessage(msg));
      }

      if (msg.type === 'event') {
        if (msg.action === 'offline') {
          Message.error(`您以被管理员${msg.from}强制下线`);
          emitter(setStatus('offline'));
          emitter(disconnectSocket());
        }
      }
    });

    socket.on('disconnect', () => {
      emitter(updatePrevOrders([]));
    });

    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
}

export default function* initSocket() {
  while (true) {
    const { payload } = yield take(`${connectSocket}`);
    const host = `${SOCKET}${payload}`;
    const socket = yield call(connect, host);
    const task = yield fork(handleIO, socket);
    yield take(`${disconnectSocket}`);
    yield cancel(task);
    yield call(disconnect, socket);
  }
}
