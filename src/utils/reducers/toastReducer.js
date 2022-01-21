export const TOAST_ACTIONS = {
  ADD: "ADD",
  REMOVE: "REMOVE",
};

export const toastReducer = (state, action) => {
  const { type, payload } = action;
  const { ADD, REMOVE } = TOAST_ACTIONS;
  switch (type) {
    case ADD:
      return [
        ...state,
        {
          id: Date.now(),
          title: payload.title,
          message: payload.message,
        },
      ];
    case REMOVE:
      return state.filter((toast) => toast.id !== payload.id);
    default:
      return state;
  }
};
