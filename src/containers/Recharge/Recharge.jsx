import React, { PropTypes } from 'react';
import { Card, Form, InputNumber, Radio, Button, Row, Col, Modal } from 'antd';
import { transformObjectToFitForm } from 'modules/helpers';
import styles from './recharge.less';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

class Recharge extends React.Component {
  static propTypes = {
    pay: PropTypes.object.isRequired,
    recharge: PropTypes.object.isRequired,
    balance: PropTypes.string.isRequired,
    rechargeActions: PropTypes.object.isRequired,
    baseSettingActions: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    payActions: PropTypes.object.isRequired,
  }

  componentDidUpdate() {
    const { pay } = this.props;
    if (pay.pay.success && pay.pay.data.status !== 'SUCCESS') {
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

  processRecharge = () => {
    const { recharge, payActions } = this.props;
    const rechargeMoney = recharge.rechargeMoney;
    if (rechargeMoney) {
      payActions.postPay({
        mode: 'RECHARGE',
        type: 'ALIPAY',
        fee: rechargeMoney,
      });
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { recharge, balance } = this.props;

    return (
      <Card title="充值">
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="当前余额"
          >
            <span
              className={`${styles['balance-text']} ant-form-text`}
            >
              {balance}
            </span>元
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="充值金额"
          >
            <InputNumber
              min={0}
              step={0.01}
              {...getFieldProps('rechargeMoney')}
            />
            <span className="ant-form-text">元</span>
          </FormItem>

          <FormItem
            {...formItemLayout}
            style={{ display: 'flex', alignItems: 'center' }}
            label="充值方式"
          >
            <Radio style={{ display: 'flex', alignItems: 'center' }} checked>
              <img alt="alipay" src="/resource/images/alipay.jpg" />
            </Radio>
          </FormItem>

          <FormItem>
            <Row>
              <Col span={21} offset={3}>
                <Button
                  className={recharge.btnDisabled ? '' : styles['pay-style-button']}
                  disabled={recharge.btnDisabled}
                  onClick={this.processRecharge}
                >
                  去支付
                </Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

function mapPropsToFields(props) {
  return transformObjectToFitForm(props.recharge);
}

function onFieldsChange(props, fields) {
  if (fields.rechargeMoney) {
    props.rechargeActions.changeRechargeMoney(fields.rechargeMoney.value);
  }
}

export default Form.create({ mapPropsToFields, onFieldsChange })(Recharge);
