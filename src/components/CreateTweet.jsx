import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { storeTweet } from "../store/actions";
import "./CreateTweet.css";

function CreateTweet({ handleClose }) {
  const user = useSelector((store) => store.user);

  const [loggedUser, setLoggedUser] = useState("");
  const [content, setContent] = useState("");
  const [chartLeft, setChartLeft] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios({
          url: `${process.env.REACT_APP_URL}api/users/${user.username}`,
        });
        setLoggedUser(response.data);
      } catch (error) {
        return alert("Sorry something went wrong, please try again later");
      }
    };
    getUser();
    setLoggedUser("");
  }, []);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_URL}api/tweets`,
        headers: { Authorization: `Bearer ${user.accessToken}` },
        data: {
          content: content,
        },
      });

      setContent("");
      dispatch(storeTweet(response.data.newTweet));
      handleClose();
    } catch (error) {
      return alert("Sorry something went wrong, please try again later");
    }
  };
  const countChart = (chart) => {
    setChartLeft(chart.length);
  };

  return (
    <div className="row create-tweet-tweet-card d-flex p-4">
      <h1 className="fs-5 text-start mb-4">Home</h1>
      <div className="col-xs-5 col-2 p-0">
        <img
          className="create-tweet-user-photo"
          src={loggedUser.profileImage}
          alt="user"
        />
      </div>
      <div className="col-xs-7 col-10">
        <form className="text-start" onSubmit={(event) => handleSubmit(event)}>
          <label htmlFor="content"></label>
          <input
            className="fs-6 "
            type="text"
            name="content"
            id="content"
            placeholder="What's happening?"
            maxLength="280"
            value={content}
            required
            onChange={(event) => {
              countChart(event.target.value);
              setContent(event.target.value);
            }}
          />

          <div className="p-2 mt-2 d-flex justify-content-end flex-column text-muted align-items-end border-top">
            <p>{chartLeft}/280</p>
            <button className="btn btn-primary rounded-pill" type="submit">
              Tweet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTweet;
