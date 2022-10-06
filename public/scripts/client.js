/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

$(document).ready(function () {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };


  // returning a tweet <article> element containing the entire HTML structure of the tweet
  const createTweetElement = function (tweet) {
    let time = timeago.format(tweet.created_at);
    const safeHTML = escape(tweet.content.text);
    let $tweet = $(`<article class="tweet">
  <header>
    <div class="profile"><img src="${tweet.user.avatars}" width="50px" height="50px"> &nbsp;${tweet.user.name}</div>
    <div class="at-userid">${tweet.user.handle}</div>
  </header>
  <article class="usertweet">
    ${safeHTML}
  </article>
  <footer>
    <div>${time}</div>
    <div>
      <i class="fa-solid fa-flag iconoption"></i> &nbsp;
      <i class="fa-solid fa-retweet iconoption"></i> &nbsp;
      <i class="fa-solid fa-heart iconoption"></i>'
    </div>
  </footer>
  </article>`);
    return $tweet;
  }

  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    const $tweetsContainer = $('#tweets-container');
    $tweetsContainer.empty();
    for (let t of tweets) {
      const $tweet = createTweetElement(t);
      $('#tweets-container').prepend($tweet);
    }
  }

  const $form = $('#tweet-form');
  $form.on('submit', function (event) {
    event.preventDefault();
    const serializedData = $(event.target).serialize();

    if (serializedData.length - 5 === 0) {
      return alert("tweet should not be empty");
    } else if (serializedData.length - 5 > 140) {
      return alert("tweet length should not exceed 140 chars");
    }

    $.post('/tweets', serializedData, response => {
      console.log(response)
      loadTweets();
    });
  });

  const loadTweets = function (tweets) {
    $.getJSON('/tweets', function (data) {
      renderTweets(data);
    });
  }

  loadTweets();
});