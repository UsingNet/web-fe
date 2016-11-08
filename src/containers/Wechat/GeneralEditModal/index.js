import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as WechatActions from 'actions/wechat';
import GeneralEditModal from './GeneralEditModal';

function mapStateToProps({ wechat }) {
  return {
    editWechat: wechat.editWechat,
    visible: wechat.generalEditVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    wechatActions: bindActionCreators(WechatActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralEditModal);
