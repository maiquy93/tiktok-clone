export const loginStateCreator = data => {
  return {
    type: "switchLoginState",
    payload: data,
  };
};
export const updateUserdataCreator = data => {
  return {
    type: "updateUserdata",
    payload: data,
  };
};
export const cmtRefeshCreator = data => {
  return {
    type: "cmtRefesh",
    payload: data,
  };
};
