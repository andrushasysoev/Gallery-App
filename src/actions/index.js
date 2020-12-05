export const loadPhotos = (photos) => {
  return {
    type: "LOAD_PHOTOS",
    photos,
  };
};

export const getUserName = (user) => {
  return {
    type: "GET_USERNAME",
    user,
  };
};

export const getPhoto = (photo) => {
  return {
    type: "GET_PHOTO",
    photo,
  };
};

export const likePhoto = (photo) => {
  return {
    type: "LIKE_PHOTO",
    id: photo.id,
    likes: photo.likes,
  };
};

export const unlikePhoto = (photo) => {
  return {
    type: "UNLIKE_PHOTO",
    id: photo.id,
    likes: photo.likes,
  };
};