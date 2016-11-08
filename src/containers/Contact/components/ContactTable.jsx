import React, { PropTypes } from 'react';
import { Table, Button, Popconfirm } from 'antd';
import styles from '../contact.less';

const ContactTable = (props) => {
  const {
    contacts,
    scrollHeight,
    onTableChange,
    tags,
    onEditContact,
    onDeleteContact,
    onLaunchChat,
  } = props;

  const tagFilter = tags.map((item) => ({
    text: item.name,
    value: item.name,
  }));

  const columns = [{
    title: '姓名',
    dataIndex: 'name',
    width: '10%',
    render: (text, record) => (
      <span>
        <img
          alt={record.name}
          src={`${record.img}-avatar`}
          style={{
            width: 26,
            height: 26,
            verticalAlign: 'middle',
            marginRight: 5,
            borderRadius: '50%',
          }}
        />
        {record.name}
      </span>
    ),
  }, {
    title: '备注',
    dataIndex: 'remark',
    width: '10%',
  }, {
    title: '邮箱',
    dataIndex: 'email',
    width: '15%',
    filterMultiple: false,
    filters: [{
      text: '有邮箱',
      value: 1,
    }],
  }, {
    title: '电话',
    dataIndex: 'phone',
    width: '15%',
    filterMultiple: false,
    filters: [{
      text: '有电话',
      value: 1,
    }],
  }, {
    title: '标签',
    dataIndex: 'tags',
    render: (text, record) => (
      <span>
        {
          record.source_tags.map((item, index) => (
            <span
              key={index}
              style={{
                background: `#${item.color}`,
                color: '#fff',
                padding: '4px 8px',
                borderRadius: 4,
                marginRight: 4,
              }}
            >
              {item.name}
            </span>
          ))
        }
      </span>
    ),
    filters: tagFilter,
  }, {
    title: '操作',
    width: 155,
    render: (text, record) => (
      <span className={styles.actions}>
        <Button type="ghost" icon="edit" onClick={() => onEditContact(record)} />
        <span className="ant-divider"></span>
        <Button
          type="ghost"
          icon="message"
          onClick={
            () => onLaunchChat({ contact_id: record.id })
          }
        />
        <span className="ant-divider"></span>
        <Popconfirm title="确定要删除这个联系人吗？" onConfirm={() => onDeleteContact(record.id)}>
          <Button type="ghost" icon="delete" />
        </Popconfirm>
      </span>
    ),
  }];

  const pagination = {
    total: contacts.total,
    current: contacts.currentPage,
    pageSize: contacts.perPage,
    size: 'default',
    showTotal: (total) => (`共${total}条`),
  };

  return (
    <div>
      <Table
        size="middle"
        columns={columns}
        pagination={pagination}
        dataSource={contacts.data}
        scroll={{ y: scrollHeight }}
        onChange={onTableChange}
      />
    </div>
  );
};

ContactTable.propTypes = {
  contacts: PropTypes.object.isRequired,
  scrollHeight: PropTypes.number.isRequired,
  onTableChange: PropTypes.func.isRequired,
  onEditContact: PropTypes.func.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
  onLaunchChat: PropTypes.func.isRequired,
  tags: PropTypes.array,
};

export default ContactTable;
