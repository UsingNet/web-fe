import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as WeiboActions from 'actions/weibo';
import GeneralEditModal from './GeneralEditModal';

function mapStateToProps({ weibo }) {
  return {
    editWeibo: weibo.editWeibo,
    visible: weibo.generalEditVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    weiboActions: bindActionCreators(WeiboActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralEditModal);
