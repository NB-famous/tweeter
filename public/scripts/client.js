/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

/* const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ] */


let createTweetElement = (tweetObj) => {

    const html =
    `
    <div class="tweet_container">

    <header class='tweet_icon'>
        <img class='man-icon'src="/images/man.png">
        <span class='icon-name'>${tweetObj.user.name}</span>
    </header>
    <div class='client-text'>
        <p>
            ${tweetObj.content.text}
        </p>
    </div>
    <br>
    <hr class='myLine'>
    <div>
      <footer class='footer_icon'>
        <label for='last-post'><span>days</span></label>
        <span id="wordIcon">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-grin-hearts"></i>
        </span>
      </footer>
    </div>
  </div><br>
  
  `

    let place = $('article.client-tweet').append(html);

    return place;


}


function renderTweets(tweets) {
    tweets.forEach(function(tweet) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    });
  }


  function handleSubmit(event) {

    console.log('Button clicked, performing ajax call...');

    event.preventDefault();

    let queryStr = $(this).serialize();

    let textAreaContent = $('#tweet-text').val();
  
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: queryStr 
      }).done(function(data) {
        $('#tweet-text').val('');
        $('#wordCount').html(140);
        console.log('the ajax request is successfull');
      });
    
  }


  $(document).ready(function() {
    $('#compose').on('submit', handleSubmit);

    console.log('submit is successful');
  });
