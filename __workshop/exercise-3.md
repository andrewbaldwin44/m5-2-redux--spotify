# Exercise 3: Server setup

We have a Node server that exists to connect to Spotify and produce an access token for the client.

If you open `server/server.js`, you'll see that we have an express endpoint, `app.get('/spotify_access_token')`. We'll want to hit this endpoint from our client.

For now, let's test using Insomnia. The server runs on port 5678, so you can make a GET request to `localhost:5678/spotify_access_token`. For now, you should get the following response:

```
{ todo: true }
```

As a stretch, see if you can work out how to complete this endpoint, given the following pieces of information:

1. Spotify's documentation can be found here: https://developer.spotify.com/documentation/general/guides/authorization-guide/#client-credentials-flow

- Be sure to read the instructions for "Client Credentials flow". Ignore the other flows

2. You can use `isomorphic-fetch`, an NPM package installed to this project, to use the familiar `fetch` API in Node.js. Import the package, and you'll be able to use fetch normally:

- `const fetch = require('isomorphic-fetch')`

3. You'll want to send the following headers:

```
{
  'Authorization': `Basic ${authString}`,
  'Content-Type': 'application/x-www-form-urlencoded',
};
```

We have given you the `authString` already, which uses a trick called "Base64 Encoding" to mask the secret. You are not expected to know anything about this line; you can research it if curious, but it is sufficient to know that it's a required transformation for security purposes.

Spend between 5-10 minutes seeing if you can combine these pieces into an endpoint that returns the access token when you make a request to the server with Insomnia.

> 🆘 **Do this on your own. If you are stuck, you can look at this [hint](../_hints/hint-1.md).**
