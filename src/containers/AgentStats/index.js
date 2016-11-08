import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AgentStatsActions from 'actions/agentStats';
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
import AgentStats from './AgentStats';

const mapStateToProps = ({ agentStats }) => ({
  agentStats,
  orderHistogramOptions: getOrderHistogramOptions(agentStats.overview),
  messageHistogramOptions: getMessageHistogramOptions(agentStats.overview),
  firstResponseOptions: getFirstResponseTimeOptions(agentStats.overview),
  responsesOptions: getResponsesOptions(agentStats.overview),
  sessionsOptions: getSessionsOptions(agentStats.overview),
  sourcePieOptions: getSourcePieOptions(agentStats.overview),
  evaluatePieOptions: getEvaluatePieOptions(agentStats.overview),
  categoryPieOptions: getCategoryPieOptions(agentStats.overview),
  replyTextStats: getReplyTextStats(agentStats.overview),
  messageStats: getMessageStats(agentStats.overview),
  responseStats: getResponseStats(agentStats.overview),
  evaluateStats: getEvaluateStats(agentStats.overview),

  firstResponseTimeEmpty: checkFirstResponseTimeEmpty(agentStats.overview),
  responsesEmpty: checkResponsesEmpty(agentStats.overview),
  sessionsEmpty: checkSessionsEmpty(agentStats.overview),
  sourceEmpty: checkSourceEmpty(agentStats.overview),
  evaluateEmpty: checkEvaluateEmpty(agentStats.overview),
  categoryEmpty: checkCategoryEmpty(agentStats.overview),
});

const mapDispatchToProps = (dispatch) => ({
  agentStatsActions: bindActionCreators(AgentStatsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AgentStats);
