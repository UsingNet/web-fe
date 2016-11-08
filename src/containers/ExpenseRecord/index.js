import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ExpenseRecordActions from 'actions/expenseRecord';
import ExpenseRecord from './ExpenseRecord';

function mapStateToProps({ expenseRecord }) {
  return {
    expenseRecord,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    expenseRecordActions: bindActionCreators(ExpenseRecordActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseRecord);
