import "./LogoutModal.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function LogoutModal({ userInfo }) {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const handlerClick = () => {
    const action = {
      type: "LOGOUT",
    };
    navigate("/");
    dispatch(action);
  };
  return (
    <div className="logout-modal">
      <div className="logout-modal-content">
        <div className="logout-modal-user-info">
          <div className="logout-modal-user-photo">
            <img src={userInfo.profileImage} alt={userInfo.username} />
          </div>
          <div className="logout-modal-user-name">
            <p>{userInfo.firstname}</p>
            <span>{`@${userInfo.username}`}</span>
          </div>
        </div>
        <span
          className="logout-modal-logoutbtn"
          onClick={() => {
            handlerClick();
          }}
        >
          {`Log out @${userInfo.username}`}
        </span>
      </div>
    </div>
  );
}

export default LogoutModal;
