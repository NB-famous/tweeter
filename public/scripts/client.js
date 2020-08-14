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


  function createTweetElement(tweetObj){

     let $tweetBox = $("<article>").addClass("client-tweet");

    const html =
    `
    <div class="tweet_container">
    <header class='tweet_icon'>
        <img class='man-icon'src="${tweetObj.user.avatars}">
        <span class='icon-name'>${tweetObj.user.name}</span>
        <span class='icon-handle'>${tweetObj.user.handle}</span>
        
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
        <label class='last-post'>
          <span>Tweeted ${getTime(tweetObj.created_at)}</span>
        </label>
        <span class="wordIcon">
        </span>
      </footer>
    </div>
  </div><br>
  
  `
    $tweetBox = $tweetBox.append(html);

    return $tweetBox;

};

function forgotWarning(msg){

 let label = `
 <div class='forgotLabel' style='text-align:center'>
  <i class='fas fa-exclamation-triangle'/>${msg}
  <i class='fas fa-exclamation-triangle'/>
 </div>`; 

 $('.new-tweet').prepend(label);

 setTimeout(function(){

  return $('.forgotLabel').fadeOut();

 }, 1000);


}

function longWarning(msg){

  let label = `
  <div class='longLabel' style='text-align:center'>
   <i class='fas fa-exclamation-triangle'/>${msg}
   <i class='fas fa-exclamation-triangle'/>
  </div>`;

  $('.new-tweet').prepend(label);

  setTimeout(function(){

    return $('.longLabel').fadeOut();
  
   }, 1000);
}


  function renderTweets(tweets) {

    let $html = $('<div></div>');
    tweets.forEach((tweet)=> {
      let newtweet = createTweetElement(tweet);
      $html.prepend(newtweet);
    })
    $("#tweets-container").html($html);
  }




function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: "json",
    success: function (data) {
    console.log('Success: ', data);
    renderTweets(data);
    }
  });
}


function tweetSubmit(event) {

  console.log('performing ajax call...');

  event.preventDefault();

  let myTweet = $(this).serialize();
  let contentArea = $('#tweet-text').val();


  if(contentArea === ''){
    //return alert('You forgot to tweet anything.....');

    return forgotWarning(' You forgot to Tweet anything ');
    

  } else if(contentArea.length > 140){
    //return alert('Cannot post this. Tweet is to long......')
    return longWarning(' Cannot post this! Tweet is to long ');
  } else{

    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: myTweet 
    }).done(function(data) {
      $('#tweet-text').val('');
      $('#wordCount').html(140);

      console.log('success!!!');

      loadTweets();

    });
  }
}

function getTime(postedTime) {
  const currentTime = Date.now();
  const Seconds = (currentTime - postedTime) / 1000;
  const Minutes = (currentTime - postedTime) / 1000 / 60;
  const Hours = (currentTime - postedTime) / 1000 / 60 / 60;

  if(Math.floor(Seconds) === 0){
    return `just now...`;
  }else if(Minutes < 1) {
    return `${Math.floor(Seconds)} seconds ago`;
  }else if(Minutes > 1 && Minutes < 60) {
    return `${Math.floor(Minutes)} minutes ago`;
  } else if (Minutes > 60 && Hours < 24) {
    return `${Math.floor(Hours)} hours ago`;
  } else if (Hours > 24) {
    return `${Math.floor(Hours / 24)} days ago`;
  }
}

function hoverBox(){

  const hover = `<i class="fas fa-flag"></i>
  <i class="fas fa-retweet"></i>
  <i class="fas fa-grin-hearts"></i>`

  let $hov = $('span.wordIcon').append(hover);

  return $hov;

}




  $(document).ready(function() {

    loadTweets();

    $('#compose').on('submit', tweetSubmit);



    $('#tweets-container').on('mouseenter','.tweet_container', function() {

      console.log('in handler')
       //$('.client-tweet').addClass('wordIcon');
       hoverBox().fadeIn();
       console.log("this is pointed");
    });

     $('#tweets-container').on('mouseleave','.tweet_container', function() {
        console.log('hello')
        //$('span.wordIcon').html('')
        hoverBox().empty();
  
      });

    console.log('submit is successful');


    $("#scrollUp").click(function(){
      $("#head-container").slideToggle("fast", function (){});
    });


  });