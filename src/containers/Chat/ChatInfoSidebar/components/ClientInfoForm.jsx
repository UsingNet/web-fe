import React, { PropTypes } from 'react';
import { Form, Input } from 'antd';
import { transformObjectToFitForm } from 'modules/helpers';
import styles from '../chat-info.less';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

class ClientInfoForm extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    contact: PropTypes.object.isRequired,
    updateClientInfoFields: PropTypes.func.isRequired,
    postContact: PropTypes.func.isRequired,
  }

  onEnter = (e) => {
    const { postContact, contact } = this.props;
    const key = e.target.getAttribute('name');
    if (e.keyCode === 13) {
      postContact({
        id: contact.id,
        [key]: e.target.value,
      });
    }
  }

  onBlur = (e) => {
    const { postContact, contact } = this.props;
    const key = e.target.getAttribute('name');
    postContact({
      id: contact.id,
      [key]: e.target.value,
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    const nameProps = getFieldProps('name');
    const remarkProps = getFieldProps('remark');
    const phoneProps = getFieldProps('phone');
    const emailProps = getFieldProps('email');

    return (
      <Form horizontal>
        <FormItem
          className={styles['info-row']}
          label="姓名"
          {...formItemLayout}
        >
          <Input
            className={styles['flat-input']}
            placeholder="姓名"
            name="name"
            onKeyDown={this.onEnter}
            onBlur={this.onBlur}
            {...nameProps}
          />
        </FormItem>

        <FormItem
          className={styles['info-row']}
          label="备注："
          {...formItemLayout}
        >
          <Input
            className={styles['flat-input']}
            placeholder="备注"
            name="remark"
            onKeyDown={this.onEnter}
            onBlur={this.onBlur}
            {...remarkProps}
          />
        </FormItem>

        <FormItem
          className={styles['info-row']}
          label="手机："
          {...formItemLayout}
        >
          <Input
            className={styles['flat-input']}
            placeholder="手机"
            name="phone"
            onKeyDown={this.onEnter}
            onBlur={this.onBlur}
            {...phoneProps}
          />
        </FormItem>

        <FormItem
          className={styles['info-row']}
          label="邮箱："
          {...formItemLayout}
        >
          <Input
            className={styles['flat-input']}
            placeholder="邮箱"
            name="email"
            onKeyDown={this.onEnter}
            onBlur={this.onBlur}
            {...emailProps}
          />
        </FormItem>
      </Form>
    );
  }
}

const mapPropsToFields = (props) => transformObjectToFitForm(props.contact);
const onFieldsChange = (props, fields) => props.updateClientInfoFields({ fields });

export default Form.create({ mapPropsToFields, onFieldsChange })(ClientInfoForm);
