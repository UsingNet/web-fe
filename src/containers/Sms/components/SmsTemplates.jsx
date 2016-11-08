import React, { PropTypes } from 'react';
import { Card, Table, Button, Popconfirm } from 'antd';
import TemplateEditModal from './TemplateEditModal';
import styles from '../sms.less';

class SmsTemplates extends React.Component {
  static propTypes = {
    sms: PropTypes.object.isRequired,
    smsActions: PropTypes.object.isRequired,
  }

  editTemplate = (record) => {
    const { smsActions } = this.props;

    smsActions.changeEditingTemplate(record);
    smsActions.toggleModalVisible();
  }

  render() {
    const { sms, smsActions } = this.props;

    const columns = [{
      title: '模板标题',
      dataIndex: 'title',
      width: '15%',
    }, {
      title: '模板',
      dataIndex: 'content',
      width: '55%',
    }, {
      title: '状态',
      dataIndex: 'status',
      render: (value) => {
        const textMap = {
          CHECKING: '审核中',
          FAIL: '审核失败',
          SUCCESS: '审核通过',
        };

        const colorMap = {
          CHECKING: 'checking-status',
          FAIL: 'fail-status',
          SUCCESS: 'success-status',
        };

        return (
          <span className={styles[colorMap[value]]}>{textMap[value]}</span>
        );
      },
    }, {
      title: '操作',
      width: '15%',
      render: (value, record) => (
        <span className={styles['template-actions']}>
          <Button type="ghost" icon="edit" onClick={() => this.editTemplate(record)} />
          <span className="ant-divider"></span>
          <Popconfirm title="确定要删除这个模板吗？" onConfirm={() => smsActions.deleteTemplate(record.id)}>
            <Button type="ghost" icon="delete" />
          </Popconfirm>
        </span>
      ),
    }];

    return (
      <Card title="短信模板" className={styles['sms-template-table']}>
        <div className="clearfix">
          <Button
            icon="plus"
            className={styles['add-template']}
            onClick={() => this.editTemplate({})}
          >
            添加短信模板
          </Button>
        </div>

        <Table
          size="middle"
          rowKey={record => record.id}
          columns={columns}
          pagination={false}
          dataSource={sms.templates}
          onChange={this.onTableChange}
        />

        <TemplateEditModal {...this.props} />
      </Card>
    );
  }
}

export default SmsTemplates;
