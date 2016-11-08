import { handleActions } from 'redux-actions';
import { getPluginSuccess, updatePluginFields } from 'actions/plugin';

const plugin = handleActions({
  [`${getPluginSuccess}`](state, action) {
    return action.payload;
  },

  [`${updatePluginFields}`](state, action) {
    const { fields } = action.payload;
    const propKey = Object.keys(fields)[0];

    return {
      ...state,
      [propKey]: fields[propKey].value,
    };
  },
}, {});

export default plugin;
