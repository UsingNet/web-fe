import React, { PropTypes } from 'react';
import OverviewStatistics from 'components/OverviewStatistics';
import DateFilter from 'containers/DateFilter';
import styles from './overview-stats.less';
import mainStyles from '../main.less';

class OverviewStats extends React.Component {
  static propTypes = {
    overview: PropTypes.object.isRequired,
    orderHistogramOptions: PropTypes.object.isRequired,
    messageHistogramOptions: PropTypes.object.isRequired,
    overviewStatsActions: PropTypes.object.isRequired,
    firstResponseOptions: PropTypes.object.isRequired,
    responsesOptions: PropTypes.object.isRequired,
    sessionsOptions: PropTypes.object.isRequired,
    sourcePieOptions: PropTypes.object.isRequired,
    evaluatePieOptions: PropTypes.object.isRequired,
    categoryPieOptions: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.overviewStatsActions.getHeadlineStats();
  }

  onDateSelected = (dateRange) => {
    const { overviewStatsActions } = this.props;

    overviewStatsActions.setFetchQueryString({
      begin: dateRange.begin,
      end: dateRange.end,
    });

    overviewStatsActions.getHeadlineStats();
  }

  render() {
    return (
      <div className={styles['overview-stats']}>
        <div className={mainStyles['table-operation-region']}>
          <DateFilter
            onDateSelected={this.onDateSelected}
          />
        </div>

        <OverviewStatistics {...this.props} />
      </div>
    );
  }
}

export default OverviewStats;
