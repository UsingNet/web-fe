import { handleActions } from 'redux-actions';
import { getBaseSettingSuccess } from 'actions/baseSetting';

const baseSetting = handleActions({
  [`${getBaseSettingSuccess}`](state, action) {
    return action.payload;
  },
}, {
  name: '',
  price: {
    voip: 0,
  },
  plan: {
    slug: '',
  },
  balance: '0',
  functions: {
    chat: {
      voip: {
        status: false,
      },
      sms: {
        status: false,
      },
    },
  },
});

export default baseSetting;
