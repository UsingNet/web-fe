import React, { PropTypes } from 'react';
import { Card, Form, Input, Button, Alert, message } from 'antd';
import { transformObjectToFitForm } from 'modules/helpers';
import styles from '../sms.less';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 16 },
};

class SmsSignature extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    smsActions: PropTypes.object.isRequired,
    sms: PropTypes.object.isRequired,
  }

  processSmsSetting = () => {
    this.props.form.validateFields(errors => {
      if (!errors) {
        this.props.smsActions.postSmsSetting();
      } else {
        message.error('短信签名不能为空');
      }
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { sms } = this.props;
    let signatureStatus = '';

    switch (sms.sms.status) {
      case 'INIT':
        signatureStatus = (<Alert message="设置短信签名并审核通过后才能在对话中发送短信。" type="warning" showIcon />);
        break;
      case 'CHECKING':
        signatureStatus = (<Alert message="您设置的短信签名正在审核中，很快就可以向客户发送短信了！" type="info" showIcon />);
        break;
      case 'FAIL':
        signatureStatus = (
          <Alert
            message={`您设置的短信签名审核没有通过，暂时不能向客户发送短信。没通过原因是：${sms.sms.failMessage}`}
            type="error"
            showIcon
          />);
        break;
      case 'SUCCESS':
        signatureStatus = (
          <Alert
            message="您设置的短信签名审核通过，现在可以在对话中向保存了手机号码的客户发送短信了。"
            type="success"
            showIcon
          />);
        break;
      default:
        break;
    }

    return (
      <Card title="短信签名">
        <Form horizontal className={styles['sms-signature-form']}>
          <FormItem
            {...formItemLayout}
            label="短信签名"
          >
            <Input
              {...getFieldProps('signature', {
                initialValue: sms.sms.signature,
                rules: [{
                  required: true,
                  whitespace: true,
                  message: '短信签名不能为空',
                }],
              })}
            />
            {signatureStatus}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="注"
          >
            <span>应工信部要求，所有106号段发送的短信都需要添加短信签名。此短信签名将会出现在发送回访短信的开头处。</span>
          </FormItem>

          <FormItem
            wrapperCol={{ span: 2, offset: 22 }}
          >
            <Button
              style={{ marginLeft: 10 }}
              size="default"
              type="primary"
              disabled={sms.submitDisabled}
              onClick={this.processSmsSetting}
            >
              提交
            </Button>
          </FormItem>
        </Form>
      </Card>
    );
  }
}

const mapPropsToFields = (props) => transformObjectToFitForm(props.sms.sms);

const onFieldsChange = (props, fields) => props.smsActions.updateSmsFormFields({ fields });

export default Form.create({ mapPropsToFields, onFieldsChange })(SmsSignature);
