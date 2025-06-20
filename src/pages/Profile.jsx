import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LeftSidebar from "../components/LeftSidebar";
import RightSidebar from "../components/RightSidebar";
import Tweets from "../components/Tweets";
import { updateTweets } from "../store/actions";
import BottomNavbar from "../components/BottomNavbar";
import Unfollow from "../components/Unfollow";
import Follow from "../components/Follow";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function Profile() {
  let navigate = useNavigate();
  const [follow, setFollow] = useState("");
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState("");
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Not Avaible
    </Tooltip>
  );

  const loggedUser = useSelector((store) => store.user);
  const updatedTweets = useSelector((store) => store.tweets);
  const dispatch = useDispatch();
  let params = useParams();
  const getUser = async () => {
    try {
      const response = await axios({
        url: `${process.env.REACT_APP_URL}api/users/${params.username}`,
      });
      setUser(response.data);
      setFollowers(response.data.followers.length);
      response.data.followers.includes(loggedUser?.id)
        ? setFollow(true)
        : setFollow(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getTweets = async () => {
      try {
        const response = await axios({
          url: `${process.env.REACT_APP_URL}api/tweets/${params.username}`,
        });
        if (response.status === 200) {
          setTweets(response.data.tweets);
        }
        if (response.status === 204) navigate("*");
      } catch (error) {
        return alert("Sorry something went wrong, please try again later");
      }
    };

    getTweets();
    getUser();
  }, [params.username]);
  useEffect(() => dispatch(updateTweets(tweets)), [tweets]);
  return (
    <div>
      {user && (
        <div className="container">
          <div className="row">
            <div className="col-3  d-flex flex-column  align-items-end">
              <LeftSidebar />
            </div>

            <div className="col-12 col-sm-9 col-lg-6">
              <div className="row tweet-card d-flex">
                <div className="profile-image-background"></div>

                <div className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start">
                    <img
                      className="col-3 user-profile-photo"
                      src={user.profileImage}
                      alt="profile"
                    />
                    {loggedUser?.username === params.username ? (
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                      >
                        <button className="btn btn-dark rounded-pill mt-2">
                          Edit profile
                        </button>
                      </OverlayTrigger>
                    ) : (
                      <div
                        className="mt-2"
                        onClick={() => {
                          {
                            follow
                              ? setFollowers((prev) => prev - 1)
                              : setFollowers((prev) => prev + 1);
                          }
                          setFollow((prev) => !prev);
                        }}
                      >
                        {follow ? <Unfollow /> : <Follow />}
                      </div>
                    )}
                  </div>
                  <div id="profile-data">
                    <h2 className="text-start d-block fs-4 me-2 text-dark fw-bold words-distance">
                      {user.firstname} {user.lastname}
                    </h2>
                    <h3 className="text-start d-block text-muted fs-6 words-distance">
                      @{user.username}
                    </h3>

                    <p className="text-muted text-start">
                      <i className="fa-solid fa-calendar-days text-muted words-distance"></i>{" "}
                      Joined March 2022
                    </p>
                    <div className="d-sm-flex words-distance text-start">
                      <p className="me-3">
                        <span className="fw-bold me-1">
                          {user.following.length}
                        </span>
                        <span className="text-muted">Following</span>
                      </p>
                      <p>
                        <span className="fw-bold me-1">{followers}</span>
                        <span className="text-muted">Followers</span>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <button className="col-3 text-center profile-btn btn btn-outline">
                      Tweets
                    </button>
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                    >
                      <a className="col-4 text-center profile-btn btn btn-outline">
                        Tweets & replies
                      </a>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                    >
                      <a className="col-2 text-center profile-btn btn btn-outline">
                        Media
                      </a>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={renderTooltip}
                    >
                      <a className="col-3 text-center btn btn-outline profile-btn">
                        <div>Likes</div>
                      </a>
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
              <Tweets tweets={updatedTweets} />
            </div>

            <div className="col-lg-3 d-none d-lg-inline-block right-sidebar">
              <RightSidebar />
            </div>
          </div>
          <BottomNavbar />
        </div>
      )}
    </div>
  );
}

export default Profile;
