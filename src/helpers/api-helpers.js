export function fetchArtistInfo(token, artistId, infoType = '') {
  const options = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const url = `https://api.spotify.com/v1/artists/${artistId}/${infoType}`;

  return fetch(url, options).then(response => response.json());
}
