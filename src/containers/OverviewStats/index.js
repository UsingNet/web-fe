import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getOrderHistogramOptions,
  getMessageHistogramOptions,
  getFirstResponseTimeOptions,
  getResponsesOptions,
  getSessionsOptions,
  getSourcePieOptions,
  getEvaluatePieOptions,
  getCategoryPieOptions,
  getReplyTextStats,
  getMessageStats,
  getResponseStats,
  getEvaluateStats,
  checkFirstResponseTimeEmpty,
  checkResponsesEmpty,
  checkSessionsEmpty,
  checkSourceEmpty,
  checkEvaluateEmpty,
  checkCategoryEmpty,
} from 'selectors/statisticsSelectors';
import * as OverviewStatsActions from 'actions/overviewStats';
import OverviewStats from './OverviewStats';

const mapStateToProps = ({ overviewStats }) => ({
  overview: overviewStats.overview,
  orderHistogramOptions: getOrderHistogramOptions(overviewStats.overview),
  messageHistogramOptions: getMessageHistogramOptions(overviewStats.overview),
  firstResponseOptions: getFirstResponseTimeOptions(overviewStats.overview),
  responsesOptions: getResponsesOptions(overviewStats.overview),
  sessionsOptions: getSessionsOptions(overviewStats.overview),
  sourcePieOptions: getSourcePieOptions(overviewStats.overview),
  evaluatePieOptions: getEvaluatePieOptions(overviewStats.overview),
  categoryPieOptions: getCategoryPieOptions(overviewStats.overview),
  replyTextStats: getReplyTextStats(overviewStats.overview),
  messageStats: getMessageStats(overviewStats.overview),
  responseStats: getResponseStats(overviewStats.overview),
  evaluateStats: getEvaluateStats(overviewStats.overview),

  firstResponseTimeEmpty: checkFirstResponseTimeEmpty(overviewStats.overview),
  responsesEmpty: checkResponsesEmpty(overviewStats.overview),
  sessionsEmpty: checkSessionsEmpty(overviewStats.overview),
  sourceEmpty: checkSourceEmpty(overviewStats.overview),
  evaluateEmpty: checkEvaluateEmpty(overviewStats.overview),
  categoryEmpty: checkCategoryEmpty(overviewStats.overview),
});

const mapDispatchToProps = (dispatch) => ({
  overviewStatsActions: bindActionCreators(OverviewStatsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OverviewStats);
