import { handleActions } from 'redux-actions';
import { getTagsSuccess } from 'actions/tag';

const tags = handleActions({
  [`${getTagsSuccess}`](state, action) {
    return action.payload;
  },
}, []);

export default tags;
