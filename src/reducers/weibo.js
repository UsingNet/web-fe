import { handleActions } from 'redux-actions';
import {
  getWeiboSuccess,
  setEditWeibo,
  updateWeiboFields,
  toggleGeneralEditVisible,
} from 'actions/weibo';

const weibo = handleActions({
  [`${getWeiboSuccess}`](state, action) {
    return {
      ...state,
      weibo: action.payload,
    };
  },

  [`${setEditWeibo}`](state, action) {
    return {
      ...state,
      editWeibo: action.payload,
    };
  },

  [`${updateWeiboFields}`](state, action) {
    const { fields } = action.payload;
    const propKey = Object.keys(fields)[0];

    return {
      ...state,
      editWeibo: {
        ...state.editWeibo,
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
}, {
  editWeibo: {},
  generalEditVisible: false,
  weibo: [],
});

export default weibo;
