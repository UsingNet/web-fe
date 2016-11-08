import React, { PropTypes } from 'react';
import { Form, Input, Button } from 'antd';
import { transformObjectToFitForm } from 'modules/helpers';
import styles from './plugin.less';

const FormItem = Form.Item;

class Plugin extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    pluginActions: PropTypes.object.isRequired,
    plugin: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.pluginActions.getPlugin();
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { pluginActions } = this.props;

    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
    };

    const callbackInputProps = getFieldProps('callback', {
      validate: [{
        rules: [{
          required: true,
          message: '回调地址不能为空',
        }, {
          type: 'url',
          message: '请输入正确的 URL',
        }],
        trigger: 'onBlur',
      }],
    });

    const pluginInputProps = getFieldProps('plugin', {
      validate: [{
        rules: [{
          required: true,
          message: '插件地址不能为空',
        }, {
          type: 'url',
          message: '请输入正确的 URL',
        }],
        trigger: 'onBlur',
      }],
    });

    const secretInputProps = getFieldProps('secret', {
      validate: [{
        rules: [{
          required: true,
          message: '密匙不能为空',
        }],
        trigger: 'onBlur',
      }],
    });

    return (
      <div className={styles.plugin}>
        <h3>插件</h3>
        <Form horizontal>
          <FormItem
            {...formItemLayout}
            label="回调地址"
          >
            <Input
              {...callbackInputProps}
              type="text"
              id="callback"
              placeholder="推荐使用https"
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="插件地址"
          >
            <Input
              {...pluginInputProps}
              type="text"
              id="plugin"
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="请求密匙"
          >
            <Input
              {...secretInputProps}
              type="text"
              id="secret"
            />
          </FormItem>

          <Button
            type="primary"
            className="ant-col-offset-1"
            onClick={pluginActions.postPlugin}
          >
            保存
          </Button>
        </Form>

        <div className={styles.desc}>
          <ul>
            <li>
              详见插件
              <a target="_blank" href="http://www.usingnet.net/developer/%E5%AE%A2%E6%9C%8D%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91/%E5%AE%A2%E6%9C%8D%E6%8F%92%E4%BB%B6%E5%BC%80%E5%8F%91.html">
                开发文档
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

function mapPropsToFields(props) {
  return transformObjectToFitForm(props.plugin);
}

function onFieldsChange(props, fields) {
  props.pluginActions.updatePluginFields({ fields });
}

export default Form.create({ mapPropsToFields, onFieldsChange })(Plugin);
