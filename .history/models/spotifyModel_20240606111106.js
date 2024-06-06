onst SpotifyWebApi = require('spotify-web-api-node');
const { clientId, clientSecret } = require('../config/spotifyConfig');

// Cấu hình Spotify API
const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
  clientSecret: clientSecret
});

// Lấy Access Token
spotifyApi.clientCredentialsGrant().then(
  data => {
    console.log('The access token is ' + data.body['access_token']);
    spotifyApi.setAccessToken(data.body['access_token']);
  },
  err => {
    console.log('Something went wrong when retrieving an access token', err);
  }
);

module.exports = spotifyApi;
