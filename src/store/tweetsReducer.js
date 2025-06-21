function tweetsReducer(state = [], action) {
  switch (action.type) {
    case "UPDATE_TWEETS":
      return action.payload.tweets;

    case "STORE_TWEET":
      return [action.payload.tweet, ...state];

    case "REMOVE_TWEET":
      return state.filter((tweet) => tweet._id !== action.payload.tweet._id);

    case "LIKE":
      return state.map((tweet) => {
        if (tweet._id !== action.payload.tweet._id) return tweet;
        return {
          ...tweet,
          likes: [...tweet.likes, action.payload.user.id],
        };
      });

    case "UNLIKE":
      return state.map((tweet) => {
        if (tweet._id !== action.payload.tweet._id) return tweet;
        return {
          ...tweet,
          likes: tweet.likes.filter((like) => like !== action.payload.user.id),
        };
      });

    default:
      return state;
  }
}
export default tweetsReducer;
