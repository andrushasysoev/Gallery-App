const initialState = {
    username: "Anonymous"
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERNAME":
      return action.user;
          
    default:
      return state;
  }
};

export default user;