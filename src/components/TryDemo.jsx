import "../pages/Welcome.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logIn } from "../store/actions";

function TryDemo() {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async (event) => {
    try {
      const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_URL}api/token`,
        data: {
          username: "user",
          password: "user",
        },
      });

      dispatch(logIn(response.data.user));
      if (response.status === 200) navigate("/home");
    } catch (error) {
      return alert("Sorry something went wrong, please try again later");
    }
  };
  return (
    <div>
      <button
        className="welcome-page-btn startBtn3 mt-4"
        onClick={() => handleClick()}
      >
        Try Demo
      </button>
    </div>
  );
}

export default TryDemo;
