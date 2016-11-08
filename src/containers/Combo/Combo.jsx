import React, { PropTypes } from 'react';
import CurrentCombo from './components/CurrentCombo';
import BuyCombo from './components/BuyCombo';
import styles from './combo.less';

class Combo extends React.Component {
  static propTypes = {
    combo: PropTypes.object.isRequired,
    baseSettingActions: PropTypes.object.isRequired,
    comboActions: PropTypes.object.isRequired,
  }

  componentDidMount() {
    const { baseSettingActions, comboActions } = this.props;

    baseSettingActions.getBaseSetting();
    comboActions.getComboPlans();
    comboActions.getCurrentPlan();
  }

  render() {
    return (
      <div className={styles['combo-setting']}>
        <CurrentCombo currentPlan={this.props.combo.currentPlan} />
        <BuyCombo {...this.props} />
      </div>
    );
  }
}

export default Combo;
