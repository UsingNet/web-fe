import React, { PropTypes } from 'react';
import { Checkbox, InputNumber, Radio, Button, Modal } from 'antd';
import styles from '../combo.less';

const confirm = Modal.confirm;

class PayCombo extends React.Component {
  static propTypes = {
    baseSetting: PropTypes.object.isRequired,
    comboActions: PropTypes.object.isRequired,
    payWithBalance: PropTypes.bool.isRequired,
    balanceCosts: PropTypes.string.isRequired,
    baseSettingActions: PropTypes.object.isRequired,
    thirdPayCosts: PropTypes.string.isRequired,
    selectedPlan: PropTypes.object.isRequired,
    planCosts: PropTypes.string.isRequired,
    pay: PropTypes.object.isRequired,
    payActions: PropTypes.object.isRequired,
  }

  componentDidUpdate() {
    const { pay } = this.props;
    if (pay.pay.success) {
      window.open(`/v2/account/pay/${pay.pay.data.trade_no}?type=alipay`);
      confirm({
        title: '您是否已经支付成功',
        okText: '已经支付成功',
        cancelText: '我需要重新支付',
        maskClosable: false,
        onOk() {
          location.reload();
        },
      });
    }
  }

  confirmPay = () => {
    const { comboActions, thirdPayCosts, selectedPlan, payActions } = this.props;
    if (thirdPayCosts !== '0') {
      payActions.postPay({
        mode: 'PLAN',
        type: 'ALIPAY',
        fee: thirdPayCosts,
        remark: {
          plan_id: selectedPlan.plan_id,
          year: selectedPlan.year,
          agent_num: selectedPlan.agent_num,
        },
      });
      // eslint-disable-next-line max-len
    } else {
      comboActions.payComboPlan();
    }
  }

  render() {
    const {
      baseSetting,
      comboActions,
      payWithBalance,
      planCosts,
      balanceCosts,
      thirdPayCosts,
    } = this.props;

    const balance = baseSetting.balance;
    const maxPayFromBalance = parseFloat(balanceCosts >= balance ? balance : balanceCosts);

    return (
      <div className={styles['pay-confirm']}>
        <div className={`${styles.pay} ${styles['pay-from-balance']}`}>
          <Checkbox
            checked={payWithBalance}
            onChange={
              (e) => comboActions.togglePayWithBalance({
                isWithBalance: e.target.checked,
                balance,
              })
            }
          >
            现金余额 ¥{baseSetting.balance}
          </Checkbox>

          <div>
            <span>当前使用 </span>
            <InputNumber
              size="small"
              min={0}
              max={maxPayFromBalance}
              step={0.01}
              value={balanceCosts}
              onChange={(v) => comboActions.updateBalanceCosts(v)}
            />
            <span> 元</span>
          </div>

          <span style={{ color: '#f60' }}>如果您有正在使用中的后付费产品，请保证有足够余额。</span>

          <div style={{ float: 'right', marginRight: 0 }} className="flex-end-center">
            <span>支付￥</span><span className={styles.number}>{balanceCosts}</span>
          </div>
        </div>

        <div className={styles.pay}>
          <span>其他支付方式</span>
          <div style={{ float: 'right' }} className="flex-end-center">
            <span>支付￥</span><span className={styles.number}>{thirdPayCosts}</span>
          </div>
        </div>

        <Radio style={{ display: 'flex', alignItems: 'center', marginLeft: 13 }} checked>
          <img alt="支付宝" src="/resource/images/alipay.jpg" />
        </Radio>

        <hr />

        <div className={styles['at-end']}>
          <span>一共支付￥</span><span className={styles.number}>{planCosts}</span>
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={() => comboActions.toStep(0)}
          >
            取消
          </Button>
          <Button onClick={this.confirmPay} className={styles['pay-btn']}>确认支付</Button>
        </div>
      </div>
    );
  }
}

export default PayCombo;
