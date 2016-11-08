import React, { PropTypes } from 'react';
import { Table } from 'antd';
import styles from '../history.less';

const HistoryTable = (props) => {
  const { orders, scrollHeight } = props;
  const columns = [{
    title: '客户',
    dataIndex: 'contact.name',
    width: '20%',
    render: (text, record) => (
      record.contact
      ? (<span>
        <img
          alt={record.contact.name}
          className={styles['contact-avatar']}
          src={`${record.contact.img}-avatar`}
        />
        {record.contact.name}
      </span>)
      : ''
    ),
  }, {
    title: '客服',
    width: '15%',
    dataIndex: 'user.name',
    render: (text, record) => (
      record.user ? <span>{record.user.name}</span> : ''
    ),
  }, {
    title: '会话开始时间',
    dataIndex: 'created_at',
    width: '20%',
    render: (text, record) => (
      <span>{record.created_at}</span>
    ),
  }, {
    title: '用户IP地址',
    dataIndex: 'contact.ip',
    width: '20%',
    render: (text, record) => (
      record.contact ? <span>{record.contact.ip}</span> : ''
    ),
  }, {
    title: '状态',
    dataIndex: 'status',
    width: '5%',
    render: (text, record) => {
      switch (record.status) {
        case 'OPEN':
          return (<span>进行中</span>);
        case 'SLEEP':
          return (<span>已休眠</span>);
        case 'CLOSED':
          return (<span>已关闭</span>);
        default:
          return (<span></span>);
      }
    },
    filters: [{
      text: '进行中',
      value: 'open',
    }, {
      text: '已休眠',
      value: 'sleep',
    }, {
      text: '已关闭',
      value: 'closed',
    }],
    filterMultiple: false,
  }];

  const pagination = {
    total: orders.total,
    current: orders.currentPage,
    pageSize: orders.perPage,
    size: 'default',
    showTotal: (total) => (`共${total}条`),
  };

  return (
    <div>
      <Table
        onRowClick={props.onRowClick}
        rowKey={record => record.id}
        size="middle"
        columns={columns}
        dataSource={orders.data}
        pagination={pagination}
        scroll={{ y: scrollHeight }}
        onChange={props.onTableChange}
      />
    </div>
  );
};

HistoryTable.propTypes = {
  orders: PropTypes.object.isRequired,
  scrollHeight: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
};

export default HistoryTable;
