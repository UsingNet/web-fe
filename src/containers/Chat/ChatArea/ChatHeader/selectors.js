import { createSelector } from 'reselect';

const getMeId = state => state.me.id;
const getAgents = state => state.agents.agents;

export const getAgentsWithoutMe = createSelector(
  [getMeId, getAgents],
  (meId, agents) => agents.filter(agent => agent.id !== meId)
);
