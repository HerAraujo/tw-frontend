function userReducer(state = null, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        id: action.payload.user.id,
        accessToken: action.payload.user.accessToken,
        username: action.payload.user.username,
      };

    case "LOGOUT":
      return null;

    default:
      return state;
  }
}
export default userReducer;
