import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import LogoutModal from "./LogoutModal";
import axios from "axios";
import "./UserPill.css";

function UserPill() {
  const user = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_URL}api/users/${user?.username}`
        );
        setUserInfo(data);
      } catch (error) {
        return alert("Sorry something went wrong, please try again later");
      }
    };
    getUser();
  }, []);

  return (
    <div>
      {userInfo && (
        <div
          className="user-pill-wrapper d-flex justify-content-center mb-3"
          onClick={() => setShowModal((prev) => !prev)}
        >
          <div className="user-pill-info">
            <div className="user-pill-photo">
              <img src={userInfo.profileImage} alt={userInfo.username} />
            </div>
            <div className="user-pill-name d-none d-xl-inline-block">
              <p>{userInfo.firstname}</p>
              <span>{`@${user.username}`}</span>
            </div>
          </div>
          <div className="user-pill-modal-btn d-none d-xl-inline-block">
            <svg viewBox="0 0 24 24" className="user-pill-modal-dots-items">
              <g>
                <circle cx="5" cy="12" r="2"></circle>
                <circle cx="12" cy="12" r="2"></circle>
                <circle cx="19" cy="12" r="2"></circle>
              </g>
            </svg>
          </div>
          {showModal && <LogoutModal userInfo={userInfo} />}
        </div>
      )}
    </div>
  );
}

export default UserPill;
