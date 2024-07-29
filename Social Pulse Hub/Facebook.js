document.getElementById('facebook-link').addEventListener('click', displayFacebookLogin);
function displayFacebookLogin(event) {
    event.preventDefault();

    const root = document.querySelector('#root');
    root.innerHTML = `
        <div class="facebook-content">
            <h1 id="fb"><img src="facebook_5968764.png" class="fab fa-facebook"></i>facebook</h1>
        </div>
        <div id="status">
         <button id="facebook-login">Login with Facebook</button>
        <img src="Snap-2012-11-02-at-13.31.23.jpg" alt="facebook feed">
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


    document.querySelector('#facebook-login').addEventListener('click', handleFacebookLogin);
}

function handleFacebookLogin() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}
window.fbAsyncInit = function() {
    FB.init({
        appId      : '2486182024914560', 
        cookie     : true,
        xfbml      : true,
        version    : 'v12.0'
    });

    FB.AppEvents.logPageView();   
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        console.log('User is logged in and authenticated.');
        // You can make API calls here or fetch user data
        FB.api('/me', function(response) {
            console.log('Successful login for: ' + response.name);
        });
    } else {
        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                    console.log('Good to see you, ' + response.name + '.');
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'public_profile,email'});
    }
}