import React, { PropTypes } from 'react';
import { Col, Form, Input, InputNumber, Select, Button } from 'antd';
import { transformObjectToFitForm } from 'modules/helpers';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 10 },
};

class Mail extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    mailActions: PropTypes.object.isRequired,
    mail: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.mailActions.getMail();
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { mailActions } = this.props;

    const serverValidate = {
      validate: [{
        rules: [{
          required: true,
          message: '服务器主机名不能为空',
        }],
      }],
    };

    const portValidate = {
      initialValue: '',
      validate: [{
        rules: [{
          required: true,
          message: '服务器端口不能为空',
        }],
      }],
    };

    const modeValidate = {
      validate: [{
        rules: [{
          required: true,
          message: '加密方式不能为空',
        }],
      }],
    };

    const emailProps = getFieldProps('email', {
      validate: [{
        rules: [{
          required: true,
          message: '邮箱地址不能为空',
        }, {
          type: 'email',
          message: '请输入正确的邮箱地址',
        }],
      }],
    });

    const passwordProps = getFieldProps('password', {
      validate: [{
        rules: [{
          required: true,
          message: '密码不能为空',
        }],
      }],
    });

    const smtpProps = getFieldProps('smtp', serverValidate);
    const smtpPortProps = getFieldProps('smtp_port', portValidate);
    const smtpModeProps = getFieldProps('smtp_mode', modeValidate);

    const imapProps = getFieldProps('imap', serverValidate);
    const imapPortProps = getFieldProps('imap_port', portValidate);
    const imapModeProps = getFieldProps('imap_mode', modeValidate);

    return (
      <div>
        <h3>邮件接入</h3>
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="邮箱地址"
            hasFeedback
          >
            <Input
              {...emailProps}
              type="email"
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="密码"
            hasFeedback
          >
            <Input
              {...passwordProps}
              type="password"
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="发出(SMTP)"
            hasFeedback
          >
            <InputGroup>
              <Col span="10">
                <Input
                  {...smtpProps}
                  type="text"
                  placeholder="服务器主机名"
                />
              </Col>

              <Col span="4">
                <InputNumber
                  {...smtpPortProps}
                  min={0}
                  step={1}
                  placeholder="端口"
                />
              </Col>

              <Col span="8">
                <Select
                  {...smtpModeProps}
                  defaultValue="ENCRYPTION"
                >
                  <Option value="ENCRYPTION">加密</Option>
                  <Option value="EXPRESS">明文</Option>
                </Select>
              </Col>
            </InputGroup>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="接收(IMAP)"
            hasFeedback
          >
            <InputGroup>
              <Col span="10">
                <Input
                  {...imapProps}
                  type="text"
                  placeholder="服务器主机名"
                />
              </Col>

              <Col span="4">
                <InputNumber
                  {...imapPortProps}
                  min={0}
                  step={1}
                  placeholder="端口"
                />
              </Col>

              <Col span="8">
                <Select
                  {...imapModeProps}
                  defaultValue="ENCRYPTION"
                  placeholder="加密方式"
                >
                  <Option value="ENCRYPTION">加密</Option>
                  <Option value="EXPRESS">明文</Option>
                </Select>
              </Col>
            </InputGroup>
          </FormItem>

          <Button
            className="ant-col-offset-1"
            type="primary"
            onClick={mailActions.postMail}
          >
            保存
          </Button>
        </Form>
      </div>
    );
  }
}

function mapPropsToFields(props) {
  return transformObjectToFitForm(props.mail);
}

function onFieldsChange(props, fields) {
  props.mailActions.updateMailFields({ fields });
}

export default Form.create({ mapPropsToFields, onFieldsChange })(Mail);
