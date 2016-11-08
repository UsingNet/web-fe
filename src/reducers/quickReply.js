import { handleActions } from 'redux-actions';
import * as QuickReplyActions from 'actions/quickReply';

const quickReply = handleActions({
  [`${QuickReplyActions.getCommonQuickReplySuccess}`](state, action) {
    return {
      ...state,
      commonReplies: action.payload,
    };
  },

  [`${QuickReplyActions.getPersonalQuickReplySuccess}`](state, action) {
    return {
      ...state,
      personalReplies: action.payload,
    };
  },

  [`${QuickReplyActions.setScrollHeight}`](state, action) {
    return {
      ...state,
      scrollHeight: action.payload,
    };
  },

  [`${QuickReplyActions.setActiveTab}`](state, action) {
    return {
      ...state,
      activeTab: action.payload,
    };
  },

  [`${QuickReplyActions.toggleModalVisible}`](state, action) {
    return {
      ...state,
      modalVisible: action.payload,
    };
  },

  [`${QuickReplyActions.setModalTitle}`](state, action) {
    return {
      ...state,
      modalTitle: action.payload,
    };
  },

  [`${QuickReplyActions.setEditReply}`](state, action) {
    return {
      ...state,
      editReply: action.payload,
    };
  },

  [`${QuickReplyActions.updateReplyFields}`](state, action) {
    const { fields } = action.payload;
    const itemKey = Object.keys(fields)[0];
    const value = fields[itemKey].value;

    return {
      ...state,
      editReply: {
        ...state.editReply,
        [itemKey]: value,
      },
    };
  },
}, {
  commonReplies: [],
  personalReplies: [],
  scrollHeight: 576,
  activeTab: 'COMMON',
  editReply: {},
  modalVisible: false,
  modalTitle: '',
});

export default quickReply;
