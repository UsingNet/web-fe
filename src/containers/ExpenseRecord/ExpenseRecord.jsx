import React, { PropTypes } from 'react';
import resizableTableHoc from 'components/ResizableTableHoc';
import RecordTable from './components/RecordTable';

class ExpenseRecord extends React.Component {
  static propTypes = {
    expenseRecord: PropTypes.object.isRequired,
    expenseRecordActions: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { expenseRecordActions } = this.props;
    expenseRecordActions.getExpenseRecord();

    this.refs.resizeTable.onWindowResize();
  }

  onTableChange = (pagination) => {
    const { getExpenseRecord, setFetchQueryString } = this.props.expenseRecordActions;

    setFetchQueryString({ page: pagination.current });
    getExpenseRecord();
  }

  render() {
    const { setScrollHeight } = this.props.expenseRecordActions;

    const ResizeRecordTable = resizableTableHoc(RecordTable, setScrollHeight, 228, {
      expenseRecord: this.props.expenseRecord,
      onTableChange: this.onTableChange,
    });

    return (
      <div>
        <ResizeRecordTable ref="resizeTable" />
      </div>
    );
  }
}

export default ExpenseRecord;
