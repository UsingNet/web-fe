import React, { PropTypes } from 'react';
import resizableTableHoc from 'components/ResizableTableHoc';
import ReloadTable from 'components/ReloadTable';
import MemberFilter from 'components/MemberFilter';
import DateFilter from 'containers/DateFilter';
import EvalueationsStatsTable from './components/EvaluationsStatsTable';
import EvaluationContentModal from './components/EvaluationContentModal';
import mainStyles from '../main.less';

class EvaluationsStats extends React.Component {
  static propTypes = {
    evaluationStats: PropTypes.object.isRequired,
    members: PropTypes.array.isRequired,
    getMember: PropTypes.func.isRequired,
    evaluationActions: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { evaluationActions, getMember } = this.props;
    evaluationActions.getEvaluationStats();
    getMember();

    this.refs.resizeTable.onWindowResize();
  }

  onDateSelected = (dateRange) => {
    const { evaluationActions } = this.props;

    evaluationActions.setFetchQueryString({
      begin: dateRange.begin,
      end: dateRange.end,
    });

    evaluationActions.getEvaluationStats();
  }

  onTableChange = (pagination, filters) => {
    const { evaluationActions } = this.props;

    evaluationActions.setFetchQueryString({
      page: pagination.current,
    });

    if (filters.level_text) {
      evaluationActions.setFetchQueryString({
        level: filters.level_text,
      });
    } else {
      evaluationActions.deleteFetchQueryString('level');
    }

    if (filters.content) {
      evaluationActions.setFetchQueryString({
        filter: ['content'],
      });
    } else {
      evaluationActions.deleteFetchQueryString('filter');
    }

    evaluationActions.getEvaluationStats();
  }

  onMemberChange = (value) => {
    const { evaluationActions } = this.props;
    const v = Number(value);

    if (v !== 0) {
      evaluationActions.setFetchQueryString({ user_id: v });
    } else if (v === 0) {
      evaluationActions.deleteFetchQueryString('user_id');
    }

    evaluationActions.getEvaluationStats();
  }

  onTableRowClick = (record) => {
    if (record.content) {
      const { evaluationActions } = this.props;
      evaluationActions.setEvaluationContent(record.content);
      evaluationActions.toggleModalVisible();
    }
  }

  render() {
    const {
      modalVisible,
      evaluationContent,
    } = this.props.evaluationStats;
    const { evaluationActions, members } = this.props;
    const { setScrollHeight } = evaluationActions;

    const ResizeStatsTable = resizableTableHoc(EvalueationsStatsTable, setScrollHeight, 278, {
      evaluationStats: this.props.evaluationStats,
      onTableRowClick: this.onTableRowClick,
      onTableChange: this.onTableChange,
    });

    return (
      <div>
        <div className={mainStyles['table-operation-region']}>
          <MemberFilter
            members={members}
            onMemberChange={this.onMemberChange}
          />

          <DateFilter
            onDateSelected={this.onDateSelected}
          />
          <ReloadTable reload={evaluationActions.getEvaluationStats} />
        </div>

        <ResizeStatsTable ref="resizeTable" />

        <EvaluationContentModal
          modalVisible={modalVisible}
          toggleModalVisible={evaluationActions.toggleModalVisible}
          content={evaluationContent}
        />
      </div>
    );
  }
}

export default EvaluationsStats;
