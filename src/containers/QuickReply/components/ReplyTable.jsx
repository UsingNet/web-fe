import React, { PropTypes } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import styles from '../quick-reply.less';

const ReplyTable = ({
  replies,
  scrollHeight,
  removeQuickReply,
  toggleModalVisible,
  setEditReply,
  setModalTitle,
}) => {
  const columns = [{
    title: '关键词',
    dataIndex: 'shortcut',
    width: '20%',
    render: (text) => (`# ${text}`),
  }, {
    title: '详细内容',
    dataIndex: 'content',
    width: '70%',
  }, {
    title: '操作',
    width: '10%',
    render: (text, record) => (
      <div className={styles.actions}>
        <Button
          type="ghost"
          icon="edit"
          onClick={() => {
            setEditReply(record);
            setModalTitle('编辑快捷回复');
            toggleModalVisible(true);
          }}
        />
        <span className="ant-divider" />
        <Popconfirm
          title="确定要删除这条数据吗？"
          onConfirm={() => removeQuickReply(record)}
        >
          <Button type="ghost" icon="delete" />
        </Popconfirm>
      </div>
    ),
  }];

  return (
    <Table
      size="middle"
      columns={columns}
      pagination={false}
      dataSource={replies}
      scroll={{ y: scrollHeight }}
    />
  );
};

ReplyTable.propTypes = {
  replies: PropTypes.array.isRequired,
  scrollHeight: PropTypes.number.isRequired,
  removeQuickReply: PropTypes.func.isRequired,
  toggleModalVisible: PropTypes.func.isRequired,
  setEditReply: PropTypes.func.isRequired,
  setModalTitle: PropTypes.func.isRequired,
};

export default ReplyTable;
