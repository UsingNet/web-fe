import { handleActions } from 'redux-actions';
import * as ChatActions from 'actions/chat';

const chat = handleActions({
  [`${ChatActions.togglePicPreview}`](state, action) {
    return {
      ...state,
      previewVisible: action.payload,
    };
  },

  [`${ChatActions.setPicUrl}`](state, action) {
    return {
      ...state,
      previewUrl: action.payload,
    };
  },

  [`${ChatActions.toggleFastReplyVisible}`](state, action) {
    return {
      ...state,
      fastReplyVisible: action.payload,
    };
  },

  [`${ChatActions.setFastReplyTab}`](state, action) {
    return {
      ...state,
      activeReplyTab: action.payload,
    };
  },

  [`${ChatActions.togglePasteImageVisible}`](state, action) {
    return {
      ...state,
      pasteImageVisible: action.payload,
    };
  },

  [`${ChatActions.setMatchedReplies}`](state, action) {
    return {
      ...state,
      matchedReplies: action.payload,
    };
  },

  [`${ChatActions.setActiveReply}`](state, action) {
    if (action.payload === -1) {
      return {
        ...state,
        activeQuickReply: {
          index: -1,
          content: '',
        },
      };
    }

    const min = 0;
    const max = state.matchedReplies.length - 1;

    const uppper = Math.min(max, action.payload);
    const result = Math.max(uppper, min);
    let content = '';

    if (state.matchedReplies[result]) {
      content = state.matchedReplies[result].content;
    }

    return {
      ...state,
      activeQuickReply: {
        index: result,
        content,
      },
    };
  },

  [`${ChatActions.setSmsTemplateContent}`](state, action) {
    return {
      ...state,
      smsTemplateContent: action.payload,
    };
  },

  [`${ChatActions.setSmsTemplateHtml}`](state, action) {
    return {
      ...state,
      smsTemplateHtml: action.payload,
    };
  },

  [`${ChatActions.toggleAppsVisible}`](state, action) {
    return {
      ...state,
      appsVisible: action.payload,
    };
  },
}, {
  previewVisible: false,
  previewUrl: '',
  fastReplyVisible: false,
  activeReplyTab: 'personal',
  pasteImageVisible: false,
  appsVisible: false,
  matchedReplies: [],
  activeQuickReply: {
    index: -1,
    content: '',
  },
  smsTemplateContent: '',
  smsTemplateHtml: '',
});

export default chat;
