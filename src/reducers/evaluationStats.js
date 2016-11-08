import { handleActions } from 'redux-actions';
import * as EvaluationStatsActions from 'actions/evaluationStats';

const evaluation = handleActions({
  [`${EvaluationStatsActions.getEvaluationStatsSuccess}`](state, action) {
    return {
      ...state,
      evaluationStats: action.payload,
    };
  },

  [`${EvaluationStatsActions.setScrollHeight}`](state, action) {
    return {
      ...state,
      scrollHeight: action.payload,
    };
  },

  [`${EvaluationStatsActions.setFetchQueryString}`](state, action) {
    return {
      ...state,
      querystring: {
        ...state.querystring,
        ...action.payload,
      },
    };
  },

  [`${EvaluationStatsActions.deleteFetchQueryString}`](state, action) {
    const copyQueryString = Object.assign({}, state.querystring);
    delete copyQueryString[action.payload];

    return {
      ...state,
      querystring: copyQueryString,
    };
  },

  [`${EvaluationStatsActions.toggleModalVisible}`](state) {
    return {
      ...state,
      modalVisible: !state.modalVisible,
    };
  },

  [`${EvaluationStatsActions.setEvaluationContent}`](state, action) {
    return {
      ...state,
      evaluationContent: action.payload,
    };
  },
}, {
  evaluationStats: {
    total: 0,
    perPage: 20,
    currentPage: 1,
    data: [],
  },
  querystring: {},
  scrollHeight: 576,
  modalVisible: false,
  evaluationContent: '',
});

export default evaluation;
