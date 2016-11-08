import { handleActions } from 'redux-actions';
import { getOnlineClientsSuccess } from 'actions/client';

const clients = handleActions({
  [`${getOnlineClientsSuccess}`](state, action) {
    return {
      ...state,
      clients: action.payload,
    };
  },
}, {
  clients: [],
});

export default clients;
