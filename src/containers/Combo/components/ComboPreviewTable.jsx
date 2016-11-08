import React, { PropTypes } from 'react';
import { Table, Button } from 'antd';
import { getDatePart } from 'modules/helpers';
import styles from '../combo.less';

const ComboPreviewTable = (props) => {
  const { comboActions, selectedPlan, planCosts } = props;

  const columns = [{
    title: '套餐类型',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '套餐价格',
    dataIndex: 'price',
    key: 'price',
    render: (text) => (
      <div>
        <span>￥</span>
        <span style={{ fontSize: 14 }} className={styles.number}>{text}</span>
      </div>
    ),
  }, {
    title: '坐席数',
    dataIndex: 'agent_num',
    key: 'agent_num',
  }, {
    title: '到期时间',
    dataIndex: 'year',
    key: 'year',
    render: (text) => {
      const month = getDatePart(selectedPlan.end_at, 'month');
      const day = getDatePart(selectedPlan.end_at, 'day');

      return (
        <span>
          {`${text}年${month}月${day}日`}
        </span>
      );
    },
  }, {
    title: '费用',
    dataIndex: 'costs',
    key: 'costs',
    render: () => (
      <div>
        <span>￥</span>
        <span className={styles.number}>{planCosts}</span>
      </div>
    ),
  }];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={[selectedPlan]}
        pagination={false}
      />

      <div className={styles['confirm-btn-group']}>
        <Button type="primary" onClick={() => comboActions.toStep(0)}>上一步</Button>
        <Button className={styles['pay-btn']} onClick={() => comboActions.toStep(2)}>去支付</Button>
      </div>
    </div>
  );
};

ComboPreviewTable.propTypes = {
  comboActions: PropTypes.object.isRequired,
  selectedPlan: PropTypes.object.isRequired,
  planCosts: PropTypes.string.isRequired,
};

export default ComboPreviewTable;
