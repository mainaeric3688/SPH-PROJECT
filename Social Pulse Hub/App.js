// Initialize the Facebook SDK
window.fbAsyncInit = function() {
    FB.init({
        appId: '2486182024914560', // Replace with your Facebook app ID
        cookie: true,
        xfbml: true,
        version: 'v10.0'
    });

    FB.AppEvents.logPageView();
};

// Load the Facebook SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Handle Facebook login
document.getElementById('facebook-login').addEventListener('click', function() {
    // Display a message or a placeholder UI in the root div
    document.querySelector('.root').innerHTML = '<p>Logging you in, please wait...</p>';

    // Perform Facebook login
    FB.login(function(response) {
        if (response.authResponse) {
            console.log('Welcome! Fetching your information.... ');
            fetchFacebookFeed();
        } else {
            console.log('User cancelled login or did not fully authorize.');
            document.querySelector('.root').innerHTML = '<p>Login cancelled or not authorized.</p>';
        }
    }, { scope: 'public_profile,email,user_posts' });
});

// Fetch and display Facebook feed
function fetchFacebookFeed() {
    FB.api('/me/feed', function(response) {
        if (response && !response.error) {
            displayFeed(response.data);
        } else {
            console.error('Error fetching feed:', response.error);
            document.querySelector('.root').innerHTML = '<p>Error fetching feed. Please try again later.</p>';
        }
    });
}

// Display the Facebook feed in the root div
function displayFeed(feedData) {
    const rootDiv = document.querySelector('.root');
    rootDiv.innerHTML = ''; // Clear any existing content
    if (feedData.length > 0) {
        feedData.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.innerHTML = `<p>${post.message || 'No message'}</p>`;
            rootDiv.appendChild(postDiv);
        });
    } else {
        rootDiv.innerHTML = '<p>No posts found.</p>';
    }
}
function displayInsights(insightsData) {
    const rootDiv = document.querySelector('.root');
    rootDiv.innerHTML = ''; // Clear any existing content

    if (insightsData.length > 0) {
        insightsData.forEach(insight => {
            const insightDiv = document.createElement('div');
            insightDiv.innerHTML = `
                <h3>${insight.title}</h3>
                <p>${insight.description}</p>
                <p>${insight.value}</p>
            `;
            rootDiv.appendChild(insightDiv);
        });
    } else {
        rootDiv.innerHTML = '<p>No insights found.</p>';
    }
}
