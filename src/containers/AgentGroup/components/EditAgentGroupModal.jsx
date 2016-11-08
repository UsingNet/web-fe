import React, { PropTypes } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import { transformObjectToFitForm } from 'modules/helpers';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const EditAgentGroupModal = (props) => {
  const { editModalVisible } = props.agentGroup;
  const { members, agentGroupActions } = props;
  const { getFieldProps } = props.form;

  const memberOptions = members.map((m, i) => (
    <Option key={i} value={`${m.id}`}>{m.name}</Option>
  ));

  return (
    <Modal
      visible={editModalVisible}
      title="分组编辑"
      onOk={agentGroupActions.submitEditGroup}
      onCancel={agentGroupActions.toggleEditModalVisible}
    >
      <Form horizontal>
        <FormItem
          {...formItemLayout}
          label="分组名称"
        >
          <Input
            {...getFieldProps('name')}
            type="text"
            placeholder="分组名称"
          />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="分组成员"
        >
          <Select
            {...getFieldProps('users')}
            multiple
            placeholder="选择分组成员"
          >
            {memberOptions}
          </Select>
        </FormItem>
      </Form>
    </Modal>
  );
};

EditAgentGroupModal.propTypes = {
  agentGroup: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
  agentGroupActions: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
};

const mapPropsToFields = (props) => transformObjectToFitForm(props.editGroup);
const onFieldsChange = (props, fields) => props.agentGroupActions.updateGroupFields({ fields });

export default Form.create({ mapPropsToFields, onFieldsChange })(EditAgentGroupModal);
