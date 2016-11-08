import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as VisitorStatsActions from 'actions/visitorStats';
import * as TrackActions from 'actions/track';
import VisitorStats from './VisitorStats';

const mapStateToProps = ({ visitorStats, track }) => ({
  visitorStats,
  track,
});

const mapDispatchToProps = (dispatch) => ({
  visitorStatsActions: bindActionCreators(VisitorStatsActions, dispatch),
  trackActions: bindActionCreators(TrackActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VisitorStats);
