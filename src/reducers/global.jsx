const initialState = { isMobile: false, isTablet: false, RoleFunctionList: "" };

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "SAVE_isMobile":
      return { ...state, isMobile: payload };
    case "SAVE_isTablet":
      return { ...state, isTablet: payload };
    case "SAVE_Message":
      return { ...state, Message: payload };
    case "CLEAN_Message":
      return { ...state, CleanMessage: payload };
    case "SAVE_UserPid":
      return { ...state, UserPid: payload };
    case "SAVE_Marquee":
      return { ...state, Marquee: payload };
    case "SAVE_MenuState":
      return { ...state, MenuState: payload };
    default:
      return state;
  }
};
