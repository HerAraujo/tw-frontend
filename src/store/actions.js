function logIn(user) {
  return {
    type: "LOGIN",
    payload: { user },
  };
}
function updateTweets(tweets) {
  return {
    type: "UPDATE_TWEETS",
    payload: { tweets },
  };
}
function storeTweet(tweet) {
  return {
    type: "STORE_TWEET",
    payload: { tweet },
  };
}
function removeTweet(tweet) {
  return {
    type: "REMOVE_TWEET",
    payload: { tweet },
  };
}
function like(tweet, user) {
  return {
    type: "LIKE",
    payload: { tweet, user },
  };
}
function unlike(tweet, user) {
  return {
    type: "UNLIKE",
    payload: { tweet, user },
  };
}

export { logIn, updateTweets, storeTweet, removeTweet, like, unlike };
