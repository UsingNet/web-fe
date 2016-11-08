import React, { PropTypes } from 'react';
import { Table } from 'antd';
import OverviewStatistics from 'components/OverviewStatistics';
import AgentAttendance from './AgentAttendance';

const AgentStatsTable = (props) => {
  const { scrollHeight, expandedRowKeys, attendance, agentStats } = props.agentStats;
  const { onTableChange, agentStatsActions, overviewProps } = props;

  const columns = [{
    title: '客服',
    dataIndex: 'name',
    width: '15%',
  }, {
    title: '工单数',
    dataIndex: 'order_count',
    width: '20%',
    sorter: true,
  }, {
    title: '消息数',
    dataIndex: 'message_count',
    width: '20%',
    sorter: true,
  }, {
    title: '对话时长',
    dataIndex: 'time',
    width: '40%',
    sorter: true,
  }];

  const pagination = {
    total: agentStats.total,
    size: 'default',
    pageSize: agentStats.perPage,
    current: agentStats.current,
  };

  return (
    <Table
      rowKey={record => record.id}
      columns={columns}
      pagination={pagination}
      dataSource={agentStats.data}
      scroll={{ y: scrollHeight }}
      expandedRowKeys={expandedRowKeys}
      onChange={onTableChange}
      onExpand={(expanded, record) => {
        if (expanded) {
          agentStatsActions.setExpandedRowkeys([record.id]);
          agentStatsActions.setAgentId(record.id);
          agentStatsActions.getAgentHeadline();
          agentStatsActions.getAgentAttendance();
        } else {
          agentStatsActions.setExpandedRowkeys([]);
          agentStatsActions.setAgentId(0);
        }
      }}
      expandedRowRender={() => (
        <div>
          <OverviewStatistics {...overviewProps} />
          <AgentAttendance data={attendance} />
        </div>
      )}
    />
  );
};

AgentStatsTable.propTypes = {
  agentStats: PropTypes.object.isRequired,
  agentStatsActions: PropTypes.object.isRequired,
  overviewProps: PropTypes.object.isRequired,
  onTableChange: PropTypes.func.isRequired,
};

export default AgentStatsTable;
