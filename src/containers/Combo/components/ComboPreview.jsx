import React, { PropTypes } from 'react';
import { Button } from 'antd';
import { getDatePart } from 'modules/helpers';
import styles from '../combo.less';

const ComboPreview = (props) => {
  const { comboActions, selectedPlan, planCosts, nextBtnDisabled } = props;

  return (
    <div className={styles['combo-preview']}>
      <div className={styles.header}>
        <h3>当前设置</h3>
      </div>

      <div>
        <ul>
          <li>
            <span className={styles.title}>套餐类型：</span>
            <span>{selectedPlan.name}</span>
          </li>
          <li>
            <span className={styles.title}>套餐价格：</span>
            <span>￥<span className={styles.number}>{selectedPlan.price}</span>/坐席/年</span>
          </li>
          <li>
            <span className={styles.title}>坐席数：</span>
            <span>{selectedPlan.agent_num}个</span>
          </li>
          <li>
            <span className={styles.title}>到期时间：</span>
            <span>
              {selectedPlan.year || getDatePart(selectedPlan.end_at, 'year')}年
              {getDatePart(selectedPlan.end_at, 'month')}月
              {getDatePart(selectedPlan.end_at, 'day')}日
            </span>
          </li>
          <li>
            <span className={styles.title}>费用：</span>
            <span>￥<span className={styles.number}>{planCosts}</span></span>
          </li>
          <li>
            <Button
              className={!nextBtnDisabled ? styles['next-btn-active'] : ''}
              disabled={nextBtnDisabled}
              onClick={() => comboActions.toStep(1)}
            >
              购买
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

ComboPreview.propTypes = {
  comboActions: PropTypes.object.isRequired,
  selectedPlan: PropTypes.object.isRequired,
  planCosts: PropTypes.string.isRequired,
  nextBtnDisabled: PropTypes.bool.isRequired,
};

export default ComboPreview;
