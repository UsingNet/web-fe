import React, { PropTypes } from 'react';
import { Form, Switch, Card, Button, Select, Input } from 'antd';
import { transformObjectToFitForm } from 'modules/helpers';
import styles from './agent-assign.less';

const FormItem = Form.Item;
const Option = Select.Option;

class AgentAssign extends React.Component {
  static propTypes = {
    agentGroupActions: PropTypes.object.isRequired,
    webActions: PropTypes.object.isRequired,
    wechatActions: PropTypes.object.isRequired,
    weiboActions: PropTypes.object.isRequired,
    mailActions: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
    assign: PropTypes.object.isRequired,
    assignActions: PropTypes.object.isRequired,
    agentGroups: PropTypes.object.isRequired,
    voipActions: PropTypes.object.isRequired,
    voipNumber: PropTypes.string,
    mailAddress: PropTypes.string,
  }

  componentDidMount() {
    const {
      assignActions,
      agentGroupActions,
      wechatActions,
      weiboActions,
      mailActions,
      voipActions,
      webActions,
    } = this.props;

    assignActions.getAssign();
    agentGroupActions.getAgentGroup();
    webActions.getSites();
    weiboActions.getWeibo();
    wechatActions.getWechat();
    voipActions.getVoip();
    mailActions.getMail();
  }

  onRemoveRule(index) {
    const { assign, assignActions } = this.props;
    assign.web_rule.splice(index, 1);
    assignActions.submitAssignFields();
  }

  onRuleGroupAdd() {
    const { getFieldValue } = this.props.form;
    const { assign, assignActions } = this.props;
    const newRule = {
      url: getFieldValue('newRuleUrl'),
      group_id: getFieldValue('newRuleGroup')
    };

    assign.web_rule.push(newRule);
    assignActions.submitAssignFields();
  }

  render() {
    const { getFieldProps, getFieldValue } = this.props.form;
    const { agentGroups } = this.props;

    const formItemLayout = {
      wrapperCol: { span: 16 },
    };

    const groupsNode = agentGroups.data.map((group, i) => (
      <Option key={i} value={`${group.id}`}>{group.name}</Option>
    ));

    const sitesNode = getFieldValue('web').map((site, index) => (
      <div
        className="group site"
        key={index}
      >
        <h4>{site.name}</h4>
        <Select
          {...getFieldProps(`webs.${index}.group_id`, {
            initialValue: site.group_id,
          })}
          placeholder="请选择客服分组"
          multiple
        >
          {groupsNode}
        </Select>
      </div>
    ));

    const webRuleNode = getFieldValue('web_rule').map((rule, index) => (
      <div
        key={index}
        className="group web-rule"
        style={{ marginTop: '20px' }}
      >
        <Input
          {...getFieldProps(`web_rules.${index}.url`, {
            initialValue: rule.url,
          })}
          placeholder="请填写URL"
        />
        <Select
          {...getFieldProps(`web_rules.${index}.group_id`, {
            initialValue: rule.group_id,
          })}
          placeholder="请选择客服分组"
          multiple
        >
          {groupsNode}
        </Select>

        <Button
          className="remove-rule"
          type="ghost"
          onClick={(index) => this.onRemoveRule(index)}
        >
          删除
        </Button>
      </div>
    ));

    const wechatNode = getFieldValue('wechat').map((w, index) => (
      <div
        className="group wechat"
        key={index}
      >
        <h4>{w.name}</h4>
        <Select
          {...getFieldProps(`wechats.${index}.group_id`, {
            initialValue: w.group_id,
          })}
          placeholder="请选择客服分组"
          multiple
        >
            {groupsNode}
        </Select>
      </div>
    ));

    const weiboNode = getFieldValue('weibo').map((w, index) => (
      <div
        className="group wechat"
        key={index}
      >
        <h4>{w.name}</h4>
        <Select
          {...getFieldProps(`weibos.${index}.group_id`, {
            initialValue: w.group_id,
          })}
          placeholder="请选择客服分组"
          multiple
        >
            {groupsNode}
        </Select>
      </div>
    ));

    return (
      <div className={styles['agent-assign']}>
        <h3>客服分配</h3>

        <Form horizontal>
          <FormItem
            {...formItemLayout}
          >
            <Card
              title="优先设置"
            >
              <label>优先转接到上次接待的客服：</label>
              <Switch
                {...getFieldProps('repeat', {
                  valuePropName: 'checked',
                })}
              />
            </Card>
          </FormItem>

          <FormItem
            {...formItemLayout}
            className={`${styles['group-card']} site-setting`}
          >
            <Card
              title="网站设置（指定各个网站的客服组）"
              className={`${styles.card}`}
            >
                {sitesNode}
            </Card>
          </FormItem>

          <FormItem
            {...formItemLayout}
            className={`${styles['group-card']} rule-setting`}
          >
            <Card
              className={`${styles.card}`}
              title="网站规则（指定填写的 URL 的客服组）"
            >
              <div className="group web-rule">
                <Input
                  {...getFieldProps('newRuleUrl')}
                  placeholder="请填写URL"
                />
                <Select
                  {...getFieldProps('newRuleGroup')}
                  placeholder="请选择客服分组"
                  multiple
                >
                  {groupsNode}
                </Select>

                <Button
                  className="add-rule"
                  type="primary"
                  onClick={ () => this.onRuleGroupAdd() }
                >
                  添加
                </Button>
              </div>
              {webRuleNode}
            </Card>
          </FormItem>

          <FormItem
            {...formItemLayout}
            className={`${styles['group-card']} wechat-setting`}
          >
            <Card
              title="微信设置（指定各个微信的客服组）"
              className={`${styles.card}`}
            >
              {wechatNode}
            </Card>
          </FormItem>

          <FormItem
            {...formItemLayout}
            className={`${styles['group-card']} weibo-setting`}
          >
            <Card
              title="微博设置（指定各个微博的客服组）"
              className={`${styles.card}`}
            >
              {weiboNode}
            </Card>
          </FormItem>

          <FormItem
            {...formItemLayout}
          >
            <Card title={'电话设置'}>
              <h4>可接听电话的客服组：</h4>
              <Select
                {...getFieldProps('voip')}
                placeholder="请选择客服分组"
                multiple
              >
                {groupsNode}
              </Select>
            </Card>
          </FormItem>

          <FormItem
            {...formItemLayout}
          >
            <Card title={'邮件设置'}>
              <h4>可接收邮件的客服组：</h4>
              <Select
                {...getFieldProps('mail')}
                placeholder="请选择客服分组"
                multiple
              >
                {groupsNode}
              </Select>
            </Card>
          </FormItem>
        </Form>
      </div>
    );
  }
}

function mapPropsToFields(props) {
  return transformObjectToFitForm(props.assign);
}

function onFieldsChange(props, fields) {
  const { assignActions } = props;
  assignActions.updateAssignFields({ fields, extraAssign: props.assign });
  assignActions.submitAssignFields();
}

export default Form.create({ mapPropsToFields, onFieldsChange })(AgentAssign);
