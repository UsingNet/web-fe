import { handleActions } from 'redux-actions';
import * as MessageActions from 'actions/messages';

const messages = handleActions({
  [`${MessageActions.getMessageListSuccess}`](state, action) {
    return {
      ...state,
      messages: action.payload.messages,
      hasMoreMessage: action.payload.hasMoreMessage,
    };
  },
  [`${MessageActions.sendMessageSuccess}`](state, action) {
    return {
      ...state,
      messages: action.payload,
      action: 'row',
    };
  },
  [`${MessageActions.getMoreMessageSuccess}`](state, action) {
    return {
      ...state,
      messages: action.payload.messages,
      hasMoreMessage: action.payload.hasMoreMessage,
      action: 'more',
    };
  },

  [`${MessageActions.toggleMessageUndoStatus}`](state, action) {
    const { id, undoStatus } = action.payload;

    /* eslint-disable no-underscore-dangle */
    const msg = state.messages.find(m => m._id === id);
    const message = deepCopy({}, msg);

    message.package.undo = undoStatus;

    return {
      ...state,
      messages: state.messages.map(ms => {
        if (ms._id === id) {
          return message;
        }

        return ms;
      }),
    };
    /* eslint-enable no-underscore-dangle */
  },

  [`${MessageActions.pushMessage}`](state, action) {
    state.messages.push(action.payload);
    return {
      ...state,
      messages: [...state.messages],
    };
  },
  [`${MessageActions.showMail}`](state, action) {
    return {
      ...state,
      mail: action.payload,
      mailVisible: true,
    };
  },
  [`${MessageActions.hideMail}`](state) {
    return {
      ...state,
      mailVisible: false,
    };
  },
}, {
  mail: {
    title: '',
    body: '',
  },
  mailVisible: false,
  messages: [],
  hasMoreMessage: false,
  action: 'row',
});

export default messages;
