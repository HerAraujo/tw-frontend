import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeTweet } from "../store/actions";
import Like from "./Like";
import "./Tweet.css";

function Tweet({ tweet }) {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const deleteTweet = async () => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${process.env.REACT_APP_URL}api/tweets/${tweet._id}`,
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      console.log(response);
      dispatch(removeTweet(tweet));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row tweet-card p-4">
      <div className="col-xs-5 col-2 p-0">
        <img
          className="user-photo"
          src={tweet.author.profileImage}
          alt="user"
        />
      </div>

      <div className="col-xs-7 col-10">
        <div className="d-flex justify-content-between">
          <div>
            <a
              className="text-decoration-none d-flex flex-wrap justify-content-start"
              href={`/${tweet.author.username}`}
            >
              <h3 className="d-inline-block fs-6 me-2 text-dark">
                {tweet.author.firstname} {tweet.author.lastname}
              </h3>
              <p className="d-inline-block text-muted fs-6">
                @{tweet.author.username}
              </p>
            </a>
          </div>
          <div>
            {tweet.author.username === user?.username && (
              <button
                onClick={deleteTweet}
                className="btn btn-outline-muted text-muted"
                type="submit"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
        </div>
        <p className="text-start">{tweet.content}</p>
        <div className="d-flex justify-content-between">
          <span
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Lo sentimos, esta funcionalidad escapa del alcance de nuestro proyecto"
            className="d-flex align-items-center justify-content-center icons comment"
          >
            <i className="fa-regular fa-comment"></i>
          </span>
          <span
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Lo sentimos, esta funcionalidad escapa del alcance de nuestro proyecto"
            className="d-flex align-items-center justify-content-center icons retweet"
          >
            <i className="fa-solid fa-retweet"></i>
          </span>
          <Like tweet={tweet} user={user} />
          <span
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Lo sentimos, esta funcionalidad escapa del alcance de nuestro proyecto"
            className="d-flex align-items-center justify-content-center icons share"
          >
            <i className="fa-solid fa-arrow-up-from-bracket"></i>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
