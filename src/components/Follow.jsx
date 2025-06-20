import axios from "axios";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

function Follow() {
  const store = useSelector((store) => store);
  const params = useParams();

  const handleClick = async () => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_URL}api/users/${params.username}`,
      });

      await axios({
        method: "POST",
        url: `${process.env.REACT_APP_URL}api/users/follow/${response.data._id}`,
        headers: { Authorization: `Bearer ${store.user.accessToken}` },
      });
    } catch (error) {
      return alert("Sorry something went wrong, please try again later");
    }
  };

  return (
    <div>
      <span
        className="btn btn-dark rounded-pill mt-0"
        tabIndex={1}
        onClick={() => {
          handleClick();
        }}
      >
        Follow
      </span>
    </div>
  );
}

export default Follow;
