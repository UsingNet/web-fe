import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as WechatActions from 'actions/wechat';
import AdvanceEditModal from './AdvanceEditModal';

function mapStateToProps({ wechat }) {
  return {
    editWechat: wechat.editWechat,
    visible: wechat.advanceEditVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    wechatActions: bindActionCreators(WechatActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdvanceEditModal);
