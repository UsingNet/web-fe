import React, { PropTypes } from 'react';
import { Modal, Form, Select, Input } from 'antd';
import { transformObjectToFitForm } from 'modules/helpers';

const FormItem = Form.Item;
const Option = Select.Option;

const EditContactModal = (props) => {
  const { getFieldProps } = props.form;
  const { editContact, modalTitle, modalVisible, contactActions } = props;
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };

  return (
    <Modal
      title={modalTitle}
      okText="提交"
      maskClosable={false}
      visible={modalVisible}
      onOk={contactActions.postContact}
      onCancel={contactActions.toggleModalVisible}
    >
      <div>
        <img
          src={editContact.img}
          alt="获取头像失败"
          style={{
            width: 100,
            height: 100,
            margin: '0 auto',
            display: 'block',
            marginBottom: 15,
            borderRadius: '50%',
          }}
        />

        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="姓名"
            hasFeedback
          >
            <Input
              {...getFieldProps('name', {
                rules: [
                  { required: true, min: 2, max: 15, message: '姓名为2-15个字符' },
                ],
              })}
              type="text"
              autoComplete="off"
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="备注"
          >
            <Input
              {...getFieldProps('remark', {})}
              type="text"
              autoComplete="off"
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="邮箱"
          >
            <Input
              {...getFieldProps('email', {})}
              type="email"
              autoComplete="off"
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="电话"
          >
            <Input
              {...getFieldProps('phone', {})}
              type="phone"
              autoComplete="off"
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="标签"
          >
            <Select
              tags
              searchPlaceholder="输入添加"
              {...getFieldProps('tags')}
            >
              {
                props.tags.map(item => (
                  <Option key={item.id} value={item.name}>{item.name}</Option>
                ))
              }
            </Select>
          </FormItem>
        </Form>
      </div>
    </Modal>
  );
};

EditContactModal.propTypes = {
  form: PropTypes.object.isRequired,
  editContact: PropTypes.object.isRequired,
  modalTitle: PropTypes.string.isRequired,
  modalVisible: PropTypes.bool.isRequired,
  contactActions: PropTypes.object.isRequired,
  tags: PropTypes.array.isRequired,
};

function mapPropsToFields(props) {
  return transformObjectToFitForm(props.editContact);
}

function onFieldsChange(props, fields) {
  props.contactActions.updateEditContact({ fields });
}

export default Form.create({ mapPropsToFields, onFieldsChange })(EditContactModal);
