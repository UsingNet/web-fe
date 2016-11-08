import React, { PropTypes } from 'react';
import { Button, Form, Input, Upload, Icon, Radio, message } from 'antd';
import { transformObjectToFitForm } from 'modules/helpers';
import styles from '../voip.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class PhoneAccessForm extends React.Component {
  static propTypes = {
    form: PropTypes.object.isRequired,
    voip: PropTypes.object.isRequired,
    jumpToLastStep: PropTypes.func.isRequired,
    updateVoipFields: PropTypes.func.isRequired,
    postVoip: PropTypes.func.isRequired,
    checkFiles: PropTypes.array.isRequired,
  }

  onPicUploaded = (e) => {
    if (e.fileList && e.fileList.length > 2) {
      e.fileList.shift();
    }

    if (e.file.status === 'done') {
      if (e.file.response.code === 200) {
        this.props.updateVoipFields({
          fields: {
            display_number_files: {
              name: 'display_number_files',
              value: e.fileList.slice(0, 2).map(file => ({
                uid: file.uid,
                name: file.name,
                url: file.url || file.response.data,
              })),
            },
          },
        });
      } else {
        message.error(e.file.response.msg);
      }
    }

    this.props.updateVoipFields({
      fields: {
        checkFiles: {
          name: 'checkFiles',
          value: e.fileList,
        },
      },
    });
  }

  render() {
    const { getFieldProps } = this.props.form;
    const { voip, jumpToLastStep, postVoip, checkFiles } = this.props;

    const uploadProps = {
      name: 'file',
      action: '/v2/upload',
      listType: 'picture',
      accept: 'image/*',
      onChange: this.onPicUploaded,
      fileList: checkFiles,
    };

    return (
      <Form horizontal>
        <FormItem
          {...formItemLayout}
          label="虚拟号码"
        >
          <span className={styles['phone-number']}>{voip.number}</span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="绑定的固话号码"
          className={styles['number-to-bind-input']}
        >
          <Input
            {...getFieldProps('display_number', {
              initialValue: voip.display_number,
            })}
            type="number"
          />
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="是否开启评价"
        >
          <RadioGroup
            {...getFieldProps('evaluation', {
              initialValue: voip.evaluation,
            })}
          >
            <Radio key="1" value="1">是</Radio>
            <Radio key="0" value="0">否</Radio>
          </RadioGroup>
          <span style={{ color: '#E53935' }}>（此功能需要先开通短信接入）</span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="协议文件"
        >
          <span>请下载协议文件手工填写后上传扫描件或照片，点击下载：
            <a href="http://7xouvh.com1.z0.glb.clouddn.com/号码透传证明.docx">号码透传证明</a>，
            <a href="http://7xouvh.com1.z0.glb.clouddn.com/透传承诺函.docx">透传承诺函</a>
          </span>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="上传协议文件"
        >
          <Upload
            {...uploadProps}
            className={styles['upload-list-inline']}
            ref="uploadComponent"
          >
            <Button type="ghost">
              <Icon type="upload" /> 点击上传
            </Button>
          </Upload>
        </FormItem>

        <FormItem
          {...formItemLayout}
        >
          <Button
            type="primary"
            className="ant-col-offset-8"
            onClick={postVoip}
          >
            提交
          </Button>
          <Button
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={jumpToLastStep}
          >
              跳过
          </Button>
        </FormItem>
      </Form>
    );
  }
}

function mapPropsToFields(props) {
  return transformObjectToFitForm(props.voip);
}

function onFieldsChange(props, fields) {
  props.updateVoipFields({ fields });
}

export default Form.create({ mapPropsToFields, onFieldsChange })(PhoneAccessForm);
