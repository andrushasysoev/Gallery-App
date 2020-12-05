const currentPhoto = (state = { links: {}, user: {}, urls: { small: "" } }, action) => {
  switch (action.type) {
    case "GET_PHOTO":
      return action.photo;
          
    case "LIKE_PHOTO":
      return {...state, likes: action.likes, liked_by_user: true}
    
    case "UNLIKE_PHOTO":
      return {...state, likes: action.likes, liked_by_user: false}
          
    default:
      return state;
  }
};

export default currentPhoto;