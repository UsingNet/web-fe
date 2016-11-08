import React, { PropTypes } from 'react';
import { Select, Button } from 'antd';
import styles from './sms-area.less';

const Option = Select.Option;

class SmsArea extends React.Component {
  static propTypes = {
    contactId: PropTypes.number.isRequired,
    smsTemplateHtml: PropTypes.string.isRequired,
    smsTemplates: PropTypes.array.isRequired,
    getSmsTemplates: PropTypes.func.isRequired,
    setSmsTemplateHtml: PropTypes.func.isRequired,
    sendNoteOrSms: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { getSmsTemplates } = this.props;
    getSmsTemplates();
  }

  onTemplateChange = (value) => {
    const content = value.replace(/#(.*?)#/g, '<input placeholder="$1" />');
    this.props.setSmsTemplateHtml(content);
  }

  sendSms = () => {
    const { contactId } = this.props;
    const parentClass = styles['sms-template-content'];
    const queryClass = `.${parentClass} div`;
    const nodes = document.querySelector(queryClass).childNodes;
    const bodyArray = [];

    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].tagName) {
        bodyArray.push(nodes[i].value);
      } else {
        bodyArray.push(nodes[i].data);
      }
    }

    const body = bodyArray.join('');
    this.props.sendNoteOrSms({
      to: contactId,
      body,
      type: 'SMS',
    });
  }

  render() {
    const { smsTemplates, smsTemplateHtml } = this.props;
    const templateOptions = smsTemplates.map((t, i) => (
      <Option key={i} value={t.content}>{t.title}</Option>
    ));

    return (
      <div className={styles['sms-area']}>
        <div className={styles['sms-template-select']}>
          <Select
            onChange={this.onTemplateChange}
          >
            {templateOptions}
          </Select>
        </div>

        <div className={styles['sms-template-content']}>
          <div
            dangerouslySetInnerHTML={{ __html: smsTemplateHtml }}
          >
          </div>
          <Button type="primary" onClick={this.sendSms}>发送</Button>
        </div>
      </div>
    );
  }
}

export default SmsArea;
