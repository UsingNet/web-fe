import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as WeiboActions from 'actions/weibo';
import Weibo from './Weibo';

function mapStateToProps({ weibo }) {
  return {
    weibos: weibo.weibo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    weiboActions: bindActionCreators(WeiboActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Weibo);
