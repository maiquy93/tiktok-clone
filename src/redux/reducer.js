// localStorage.setItem("isLogin", JSON.stringify(false));
const newdata = JSON.parse(localStorage.getItem("userdata")) || {};
const initState = {
  loginState: {
    value: JSON.parse(localStorage.getItem("isLogin")) || false,
  },
  userdata: {
    name: newdata.name,
    avatar: newdata.avatar,
    username: newdata.username,
    check: newdata.check,
    uid: newdata.uid,
    nickname: newdata.nickname,
    userbackground: newdata.userbackground,
    createdAt: newdata.createdAt,
  },
};
const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "switchLoginState":
      return {
        ...state,
        loginState: {
          value: action.payload,
        },
      };
    case "updateUserdata":
      return {
        ...state,
        userdata: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
