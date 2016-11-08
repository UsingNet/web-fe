import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PayActions from 'actions/pay';
import * as RechargeActions from 'actions/recharge';
import * as BaseSettingActions from 'actions/baseSetting';
import Recharge from './Recharge';

const mapStateToProps = ({ recharge, baseSetting, pay }) => ({
  pay,
  recharge,
  balance: baseSetting.balance,
});

const mapDispatchToProps = (dispatch) => ({
  baseSettingActions: bindActionCreators(BaseSettingActions, dispatch),
  rechargeActions: bindActionCreators(RechargeActions, dispatch),
  payActions: bindActionCreators(PayActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Recharge);
