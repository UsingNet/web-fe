import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as BaseSettingActions from 'actions/baseSetting';
import * as ComboActions from 'actions/combo';
import * as PayActions from 'actions/pay';
import Combo from './Combo';

const mapStateToProps = ({ baseSetting, combo, pay }) => ({
  pay,
  baseSetting,
  combo,
});

const mapDispatchToProps = (dispatch) => ({
  baseSettingActions: bindActionCreators(BaseSettingActions, dispatch),
  comboActions: bindActionCreators(ComboActions, dispatch),
  payActions: bindActionCreators(PayActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Combo);
