import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unlike, like } from "../store/actions";

function Like({ tweet, user }) {
  const distpatch = useDispatch();
  const navigate = useNavigate();
  const handleLike = async () => {
    if (!user) {
      navigate("/");
    } else {
      if (tweet.likes.includes(user.id)) {
        try {
          await axios({
            method: "DELETE",
            url: `${process.env.REACT_APP_URL}api/tweets/like/${tweet._id}`,
            headers: { Authorization: `Bearer ${user.accessToken}` },
          });
          distpatch(unlike(tweet, user));
        } catch (error) {
          return alert("Sorry something went wrong, please try again later");
        }
      } else {
        try {
          await axios({
            method: "POST",
            url: `${process.env.REACT_APP_URL}api/tweets/like/${tweet._id}`,
            headers: { Authorization: `Bearer ${user.accessToken}` },
          });
          distpatch(like(tweet, user));
        } catch (error) {
          return alert("Sorry something went wrong, please try again later");
        }
      }
    }
  };
  return (
    <button
      onClick={handleLike}
      className="btn-transparent d-flex flex-row justify-content-between align-items-center"
      type="submit"
    >
      <span className="d-flex align-items-center justify-content-center icons like">
        <i
          className={` fa-heart ${
            tweet.likes.includes(user?.id) ? "fa-solid red-heart" : "fa-regular"
          }`}
        ></i>
      </span>
      <span className="fs-8 icons-number">{tweet.likes.length}</span>
    </button>
  );
}

export default Like;
