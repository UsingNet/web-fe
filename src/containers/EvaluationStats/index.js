import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as EvaluationStatsActions from 'actions/evaluationStats';
import { getMember } from 'actions/member';
import EvaluationStats from './EvaluationsStats';

const mapStateToProps = ({ evaluationStats, member }) => ({
  evaluationStats,
  members: member.members,
});

const mapDispatchToProps = (dispatch) => ({
  evaluationActions: bindActionCreators(EvaluationStatsActions, dispatch),
  getMember: bindActionCreators(getMember, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationStats);
