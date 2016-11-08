import React, { PropTypes } from 'react';
import { Button, Form, Upload, Radio } from 'antd';
import styles from '../voip.less';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const PhoneAccessCheckingForm = (props) => {
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const { voip } = props;
  const uploadProps = {
    listType: 'picture',
    onPreview(file) { window.open(file.url); },
    fileList: voip.display_number_files.map((e, i) => {
      // eslint-disable-next-line no-param-reassign
      e.uid = i;
      return e;
    }),
  };

  return (
    <Form horizontal>
      <FormItem
        {...formItemLayout}
        label="虚拟号码"
      >
        <span className="phone-number">{voip.number}</span>
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="绑定的固话号码"
      >
        <span className="phone-number">{voip.display_number}</span>
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="开启评价"
      >
        <RadioGroup
          value={voip.evaluation}
        >
          <Radio key="1" value="1">是</Radio>
          <Radio key="0" value="0">否</Radio>
        </RadioGroup>
      </FormItem>

      <FormItem
        {...formItemLayout}
        label="协议文件"
      >
        <Upload
          {...uploadProps}
          className={`${styles['upload-list-inline']} ${styles['phone-access-checking']}`}
        />
      </FormItem>

      <FormItem
        {...formItemLayout}
      >
        <Button
          type="primary"
          className="ant-col-offset-8"
          loading
        >
          正在审核
        </Button>

        <Button
          type="primary"
          style={{ marginLeft: 10 }}
          onClick={props.backToEdit}
        >
          修改
        </Button>

        <Button
          type="primary"
          style={{ marginLeft: 10 }}
          onClick={props.jumpToLastStep}
        >
          跳过
        </Button>
      </FormItem>
    </Form>
  );
};

PhoneAccessCheckingForm.propTypes = {
  voip: PropTypes.object.isRequired,
  jumpToLastStep: PropTypes.func.isRequired,
  backToEdit: PropTypes.func.isRequired,
};

export default PhoneAccessCheckingForm;
