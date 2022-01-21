export const TEAM_ACTIONS = {
  ADD: "ADD",
  REMOVE: "REMOVE",
};
export const teamReducer = (state, action) => {
  const { type, payload } = action;
  const { ADD, REMOVE } = TEAM_ACTIONS;
  switch (type) {
    case ADD:
      return [...state, payload];
    case REMOVE:
      return state.filter((hero) => hero.id !== payload.id);
    default:
      return state;
  }
};
