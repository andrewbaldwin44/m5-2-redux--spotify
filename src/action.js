export const requestAccessToken = () => ({
  type: "REQUEST_ACCESS_TOKEN",
});

export const receiveAccessToken = token => ({
  type: "RECEIVE_ACCESS_TOKEN",
  token,
});

export const receiveAccessTokenError = () => ({
  type: "RECEIVE_ACCESS_TOKEN_ERROR",
});

export const requestAllArtistInfo = () => ({
  type: "REQUEST_ALL_ARTIST_INFO",
});

export const receiveArtistProfile = profile => ({
  type: "RECEIVE_ARTIST_PROFILE",
  profile,
});

export const receiveTopTracks = tracks => ({
  type: "RECEIVE_TOP_TRACKS",
  tracks,
});

export const receiveAllArtistInfo = () => ({
  type: "RECEIVE_ALL_ARTIST_INFO"
});

export const receiveArtistInfoError = () => ({
  type: "RECEIVE_ARTIST_INFO_ERROR",
});
