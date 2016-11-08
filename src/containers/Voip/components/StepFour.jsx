import React, { PropTypes } from 'react';
import { Button, Form } from 'antd';
import styles from '../voip.less';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

// eslint-disable-next-line react/prefer-stateless-function
class StepFour extends React.Component {
  static propTypes = {
    voipNumber: PropTypes.string.isRequired,
    displayNumberStatus: PropTypes.string.isRequired,
    displayNumber: PropTypes.number,
    voipPrice: PropTypes.number.isRequired,
    backToStepThree: PropTypes.func.isRequired,
  };

  render() {
    const {
      voipNumber,
      displayNumberStatus,
      displayNumber,
      voipPrice,
      backToStepThree,
    } = this.props;

    return (
      <div>
        <h1>电话接入成功！</h1>
        <Form horizontal>
          <FormItem {...formItemLayout} label="申请的虚拟号码：">
            <span className={styles['phone-number']}>{voipNumber}</span>
          </FormItem>

          <FormItem {...formItemLayout} label="绑定的固话号码：">
            <span
              className={styles['phone-number']}
            >
              {
                  displayNumberStatus === 'CHECKING'
                  ?
                  '审核中'
                  : (displayNumber || '未绑定')
              }
            </span>
          </FormItem>

          <FormItem {...formItemLayout} label="语音电话资费">
            <span>{`${voipPrice}元/分钟`}</span>
          </FormItem>
        </Form>

        <Button
          type="primary"
          className={styles['back-to-setting-number-btn']}
          onClick={backToStepThree}
        >
          返回设置自定义绑定号码
        </Button>
      </div>
    );
  }
}

export default StepFour;
