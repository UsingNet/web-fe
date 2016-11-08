import React, { PropTypes } from 'react';
import { Card, Table, Button, message } from 'antd';
import cookie from 'js-cookie';
import SourceDevices from 'components/SourceDevices';

const ClientTable = ({ clients, launchChat }) => {
  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    width: '20%',
  }, {
    title: '访问页面',
    dataIndex: 'package.referrer',
    width: '30%',
    render: value => <a target="_blank" href={value}>{value}</a>,
  }, {
    title: '设备',
    dataIndex: 'package.user_agent',
    width: '10%',
    render: (value) => {
      if (value) {
        return (<SourceDevices userAgent={value} />);
      }
      return '';
    },
  }, {
    title: '状态',
    dataIndex: 'status',
    width: '10%',
    render: (value, record) => {
      if (record.status === 'CHATTING') {
        return <span style={{ color: '#D2D2D2' }}>对话中</span>;
      }
      return <span style={{ color: 'green' }}>访问中</span>;
    },
  }, {
    title: '操作',
    width: '15%',
    render: (value, record) => {
      if (record.status === 'CHATTING') {
        return <span>对话中</span>;
      }

      return (
        <Button
          onClick={() => {
            if (cookie.get('agent_status') === 'online') {
              if (record.track_id) {
                launchChat({
                  type: 'IM',
                  track_id: record.track_id,
                });
              } else {
                message.error('无法获取该访客的联系人ID，我们正在解决这一问题。');
              }
            } else {
              message.info('离线状态下不能发起对话。');
            }
          }}
        >
          发起对话
        </Button>
      );
    },
  }];

  return (
    <Card title="在线访客" style={{ marginTop: 20 }}>
      <Table
        pagination={false}
        bordered={false}
        columns={columns}
        dataSource={clients}
        size="middle"
      />
    </Card>
  );
};

ClientTable.propTypes = {
  clients: PropTypes.array.isRequired,
  launchChat: PropTypes.func.isRequired,
};

export default ClientTable;
