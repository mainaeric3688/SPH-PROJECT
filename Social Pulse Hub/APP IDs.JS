ISTAGRAM(){
    const instagramAppId = '491404200043534';
    const instagramRedirectUri = 'http://localhost/3000'; 
    const instagramAppSecret = 'ffabfbaea9c9889ee403c395352f882c';
}
FACEBOOK(){
     appId      : '2486182024914560'

}


// Instagram App Credentials
const instagramAppId = '491404200043534';
const instagramRedirectUri = 'http://localhost/3000'; 
const instagramAppSecret = 'ffabfbaea9c9889ee403c395352f882c';

// Instagram API URLs
const instagramAuthUrl = `https://api.instagram.com/oauth/authorize?client_id=
${instagramAppId}&redirect_uri=${encodeURIComponent(instagramRedirectUri)}
&scope=user_profile,user_media&response_type=code`;

// Event listener for Instagram login button
document.getElementById('instagram-login').addEventListener('click', function() {
  // Open Instagram login popup or redirect to Instagram login page
  window.location.href = instagramAuthUrl;
});

// Function to handle Instagram login callback
function handleInstagramLoginCallback() {
  // Parse code from URL query parameters (after redirect from Instagram)
  const code = new URLSearchParams(window.location.search).get('code');

  // Exchange code for access token
  fetch(`https://api.instagram.com/oauth/access_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `client_id=${instagramAppId}&client_secret=${instagramAppSecret}&code=${code}&grant_type=authorization_code&redirect_uri=${encodeURIComponent(instagramRedirectUri)}`
  })
    .then(response => response.json())
    .then(data => {
      const { access_token } = data;

     //access token to fetch user's media
      fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url&access_token=${access_token}`)
        .then(response => response.json())
        .then(feedData => {
          // Display fetched data in the insights element
          const insightsElement = document.querySelector('.display-insights');
          insightsElement.innerHTML = ''; // Clear previous content
          feedData.data.forEach(post => {
            const postElement = document.createElement('div');
            postElement.innerHTML = `<img src="${post.media_url}" alt="${post.caption}" />`;
            insightsElement.appendChild(postElement);
          });
        })
        .catch(error => console.error('Error fetching Instagram feed:', error));
    })
    .catch(error => console.error('Error exchanging code for access token:', error));
}

// Call handleInstagramLoginCallback when the user returns from Instagram login
if (window.location.search.includes('code=')) {
  handleInstagramLoginCallback();
}

