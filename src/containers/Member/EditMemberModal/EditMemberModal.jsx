import React, { PropTypes } from 'react';
import { Modal, Form, Input, Radio, Select } from 'antd';
import { transformObjectToFitForm } from 'modules/helpers';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const RadioButton = Radio.Button;

const EditMemberModal = (props) => {
  const { modalVisible, tagList, memberActions, me } = props;
  const { getFieldProps } = props.form;
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };

  const tagOptions = tagList.map((t, i) => (
    <Option key={i} value={t.name}>{t.name}</Option>
  ));

  let roleRadios = (
    <RadioGroup {...getFieldProps('role')}>
      <RadioButton disabled value="MASTER">超级管理员</RadioButton>
      <RadioButton disabled={me.role !== 'MASTER'} value="MANAGE">管理员</RadioButton>
      <RadioButton value="MEMBER">客服</RadioButton>
    </RadioGroup>
  );

  return (
    <Modal
      title="客服成员"
      visible={modalVisible}
      okText="提交"
      onOk={memberActions.postMember}
      onCancel={memberActions.toggleModalVisible}
    >
      <Form horizontal>
        <FormItem
          {...formItemLayout}
          label="昵称"
        >
          <Input
            {...getFieldProps('name', {
              validate: [{
                rules: [{
                  required: true,
                  message: '请输入姓名',
                }],
              }],
            })}
            type="text"
            placeholder="请输入昵称"
          />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="密码"
        >
          <Input type="password" {...getFieldProps('password')} placeholder="不修改密码请留空" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="邮箱"
        >
          <Input
            {...getFieldProps('email', {
              validate: [{
                rules: [{
                  type: 'email',
                  message: '请输入正确的邮箱地址',
                }],
              }],
            })}
            type="text"
            placeholder="请输入邮箱地址"
          />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="手机号码"
        >
          <Input type="text" {...getFieldProps('phone')} placeholder="请输入手机号码" />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="角色"
        >
          {roleRadios}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="标签："
        >
          <Select
            {...getFieldProps('tagList')}
            tags
            multiple
            style={{ width: '100%' }}
            placeholder="请选择标签"
          >
            {tagOptions}
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

EditMemberModal.propTypes = {
  modalVisible: PropTypes.bool.isRequired,
  form: PropTypes.object.isRequired,
  tagList: PropTypes.array.isRequired,
  memberActions: PropTypes.object.isRequired,
  me: PropTypes.object.isRequired,
};

function mapPropsToFields(props) {
  return transformObjectToFitForm(props.editMember);
}

function onFieldsChange(props, fields) {
  props.memberActions.updateEditMember({ fields });
}

export default Form.create({ mapPropsToFields, onFieldsChange })(EditMemberModal);
