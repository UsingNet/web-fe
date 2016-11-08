import React, { PropTypes } from 'react';
import { Table } from 'antd';
import SourceDevices from 'components/SourceDevices';
import TrackTable from './TrackTable';

const VisitorStatsTable = (props) => {
  const { track, trackActions, onTableChange } = props;
  const { visitorStats, scrollHeight } = props.visitorStats;

  const columns = [{
    title: '访客',
    dataIndex: 'contact',
    width: '15%',
    render: (value, record) => (
      value && value.name ? value.name : `来自${record.location}的访客`
    ),
  }, {
    title: '来源',
    dataIndex: 'source',
    width: '25%',
    render: (value) => {
      if (value) {
        return (
          <span>
            <a target="_blank" title={value.name} href={value.href}>{value.name}</a>
            <span
              style={{ display: value.keyword ? 'inline' : 'none' }}
            >
              {`关键词：${value.keyword}`}
            </span>
          </span>
        );
      }

      return '';
    },
  }, {
    title: '设备',
    dataIndex: 'user_agent',
    width: '15%',
    render: (value, record) => {
      // eslint-disable-next-line max-len
      const userAgent = (record.contact && record.contact.package && record.contact.package.user_agent) || record.user_agent;
      if (userAgent) {
        return (
          <SourceDevices userAgent={userAgent} />
        );
      }

      return '';
    },
  }, {
    title: '停留时间',
    dataIndex: 'second',
    width: '15%',
  }, {
    title: '访问页数',
    dataIndex: 'times',
    width: '10%',
  }, {
    title: '时间',
    dataIndex: 'created_at',
    width: '15%',
  }];

  const pagination = {
    total: visitorStats.total,
    pageSize: visitorStats.perPage,
    current: visitorStats.currentPage,
    showTotal: (total) => (`共${total}条`),
  };

  return (
    <Table
      /* eslint-disable no-underscore-dangle */
      className="visitor-statistics"
      rowKey={record => record._id}
      columns={columns}
      pagination={pagination}
      dataSource={visitorStats.data}
      scroll={{ y: scrollHeight }}
      onChange={onTableChange}
      onExpand={(expanded, record) => {
        if (expanded) {
          if (record._id) {
            trackActions.initTrack(record._id);
            trackActions.getTrack({
              visitorId: record._id,
              params: {
                _id: record.track_id,
                date: record.date,
              },
            });
          }
        }
      }}
      expandedRowRender={(record) => (
        record._id ?
          (<TrackTable id={record._id} track={track} trackActions={trackActions} />)
          : ''
      )}
      /* eslint-enable no-underscore-dangle */
    />
  );
};

VisitorStatsTable.propTypes = {
  visitorStats: PropTypes.object.isRequired,
  track: PropTypes.object.isRequired,
  trackActions: PropTypes.object.isRequired,
  onTableChange: PropTypes.func.isRequired,
};

export default VisitorStatsTable;
