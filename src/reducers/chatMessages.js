/* eslint-disable */
import { handleActions } from 'redux-actions';
import { renewMessages } from 'actions/chatMessages';

const chatMessages = handleActions({
  [`${renewMessages}`](state, action) {
    const msg = action.payload;
    let hasUnread = false;
    let unreadCount = 0;
    const orderId = msg.package.order_id;
    const msgId = msg._id;
    let newMessages = [];
    if ((orderId in state)) {
      const oldMessages = state[orderId].messages.filter(m => m._id !== msgId);
      const unread = state[orderId].uread;

      if (oldMessages) {
        newMessages = oldMessages.concat([msg]);
      }

      // if (!msg.package.read) {
      //   if (unread && typeof unread === 'number') {
      //     unreadCount = unread + 1;
      //   } else {
      //     unreadCount++;
      //   }
      // }
    } else {
      newMessages.push(msg);
      // unreadCount++;
    }

    const renewedMessages = {
      ...state,
      // eslint-disable-next-line no-underscore-dangle
      [orderId]: {
        messages: newMessages,
        unread: unreadCount,
      },
    };

    return renewedMessages;
    // const filteredMessages = state.messages.filter(m => m._id !== action.payload._id);
    // return {
    //   ...state,
    //   messages: filteredMessages.concat([action.payload]),
    // };
  },
}, {});

export default chatMessages;
