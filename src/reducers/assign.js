import { handleActions } from 'redux-actions';
import { updateAssignFields, getAssignSuccess } from 'actions/assign';

const assign = handleActions({
  [`${getAssignSuccess}`](state, action) {
    return {
      ...state,
      ...action.payload,
    };
  },

  [`${updateAssignFields}`](state, action) {
    const { fields, extraAssign } = action.payload;
    const propKey = Object.keys(fields)[0];

    if (propKey.indexOf('.') > -1) {
      const itemKeyArray = propKey.split('.');
      const value = fields[propKey].value;
      const name = itemKeyArray[0];
      const index = Number(itemKeyArray[1]);
      const key = itemKeyArray[2];

      if (name.slice(-1) === 's') {
        const itemName = name.slice(0, name.length - 1);
        let result = [];

        /**
         * 如果网站，微信等是第一次添加分组
         * 则在已有分组的数组里新增
         * 否则直接更新那个网站或者微信
         */
        if (index === state[itemName].length) {
          result = [
            ...state[itemName],
            ...[{
              [`${itemName}_id`]: extraAssign[itemName][index][`${itemName}_id`],
              [key]: value,
            }],
          ];
        } else {
          result = state[itemName].map((item, i) => {
            if (i === index) {
              return {
                ...item,
                [key]: value,
              };
            }

            return item;
          });
        }

        return {
          ...state,
          [itemName]: result,
        };
      }
    }

    return {
      ...state,
      [propKey]: fields[propKey].value,
    };
  },
}, {
  web: [],
  wechat: [],
  weibo: [],
  voip: [],
  mail: [],
  web_rule: [],
  newRuleUrl: '',
  newRuleGroupIds: [],
});

export default assign;
