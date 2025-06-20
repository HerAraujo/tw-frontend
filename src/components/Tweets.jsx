import Tweet from "./Tweet";

function Tweets({ tweets }) {
  return (
    <>
      {tweets &&
        tweets.map((tweet) => {
          return <Tweet key={tweet._id} tweet={tweet} />;
        })}
    </>
  );
}

export default Tweets;
