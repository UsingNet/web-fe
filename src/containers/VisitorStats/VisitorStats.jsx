import React, { PropTypes } from 'react';
import resizableTableHoc from 'components/ResizableTableHoc';
import ReloadTable from 'components/ReloadTable';
import DateFilter from 'containers/DateFilter';
import VisitorStatsTable from './components/VisitorStatsTable';
import mainStyles from '../main.less';

class VisitorStats extends React.Component {
  static propTypes = {
    visitorStats: PropTypes.object.isRequired,
    visitorStatsActions: PropTypes.object.isRequired,
    trackActions: PropTypes.object.isRequired,
    track: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { visitorStatsActions } = this.props;

    visitorStatsActions.getVisitStats();
    const trackHeader = document.querySelector('.visitor-statistics .ant-table-expand-icon-th');
    trackHeader.innerText = '访问轨迹';

    this.refs.resizeTable.onWindowResize();
  }

  componentDidUpdate() {
    const trackHeader = document.querySelector('.visitor-statistics .ant-table-expand-icon-th');
    trackHeader.innerText = '访问轨迹';
  }

  onDateSelected = (dateRange) => {
    const { visitorStatsActions } = this.props;

    visitorStatsActions.setFetchQueryString({
      begin: dateRange.begin,
      end: dateRange.end,
    });

    visitorStatsActions.getVisitStats();
  }

  onTableChange = (pagination) => {
    const { visitorStatsActions } = this.props;
    visitorStatsActions.setFetchQueryString({ page: pagination.current });
    visitorStatsActions.getVisitStats();
  }

  render() {
    const { visitorStatsActions, trackActions, track } = this.props;
    const { setScrollHeight } = visitorStatsActions;

    const ResizeStatsTable = resizableTableHoc(VisitorStatsTable, setScrollHeight, 278, {
      visitorStats: this.props.visitorStats,
      onTableChange: this.onTableChange,
      track,
      trackActions,
    });

    return (
      <div className="visitor-statistics">
        <div className={mainStyles['table-operation-region']}>
          <DateFilter
            onDateSelected={this.onDateSelected}
          />
          <ReloadTable reload={visitorStatsActions.getVisitStats} />
        </div>

        <ResizeStatsTable ref="resizeTable" />
      </div>
    );
  }
}

export default VisitorStats;
