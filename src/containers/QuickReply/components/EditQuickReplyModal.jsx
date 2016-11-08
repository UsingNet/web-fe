import React, { PropTypes } from 'react';
import { Modal, Form, Input } from 'antd';
import { transformObjectToFitForm } from 'modules/helpers';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const EditQuickReplyModal = (props) => {
  const { modalTitle, modalVisible, quickReplyActions } = props;
  const { getFieldProps } = props.form;

  return (
    <Modal
      visible={modalVisible}
      title={modalTitle}
      onOk={quickReplyActions.submitQuickReply}
      onCancel={() => quickReplyActions.toggleModalVisible(false)}
      onText="提交"
    >
      <Form horizontal>
        <FormItem
          {...formItemLayout}
          label="快捷词"
        >
          <Input
            {...getFieldProps('shortcut', {
              rules: [{
                required: true,
                max: 10,
                message: '必填，且长度不能大于10个字符',
              }],
            })}
            addonBefore="#"
          />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="详细内容"
        >
          <Input
            {...getFieldProps('content', {
              rules: [{
                required: true,
                max: 255,
                message: '必填，且长度不能大于255个字符',
              }],
            })}
            type="textarea"
            rows={10}
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

EditQuickReplyModal.propTypes = {
  form: PropTypes.object.isRequired,
  modalTitle: PropTypes.string.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  quickReplyActions: PropTypes.object.isRequired,
};

const mapPropsToFields = (props) => transformObjectToFitForm(props.editReply);
const onFieldsChange = (props, fields) => props.quickReplyActions.updateReplyFields({ fields });

export default Form.create({ mapPropsToFields, onFieldsChange })(EditQuickReplyModal);
