// app.js
document.getElementById('instagram-link').addEventListener('click', displayInstagramLogin);

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