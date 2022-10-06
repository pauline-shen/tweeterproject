$(document).ready(function() {
  const tweet = document.getElementById("tweet-text");
  tweet.addEventListener("input", () => {
    const maxLen = 140;
    let len = this.getElementById("tweet-text").value.length;
    let c = this.getElementById("counter");
    c.value = maxLen - len;
    if (c.value >= 0) {
      document.getElementById("counter").className = "valid";
    } else { // changing counter to red
      document.getElementById("counter").className = "invalid";
    }
  });
});

