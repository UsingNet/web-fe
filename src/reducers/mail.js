import { handleActions } from 'redux-actions';
import { getMailSuccess, updateMailFields } from 'actions/mail';

const mail = handleActions({
  [`${getMailSuccess}`](state, action) {
    return {
      ...state,
      ...action.payload,
    };
  },

  [`${updateMailFields}`](state, action) {
    const { fields } = action.payload;
    const propKey = Object.keys(fields)[0];

    return {
      ...state,
      [propKey]: fields[propKey].value,
    };
  },
}, {});

export default mail;
