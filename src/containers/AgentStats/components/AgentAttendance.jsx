import React, { PropTypes } from 'react';
import { Table } from 'antd';

const AgentAttendance = (props) => {
  const columns = [{
    title: '日期',
    dataIndex: 'date',
    width: '25%',
  }, {
    title: '首次上线时间',
    dataIndex: 'first_online_time',
    width: '25%',
  }, {
    title: '最后离线时间',
    dataIndex: 'last_offline_time',
    width: '25%',
  }, {
    title: '在线时长',
    dataIndex: 'online_time',
    width: '25%',
  }];

  return (
    <div>
      <header style={{ fontSize: 18 }}>考勤信息</header>
      <Table
        columns={columns}
        dataSource={props.data}
        pagination={false}
        scroll={{ y: 300 }}
      />
    </div>
  );
};

AgentAttendance.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AgentAttendance;
