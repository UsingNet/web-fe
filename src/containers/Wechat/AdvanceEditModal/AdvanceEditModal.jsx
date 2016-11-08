import React, { PropTypes } from 'react';
import { Form, Input, Modal, Select } from 'antd';
import { transformObjectToFitForm } from 'modules/helpers';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const AdvanceEditModal = (props) => {
  const { getFieldProps } = props.form;
  const { wechatActions } = props;

  return (
    <Modal
      visible={props.visible}
      onOk={() => wechatActions.putWechat('advance')}
      onCancel={wechatActions.toggleAdvanceEditVisible}
      title="服务器设置"
    >
      <Form horizontal>
        <FormItem
          {...formItemLayout}
          label="服务器地址："
        >
          <Input
            {...getFieldProps('url')}
            type="text"
            placeholder="请输入服务器地址"
          />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="Token："
        >
          <Input
            {...getFieldProps('token')}
            type="text"
            placeholder="请输入 Token"
          />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="传输方式："
        >
          <Select
            {...getFieldProps('mode')}
            defaultValue="ENCRYPTION"
            style={{ width: 100 }}
          >
            <Option value="ENCRYPTION">加密</Option>
            <Option value="EXPRESS">明文</Option>
          </Select>
        </FormItem>

        <FormItem
          {...formItemLayout}
          help="长度固定为43个字符，从a-z,A-Z,0-9共62个字符中选取"
          label="EncodingAeskey："
        >
          <Input
            {...getFieldProps('encoding_aes_key')}
            type="encoding_aes_key"
            placeholder="请输入 43 位字符"
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

AdvanceEditModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
  wechatActions: PropTypes.object.isRequired,
  editWechat: PropTypes.object.isRequired,
};

function mapPropsToFields(props) {
  return transformObjectToFitForm(props.editWechat);
}

function onFieldsChange(props, fields) {
  props.wechatActions.updateWechatFields({ fields });
}

export default Form.create({ mapPropsToFields, onFieldsChange })(AdvanceEditModal);
