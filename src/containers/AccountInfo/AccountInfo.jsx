import React, { PropTypes } from 'react';
import { Form, Input, Switch, Button, Icon, Upload } from 'antd';
import { transformObjectToFitForm } from 'modules/helpers';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

class AccountInfo extends React.Component {
  static propTypes = {
    meActions: PropTypes.object.isRequired,
    me: PropTypes.object.isRequired,
    form: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.meActions.getMe();
  }

  onAvatarUpload = (e) => {
    if (e.fileList && e.fileList.length > 1) {
      e.fileList.shift();
    }

    if (e.file.status === 'done') {
      this.props.meActions.updateMeFields({
        fields: {
          img: {
            name: 'img',
            value: e.file.response.data,
          },
        },
      });
    }

    this.props.meActions.updateMeFields({
      fields: {
        avatarList: {
          name: 'avatarList',
          value: [e.file],
        },
      },
    });
  }

  handleSubmit = (e) => {
    const { meActions } = this.props;
    e.preventDefault();
    meActions.postMe();
  }

  render() {
    const { me } = this.props;
    const { getFieldProps } = this.props.form;

    return (
      <div>
        <Form horizontal onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="昵称"
          >
            <p>{me.name}</p>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="邮箱"
          >
            <p>{me.email || '暂未填写'}</p>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="手机号码"
          >
            <p>{me.phone || '暂未填写'}</p>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="头像"
          >
            <Upload
              name="file"
              accept="image/*"
              action="/v2/upload"
              listType="picture-card"
              onChange={this.onAvatarUpload}
              fileList={me.avatarList}
            >
              <Icon type="plus" />
              <div className="ant-upload-text">点击上传</div>
            </Upload>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="修改密码"
          >
            <Switch
              {...getFieldProps('changePassword', {
                valuePropName: 'checked',
                initialValue: !!me.changePassword,
              })}
            />
          </FormItem>

          <div
            style={{
              height: (me.changePassword ? 160 : 0),
              overflow: 'hidden',
              transition: 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)',
            }}
          >
            <FormItem
              {...formItemLayout}
              label="旧密码"
            >
              <Input
                {...getFieldProps('password')}
                type="password"
                placeholder="若不修改请留空"
              />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="新密码"
            >
              <Input
                {...getFieldProps('newpassword')}
                type="password"
                placeholder="若不修改请留空"
              />
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="确认新密码"
            >
              <Input
                {...getFieldProps('newpassword_confirmation')}
                type="password"
                placeholder="若不修改请留空"
              />
            </FormItem>
          </div>

          <FormItem
            wrapperCol={{ span: 16, offset: 4 }}
            style={{ marginTop: 24 }}
          >
            <Button type="primary" htmlType="submit">确定</Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapPropsToFields = (props) => transformObjectToFitForm(props.me);
const onFieldsChange = (props, fields) => props.meActions.updateMeFields({ fields });

export default Form.create({ mapPropsToFields, onFieldsChange })(AccountInfo);
