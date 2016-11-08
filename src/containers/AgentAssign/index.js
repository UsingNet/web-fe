import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AgentAssign from './AgentAssign';
import * as assignActions from 'actions/assign';
import * as AgentGroupActions from 'actions/agentGroup';
import * as WebActions from 'actions/web';
import * as WechatActions from 'actions/wechat';
import * as WeiboActions from 'actions/weibo';
import * as MailActions from 'actions/mail';
import * as VoipActions from 'actions/voip';
import { getAssignWithExtraInfo } from './selectors';

function mapStateToProps(state) {
  return {
    agentGroups: state.agentGroup.group,
    assign: getAssignWithExtraInfo(state),
    assignState: state.assign,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    webActions: bindActionCreators(WebActions, dispatch),
    voipActions: bindActionCreators(VoipActions, dispatch),
    assignActions: bindActionCreators(assignActions, dispatch),
    agentGroupActions: bindActionCreators(AgentGroupActions, dispatch),
    wechatActions: bindActionCreators(WechatActions, dispatch),
    weiboActions: bindActionCreators(WeiboActions, dispatch),
    mailActions: bindActionCreators(MailActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AgentAssign);
