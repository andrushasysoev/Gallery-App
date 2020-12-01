import Unsplash, { toJson } from "unsplash-js";

export const unsplash = new Unsplash({
  accessKey: "f60KlEClDfDpIHtoobmqEeGJH1ru4FPH-5-ECoF8wMg",
  secret: "4gH5j7pd30fa60npPqB2X8EEIK3BQP-UsTuJBEFyfGY",
  callbackUrl: "http://metayuoi.ru/photos",
});

export const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "write_likes",
]);

export const userAccessToken = (OAUTH_CODE) => {
  unsplash.auth
    .userAuthentication(OAUTH_CODE)
    .then(toJson)
    .then((json) => {
      localStorage.setItem("token", json.access_token);
    });
};

export const unsplashLoadPhotos = (page, token) => {
  unsplash.auth.setBearerToken(token);

  return unsplash.photos.listPhotos(page, 10, "latest").then(toJson);
};

export const unsplashLikePhoto = (id, token) => {
  unsplash.auth.setBearerToken(token);
  unsplash.photos.likePhoto(id);
};

export const unsplashUnlikePhoto = (id, token) => {
  unsplash.auth.setBearerToken(token);
  unsplash.photos.unlikePhoto(id);
};