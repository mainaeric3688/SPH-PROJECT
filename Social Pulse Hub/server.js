const express = require('express');
const Twitter = require('twitter');
const session = require('express-session');

const app = express();

app.use(session({
    secret: '****',
    resave: false,
    saveUninitialized: true
}));

const twitterClient = new Twitter({
    consumer_key: 'q98xHxwlICeuWZxzVPcNEuqut',
    consumer_secret: 'rZFEIQ8TcnfGuoXgs0z582bn5aKVExxXjZG4s2ISIo3dkYYLAE',
    access_token_key: '1573370459374108673-GdDENJJhI98rD40NtcGNOvxHb5ZJXo',
    access_token_secret: '6CjRe3LIB6TcXzZYxOwkwzkiSd5jklCtEQsBt9VPi6nIr'
});

app.get('/login', (req, res) => {
    // Get the OAuth request token
    twitterClient.getRequestToken((error, requestToken, requestTokenSecret) => {
        if (error) {
            res.status(500).send(error);
        } else {
            req.session.requestToken = requestToken;
            req.session.requestTokenSecret = requestTokenSecret;
            res.redirect(`https://api.twitter.com/oauth/authenticate?oauth_token=${requestToken}`);
        }
    });
});

app.get('/callback', (req, res) => {
    const { oauth_token, oauth_verifier } = req.query;
    const { requestToken, requestTokenSecret } = req.session;

    twitterClient.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, (error, accessToken, accessTokenSecret) => {
        if (error) {
            res.status(500).send(error);
        } else {
            req.session.accessToken = accessToken;
            req.session.accessTokenSecret = accessTokenSecret;
            res.redirect('/profile');
        }
    });
});

app.get('/profile', (req, res) => {
    const { accessToken, accessTokenSecret } = req.session;

    twitterClient.get('account/verify_credentials', {
        access_token_key: accessToken,
        access_token_secret: accessTokenSecret
    }, (error, profile) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.json(profile);
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});