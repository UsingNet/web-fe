import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DateFilter from './DateFilter';
import * as DateFilterActions from 'actions/dateFilter';

function mapStateToProps({ dateFilter }) {
  return {
    highlight: dateFilter.highlight,
    activeBtn: dateFilter.activeBtn,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dateFilterActions: bindActionCreators(DateFilterActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DateFilter);
