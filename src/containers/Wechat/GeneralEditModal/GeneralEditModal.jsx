import React, { PropTypes } from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import { transformObjectToFitForm } from 'modules/helpers';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const GeneralEditModal = (props) => {
  const { getFieldProps } = props.form;
  const { wechatActions } = props;

  const defaultReplyProps = getFieldProps('default_reply');
  const notOnlineReplyProps = getFieldProps('not_online_agent_reply');

  return (
    <Modal
      visible={props.visible}
      onOk={() => wechatActions.putWechat('general')}
      onCancel={wechatActions.toggleGeneralEditVisible}
      title="自动回复"
    >
      <Form horizontal>
        <FormItem
          {...formItemLayout}
          label="默认回复"
        >
          <Input
            {...defaultReplyProps}
            type="text"
            placeholder="默认回复"
          />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="无客服自动回复"
        >
          <Input
            {...notOnlineReplyProps}
            type="text"
            placeholder="无客服自动回复"
          />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="是否开启评价"
        >
          <RadioGroup
            {...getFieldProps('evaluation')}
          >
            <Radio key="1" value={1}>是</Radio>
            <Radio key="0" value={0}>否</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
  );
};

GeneralEditModal.propTypes = {
  form: PropTypes.object.isRequired,
  wechatActions: PropTypes.object.isRequired,
  editWechat: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
};

function mapPropsToFields(props) {
  return transformObjectToFitForm(props.editWechat);
}

function onFieldsChange(props, fields) {
  props.wechatActions.updateWechatFields({ fields });
}

export default Form.create({ mapPropsToFields, onFieldsChange })(GeneralEditModal);
