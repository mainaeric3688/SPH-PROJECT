// app.js
document.querySelector('#instagram-link').addEventListener('click', displayInstagramLogin);

function displayInstagramLogin(event) {
    event.preventDefault();

    const root = document.querySelector('#root');
    root.innerHTML = `

        <div class="Instagram-content">
            <h1 id="ig"><img src="instagram_3955024.png" class="fab fa-instagram"></i>Instagram</h1>
        </div>
        <div id="status">
         <button id="instagram-login">Login with Instagram</button>
        <img src="Collage/instagram-feed-masonry-widget.jpg" alt="Instagram feed">
        </div>
        <div class="explore-more">
                        <div class="explore-txt">
                            <h1 id="explore-txt">Explore more <span>...</span></h1>
                        </div>
                            <div class="explore">   
                                <img src="Get like on your social media.jpeg" alt="Explore More">

                                <span id="span-txt"><h3>Streamline Your Social Universe!</h3>
                                <p>Mastering your accounts like true superhero 
                                    with ease.<br> Your account is as easy as summoning a lightning
                                    bolt. With<br> intuitive controls and clear navigation at your fingertips
                                </p>

                                </span>
                        </div>
        </div>
`;


    document.querySelector('#instagram-login').addEventListener('click', handleInstagramLogin);
}

function handleInstagramLogin() {
    const clientId = '491404200043534';
    const redirectUri = 'http://localhost:3000/auth/instagram/callback';
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`;

    window.open(authUrl, 'instagramLogin', 'width=600,height=700');
}

window.addEventListener('message', (event) => {
    if (event.origin !== 'http://localhost:3000') {
        return;
    }

    const { code } = event.data;

    if (code) {
        fetchAccessToken(code);
    }
});

async function fetchAccessToken(code) {
    const response = await fetch('https://api.instagram.com/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: '491404200043534',
            client_secret: 'ffabfbaea9c9889ee403c395352f882c',
            grant_type: 'authorization_code',
            redirect_uri: 'http://localhost:3000/auth/instagram/callback',
            code
        })
    });

    const data = await response.json();
    const accessToken = data.access_token;

    fetchUserData(accessToken);
}

async function fetchUserData(accessToken) {
    const response = await fetch(`https://graph.instagram.com/me?fields=id,username,account_type,media_count&access_token=${accessToken}`);
    const userData = await response.json();

    displayUserData(userData);
}

function displayUserData(userData) {
    const root = document.getElementById('root');
    root.innerHTML = `
        <h1>Welcome, ${userData.username}</h1>
        <p>Account Type: ${userData.account_type}</p>
        <p>Media Count: ${userData.media_count}</p>
    `;
}
