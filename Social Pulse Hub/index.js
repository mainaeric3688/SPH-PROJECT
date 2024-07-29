const express = require('express');
const session = require('express-session');
const { TwitterApi } = require('twitter-api-v2');
const app = express();
const port = 3000;

// Twitter API credentials
const client = new TwitterApi({
    appKey: 'q98xHxwlICeuWZxzVPcNEuqut',
    appSecret: 'rZFEIQ8TcnfGuoXgs0z582bn5aKVExxXjZG4s2ISIo3dkYYLAE',
    accessToken: '1573370459374108673-GdDENJJhI98rD40NtcGNOvxHb5ZJXo',
    accessSecret: '6CjRe3LIB6TcXzZYxOwkwzkiSd5jklCtEQsBt9VPi6nIr',
});

// Set up session
app.use(session({
    secret: 'your-secret',
    resave: false,
    saveUninitialized: true,
}));

// Endpoint to generate OAuth URL
app.get('/auth/twitter/url', (req, res) => {
    const { url, codeVerifier, state } = client.generateOAuth2AuthLink('http://localhost:3000/auth/twitter/callback', {
        scope: ['tweet.read', 'tweet.write', 'users.read'],
    });
    req.session.codeVerifier = codeVerifier;
    req.session.state = state;
    res.json({ url });
});

// Callback route
app.get('/auth/twitter/callback', async (req, res) => {
    try {
        const { code } = req.query;
        const { client: loggedClient } = await client.loginWithOAuth2({
            code,
            codeVerifier: req.session.codeVerifier,
            state: req.session.state,
        });
        req.session.accessToken = loggedClient.accessToken;
        req.session.accessSecret = loggedClient.accessSecret;
        res.send('Login successful!');
    } catch (error) {
        res.send('Authentication failed');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
