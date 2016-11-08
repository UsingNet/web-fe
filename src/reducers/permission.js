import { handleActions } from 'redux-actions';
import { getPermissionSuccess, updatePermission } from 'actions/permission';

const permission = handleActions({
  [`${getPermissionSuccess}`](state, action) {
    return {
      ...state,
      permissions: action.payload,
    };
  },

  [`${updatePermission}`](state, action) {
    const { p, checked } = action.payload;
    return {
      ...state,
      permissions: state.permissions.map(pm => {
        if (pm.id === p.id) {
          return {
            ...pm,
            used: checked,
          };
        }

        return pm;
      }),
    };
  },
}, {
  permissions: [],
});

export default permission;
