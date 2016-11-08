import { handleActions } from 'redux-actions';
import * as TrackActions from 'actions/track';

const track = handleActions({
  [`${TrackActions.initTrack}`](state, action) {
    return {
      ...state,
      [action.payload]: {
        total: 0,
        perPage: 20,
        currentPage: 1,
        data: [],
      },
    };
  },

  [`${TrackActions.getTrackSuccess}`](state, action) {
    const { id, data } = action.payload;
    return {
      ...state,
      [id]: data,
    };
  },

  [`${TrackActions.getOrderTrackSuccess}`](state, action) {
    return {
      ...state,
      track: action.payload,
    };
  },
}, {
  track: {
    total: 0,
    perPage: 20,
    currentPage: 1,
    data: [],
  },
});

export default track;
