import React, { PropTypes } from 'react';
import { Card, Table, Button, Icon } from 'antd';

const AgentTable = (props) => {
  const { agents, me, agentOffline } = props;
  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    width: '50%',
  }, {
    title: '工单数',
    dataIndex: 'order_count',
    width: '30%',
  }, {
    title: '操作',
    render: (value, record) => {
      if (record.id === me.id || me.role === 'MEMBER') {
        return <div style={{ textAgent: 'center' }}>--</div>;
      }
      if (record.status == 'offlineing') {
        return <Button><Icon type="loading" />离线中</Button>;
      } else {
        return <Button onClick={() => agentOffline(record)}>强制下线</Button>;
      }
    },
  }];

  return (
    <Card title="在线客服" style={{ marginTop: 20 }}>
      <Table
        pagination={false}
        bordered={false}
        columns={columns}
        dataSource={agents}
        size="middle"
      />
    </Card>
  );
};

AgentTable.propTypes = {
  agents: PropTypes.array.isRequired,
  me: PropTypes.object.isRequired,
  agentOffline: PropTypes.func.isRequired,
};

export default AgentTable;
