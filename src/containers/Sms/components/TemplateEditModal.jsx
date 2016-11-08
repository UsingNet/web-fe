import React, { PropTypes } from 'react';
import { Form, Modal, Input, Alert } from 'antd';
import { transformObjectToFitForm } from 'modules/helpers';
import styles from '../sms.less';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const TemplateEditModal = (props) => {
  const { sms, smsActions } = props;
  const { getFieldProps } = props.form;

  return (
    <Modal
      title={sms.modalTitle}
      visible={sms.modalVisible}
      onOk={smsActions.createOrUpdateTemplate}
      onCancel={smsActions.toggleModalVisible}
      okText="提交"
      width={783}
      closable={false}
      className="sms-template-editor"
    >
      <Form horizontal>
        <FormItem
          {...formItemLayout}
          label="模板标题"
        >
          <Input
            {...getFieldProps('title', {
              rules: [{
                required: true,
                whitespace: true,
                message: '模板标题不能为空',
              }],
            })}
          />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="模板正文"
        >
          <Input
            {...getFieldProps('content', {
              rules: [{
                required: true,
                whitespace: true,
                message: '模板正文不能为空',
              }],
            })}
            style={{ marginBottom: 8 }}
            type="textarea"
            rows={4}
            placeholder="例：尊敬的#name#：您的电话#phone#已经绑定成功。"
          />
          <Alert
            message="模板样例：尊敬的#name#：您的电话#phone#已经绑定成功。（替换的内容放到使用##之间）"
            type="info"
            showIcon
          />
        </FormItem>

        <FormItem
          wrapperCol={{ span: 18, offset: 4 }}
        >
          <div className={styles.attention}>

            <h5>添加模板时请注意，以下类型的模板不能通过审核：</h5>
            <ol>
              <li>涉及房产、贷款、移民、成人用品、政治、色情、暴力、赌博以及其他违法信息不能发送。</li>
              <li>含有病毒、恶意代码、色情、反动等不良信息或有害信息。</li>
              <li>冒充任何人或机构，或以虚伪不实的的方式谎称或使人误认为与任何人或任何机构有关。</li>
              <li>侵犯他人著作权或其他知识产权、或违反保密、雇佣或不披露协议披露他人商业秘密或保密信息。</li>
              <li>粗话、脏话等不文明的内容; 让短信接收者难以理解的内容。</li>
              <li>主题不明确的模板，如：您好#content#,亲爱的用户#content#。</li>
              <li>营销、广告类的短信不能发送-这类短信为：通过一些方式（打折，促销等）吸引客户过来参与一些活动，或购买一些产品或服务。</li>
            </ol>
          </div>
        </FormItem>
      </Form>
    </Modal>
  );
};

TemplateEditModal.propTypes = {
  form: PropTypes.object.isRequired,
  sms: PropTypes.object.isRequired,
  smsActions: PropTypes.object.isRequired,
};

const mapPropsToFields = (props) => transformObjectToFitForm(props.sms.editingTemplate);

const onFieldsChange = (props, fields) => props.smsActions.updateEditingTemplateFields({ fields });

export default Form.create({ mapPropsToFields, onFieldsChange })(TemplateEditModal);
