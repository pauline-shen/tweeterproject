/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const data = [
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
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

// returning a tweet <article> element containing the entire HTML structure of the tweet
  const createTweetElement = function (tweet) {
    let $tweet = $(`<article class="tweet">
  <header>
    <div class="profile"><img src="${tweet.user.avatars}" width="50px" height="50px"> &nbsp;${tweet.user.name}</div>
    <div class="at-userid">${tweet.user.handle}</div>
  </header>
  <article class="usertweet">
    ${tweet.content.text}
  </article>
  <footer>
    <div>${tweet.created_at}</div>
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
    for (let t of tweets) {
      const $tweet = createTweetElement(t);
      $('#tweets-container').append($tweet);
    }
  }

  renderTweets(data);
});