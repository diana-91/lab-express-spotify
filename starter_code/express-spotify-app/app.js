var SpotifyWebApi = require('spotify-web-api-node');
const express = require('express');
const app = express();
const bodyParse = require('body-parser');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');

app.use(bodyParse.json());
app.use(bodyParse.urlencoded({extended: true}));
app.set('views', __diname + '/views');
app.set('view engine','ejs');

// Remember to paste here your credentials
var clientId = '1c30624cba6742dcb792991caecae571',
    clientSecret = '746977b1e77240faa9d0d2411c3e0efe';

var spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});

// Retrieve an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err);
});

app.get('/', (req, res, next) => {
  res.render('index');
});

app.post('artist', (req, res, next) =>{
  res.render(req.body.artist);
});

app.listen(3000, console.log('server started'));
