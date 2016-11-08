import React, { PropTypes } from 'react';
import { Table } from 'antd';

const RecordTable = (props) => {
  const { expenseRecord, onTableChange } = props;

  const columns = [{
    title: '消费类型',
    dataIndex: 'type_text',
    width: '33.3%',
  }, {
    title: '金额',
    dataIndex: 'money',
    render: (value) => {
      let color = '';
      let v = value;

      if (value[0] === '-') {
        color = 'red';
      } else {
        v = `+${value}`;
        color = 'green';
      }

      return (
        <span
          style={{
            color,
            fontWeight: 'bold',
            fontSize: 14,
          }}
        >
          {`${v} 元`}
        </span>
      );
    },
    width: '33.3%',
  }, {
    title: '时间',
    dataIndex: 'updated_at',
    width: '33.3%',
  }];

  const pagination = {
    total: expenseRecord.total,
    current: expenseRecord.currentPage,
    pageSize: expenseRecord.perPage,
    size: 'default',
    showTotal: (total) => `共${total}条`,
  };

  return (
    <Table
      size="middle"
      rowKey={record => record.id}
      columns={columns}
      dataSource={expenseRecord.data}
      pagination={pagination}
      scroll={{ y: expenseRecord.scrollHeight }}
      onChange={onTableChange}
    />
  );
};

RecordTable.propTypes = {
  expenseRecord: PropTypes.object.isRequired,
  onTableChange: PropTypes.func.isRequired,
};

export default RecordTable;
