const initialState = {};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SAVE_AllCompany":
      return { ...state, AllCompany: payload };
    default:
      return state;
  }
};
