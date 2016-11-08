import React, { PropTypes } from 'react';
import resizableTableHoc from 'components/ResizableTableHoc';
import ReloadTable from 'components/ReloadTable';
import DateFilter from 'containers/DateFilter';
import AgentStatsTable from './components/AgentStatsTable';
import mainStyles from '../main.less';

const sortMap = {
  ascend: 'ASC',
  descend: 'DESC',
};

class AgentStats extends React.Component {
  static propTypes = {
    agentStats: PropTypes.object.isRequired,
    agentStatsActions: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { agentStatsActions } = this.props;
    agentStatsActions.getAgentStats();

    this.refs.resizeTable.onWindowResize();
  }

  onTableChange = (pagination, filters, sorter) => {
    const {
      getAgentStats,
      setFetchQueryString,
      deleteFetchQueryString,
    } = this.props.agentStatsActions;

    setFetchQueryString({ page: pagination.current });

    if (filters.status && filters.status.length > 0) {
      setFetchQueryString({ status: filters.status[0] });
    } else {
      deleteFetchQueryString('status');
    }

    if (sorter.hasOwnProperty('field')) {
      const sortParams = JSON.stringify([{
        property: sorter.field,
        direction: sortMap[sorter.order],
      }]);

      setFetchQueryString({ sort: sortParams });
    } else {
      deleteFetchQueryString('sort');
    }

    getAgentStats();
  }

  onDateSelected = (dateRange) => {
    const { agentStatsActions } = this.props;

    agentStatsActions.setFetchQueryString({
      begin: dateRange.begin,
      end: dateRange.end,
    });

    agentStatsActions.getAgentStats();

    if (this.props.agentStats.agentId !== 0) {
      agentStatsActions.getAgentHeadline();
      agentStatsActions.getAgentAttendance();
    }
  }

  render() {
    const { agentStatsActions } = this.props;
    const { setScrollHeight } = agentStatsActions;

    const ResizeAgentStatsTable = resizableTableHoc(AgentStatsTable, setScrollHeight, 278, {
      onTableChange: this.onTableChange,
      agentStats: this.props.agentStats,
      agentStatsActions,
      overviewProps: this.props,
    });

    return (
      <div>
        <div className={mainStyles['table-operation-region']}>
          <DateFilter
            onDateSelected={this.onDateSelected}
          />
          <ReloadTable reload={agentStatsActions.getAgentStats} />
        </div>

        <ResizeAgentStatsTable ref="resizeTable" />
      </div>
    );
  }
}

export default AgentStats;
