import user_types from "../type/user";

const initital_value = {
  id: "",
  fullname: "",
  email: "",
  username: "",
};

const UserReducer = (state = initital_value, action) => {
  if (action.type === user_types.LOGIN_USER) {
    return {
      ...state,
      id: action?.payload?.id,
      fullname: action?.payload?.fullname,
      email: action?.payload?.email,
      username: action?.payload?.username,
    };
  } else if (action.type === user_types.LOGOUT_USER) {
    return initital_value;
  }

  return state;
};

export default UserReducer;
