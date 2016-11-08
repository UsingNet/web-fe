import React, { PropTypes } from 'react';
import { Table } from 'antd';

const EvaluationsStatsTable = (props) => {
  const { evaluationStats, scrollHeight } = props.evaluationStats;
  const { onTableRowClick, onTableChange } = props;

  const columns = [{
    title: '客服',
    dataIndex: 'user.name',
    width: '20%',
  }, {
    title: '客户',
    dataIndex: 'contact.name',
    width: '20%',
  }, {
    title: '评价',
    dataIndex: 'level_text',
    width: '20%',
    filters: [{
      text: '好评',
      value: 'GOOD',
    }, {
      text: '中评',
      value: 'GENERAL',
    }, {
      text: '差评',
      value: 'BAD',
    }],
  }, {
    title: '评价内容',
    dataIndex: 'content',
    width: '20%',
    render: (value) => (<p>{value}</p>),
    filters: [{
      text: '有评价内容',
      value: 'content',
    }],
  }, {
    title: '时间',
    dataIndex: 'created_at',
    width: '20%',
  }];

  const pagination = {
    total: evaluationStats.total,
    pageSize: evaluationStats.perPage,
    showTotal: (total) => (`共${total}条`),
    current: evaluationStats.currentPage,
  };

  return (
    <Table
      columns={columns}
      pagination={pagination}
      dataSource={evaluationStats.data}
      scroll={{ y: scrollHeight }}
      onRowClick={onTableRowClick}
      onChange={onTableChange}
    />
  );
};

EvaluationsStatsTable.propTypes = {
  evaluationStats: PropTypes.object.isRequired,
  onTableRowClick: PropTypes.func.isRequired,
  onTableChange: PropTypes.func.isRequired,
};

export default EvaluationsStatsTable;
