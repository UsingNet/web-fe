import { createSelector } from 'reselect';

const getUserIds = state => {
  const userIds = state.agentGroup.editGroup.users.map(u => (u.id ? `${u.id}` : u));

  return userIds;
};

const getEditGroup = state => state.agentGroup.editGroup;

export const getEditGroupWithUsers = createSelector(
  [getUserIds, getEditGroup],
  (userIds, editGroup) => ({
    ...editGroup,
    users: userIds,
  })
);
