import { handleActions } from 'redux-actions';
import {
  getWechatSuccess,
  setEditWechat,
  updateWechatFields,
  toggleGeneralEditVisible,
  toggleAdvanceEditVisible,
} from 'actions/wechat';

const wechat = handleActions({
  [`${getWechatSuccess}`](state, action) {
    return {
      ...state,
      wechat: action.payload,
    };
  },

  [`${setEditWechat}`](state, action) {
    return {
      ...state,
      editWechat: action.payload,
    };
  },

  [`${updateWechatFields}`](state, action) {
    const { fields } = action.payload;
    const propKey = Object.keys(fields)[0];

    return {
      ...state,
      editWechat: {
        ...state.editWechat,
        [propKey]: fields[propKey].value,
      },
    };
  },

  [`${toggleGeneralEditVisible}`](state) {
    return {
      ...state,
      generalEditVisible: !state.generalEditVisible,
    };
  },

  [`${toggleAdvanceEditVisible}`](state) {
    return {
      ...state,
      advanceEditVisible: !state.advanceEditVisible,
    };
  },
}, {
  editWechat: {},
  generalEditVisible: false,
  advanceEditVisible: false,
  wechat: [],
});

export default wechat;
