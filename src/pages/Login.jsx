import { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logIn } from "../store/actions";

function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [credentialsAreCorrect, setcredentialsAreCorrect] = useState("true");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_URL}api/token`,
        data: {
          username: username,
          password: password,
        },
      });

      dispatch(logIn(response.data.user));
      setUsername("");
      setPassword("");
      if (response.status === 200) navigate("/home");
    } catch (error) {
      if (error.response.status === 401) {
        setcredentialsAreCorrect(false);
      } else return alert("Sorry something went wrong, please try again later");
    }
  };
  return (
    <div className="login-background">
      <div className="form-container">
        <div className="container p-4">
          <div className="d-flex justify-content-end">
            <Link to={"/"}>
              <i className="fa-solid fa-xmark login-close"></i>
            </Link>
          </div>
          <span className="fa-stack fa-3x">
            <i className="fab fa-twitter blue-bird"></i>
          </span>
          <h1 className="">Incia sesión en Twitter</h1>
          <form
            className="m-auto text-start"
            onSubmit={(event) => handleSubmit(event)}
          >
            <label className="login-label" htmlFor="username">
              Username
            </label>
            <input
              className="form-control"
              name="username"
              id="username"
              type="text"
              placeholder="Insert your username..."
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <label className="login-label mt-4" htmlFor="password">
              Password
            </label>
            <input
              className="form-control"
              id="password"
              name="password"
              type="password"
              placeholder="Insert your password..."
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {!credentialsAreCorrect && (
              <h4 className="incorrect-credentials mt-2">
                Usuario o contraseña incorrecta. Por favor vuleve a intentarlo.
              </h4>
            )}
            <button
              className="btn rounded-pill w-100 btn-primary my-5"
              type="submit"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
