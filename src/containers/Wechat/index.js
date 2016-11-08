import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as WechatActions from 'actions/wechat';
import Wechat from './Wechat';

function mapStateToProps({ wechat }) {
  return {
    wechats: wechat.wechat,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    wechatActions: bindActionCreators(WechatActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wechat);
