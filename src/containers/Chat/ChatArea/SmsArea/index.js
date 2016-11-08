import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSmsTemplates } from 'actions/sms';
import { setSmsTemplateHtml } from 'actions/chat';
import { sendNoteOrSms } from 'actions/messages';
import SmsArea from './SmsArea';

const mapStateToProps = ({ sms, chat, order }) => ({
  contactId: order.selectedOrder.contact.id,
  smsTemplates: sms.templates,
  smsTemplateHtml: chat.smsTemplateHtml,
});

const mapDispatchToProps = (dispatch) => ({
  getSmsTemplates: bindActionCreators(getSmsTemplates, dispatch),
  setSmsTemplateHtml: bindActionCreators(setSmsTemplateHtml, dispatch),
  sendNoteOrSms: bindActionCreators(sendNoteOrSms, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SmsArea);
