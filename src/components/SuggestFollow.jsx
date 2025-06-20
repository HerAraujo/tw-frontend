import { useState, useEffect } from "react";
import "./SuggestFollow.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const axios = require("axios");

function SuggestFollow() {
  const [myFolloweds, setMyFolloweds] = useState([]);
  const loggedUser = useSelector((store) => store.user);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_URL}api/users`);
      setUsers(data);
    } catch (error) {
      return alert("Sorry something went wrong, please try again later");
    }
  };
  const usersToSuggest = users
    .filter((d) => {
      return d._id !== loggedUser.id;
    })
    .slice(0, 3);
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className="sg-follow-wrapper">
      {usersToSuggest.map((user) => {
        return (
          <div
            key={user._id}
            className="sg-follow-content d-flex flex-column rounded "
          >
            <Link to={`/${user.username}`}>
              <div className="sg-follow-info my-1">
                <img src={user.profileImage} alt={user.username} />
                <div className="sg-follow-name">
                  <p>{user.firstname}</p>
                  <span>{`@${user.username}`}</span>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default SuggestFollow;
