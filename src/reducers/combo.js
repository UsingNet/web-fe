import { handleActions } from 'redux-actions';
import * as ComboActions from 'actions/combo';

const combo = handleActions({
  [`${ComboActions.getComboPlansSuccess}`](state, action) {
    return {
      ...state,
      plans: action.payload,
    };
  },

  [`${ComboActions.getCurrentPlanSuccess}`](state, action) {
    return {
      ...state,
      currentPlan: action.payload,
      selectedPlan: action.payload,
    };
  },

  [`${ComboActions.updatePlanFields}`](state, action) {
    const { fields } = action.payload;
    const propKey = Object.keys(fields)[0];
    const value = fields[propKey].value;

    if (propKey === 'plan_id') {
      const plan = state.plans.find(p => p.id === value);
      return {
        ...state,
        selectedPlan: {
          ...state.selectedPlan,
          plan_id: plan.id,
          name: plan.name,
          slug: plan.slug,
          price: plan.price,
          plan,
        },
      };
    }

    return {
      ...state,
      selectedPlan: {
        ...state.selectedPlan,
        [propKey]: value,
      },
    };
  },

  [`${ComboActions.updatePlanCosts}`](state, action) {
    const { costs, balance } = action.payload;
    const balanceCosts = parseFloat(costs) > parseFloat(balance) ? balance : costs;
    const thirdPay = parseFloat(costs) - parseFloat(balanceCosts);
    const thirdPayCosts = `${thirdPay}`;
    let nextBtnDisabled = true;

    if (parseInt(costs, 10) !== 0) {
      nextBtnDisabled = false;
    }

    return {
      ...state,
      planCosts: costs,
      balanceCosts,
      thirdPayCosts,
      nextBtnDisabled,
    };
  },

  [`${ComboActions.toStep}`](state, action) {
    return {
      ...state,
      currentStep: action.payload,
    };
  },

  [`${ComboActions.togglePayWithBalance}`](state, action) {
    const { isWithBalance, balance } = action.payload;

    if (isWithBalance) {
      const balanceN = parseFloat(balance);
      const balanceCosts = parseFloat(state.planCosts) >= balanceN ? balance : state.planCosts;

      return {
        ...state,
        balanceCosts,
        payWithBalance: isWithBalance,
      };
    }

    return {
      ...state,
      balanceCosts: '0',
      payWithBalance: isWithBalance,
    };
  },

  [`${ComboActions.updateBalanceCosts}`](state, action) {
    const value = parseFloat(action.payload).toFixed(2);
    const prevPlanCosts = parseFloat(state.planCosts).toFixed(2);

    const balanceCosts = `${value}`;
    const thirdPay = prevPlanCosts - value + parseFloat(state.thirdPayCosts).toFixed(2);
    const thirdPayCosts = `${thirdPay.toFixed(2)}`;

    return {
      ...state,
      balanceCosts,
      thirdPayCosts,
    };
  },
}, {
  plans: [],
  currentPlan: {},
  selectedPlan: {
    agent_num: 0,
    year: new Date().getFullYear(),
  },
  planCosts: '0.00',
  nextBtnDisabled: true,
  currentStep: 0,
  payWithBalance: true,
  balanceCosts: '0',
  thirdPayCosts: '0',
});

export default combo;
