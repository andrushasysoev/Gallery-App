export const loadPhotos = (photos) => {
  return {
    type: "LOAD_PHOTOS",
    photos
  };
};

export const likePhoto = (id) => {
  return {
    type: "LIKE_PHOTO",
    id
  };
};

export const unlikePhoto = (id) => {
  return {
    type: "UNLIKE_PHOTO",
    id
  };
};
