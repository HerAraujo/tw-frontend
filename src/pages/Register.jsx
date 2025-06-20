import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailInUse, setEmailInUse] = useState(false);
  const [usernameInUse, setUsernameInUse] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios({
        method: "POST",
        url: `${process.env.REACT_APP_URL}api/users`,
        data: {
          firstname: firstname,
          lastname: lastname,
          username: username,
          email: email,
          password: password,
        },
      });

      setEmail("");
      setLastname("");
      setFirstname("");
      setUsername("");
      setPassword("");
      if (response.data === "This email is already in use.") {
        setEmailInUse(true);
      } else if (response.data === "This username is already in use.") {
        setUsernameInUse(true);
      } else {
        setEmailInUse(false);
        setUsernameInUse(false);
        navigate("/login");
      }
    } catch (error) {
      return alert("Sorry something went wrong, please try again later");
    }
  };
  return (
    <div className="register-background">
      <div className="form-container">
        <div className="container p-4">
          <div className="d-flex justify-content-end">
            <Link to={"/"}>
              <i className="fa-solid fa-xmark register-close"></i>
            </Link>
          </div>

          <div className="row d-flex justify-content-center">
            <span className="fa-stack fa-3x px-5 d-flex justify-content-center">
              <i className="fab fa-twitter blue-bird"></i>
            </span>
          </div>
          <div className="row px-5 py-3">
            <h1 className="label">Create your account</h1>
          </div>
          <div>
            <form
              className="container px-5"
              id="regForm"
              onSubmit={(event) => handleSubmit(event)}
            >
              <div className="pb-3">
                <input
                  className="form-control"
                  value={firstname}
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  onChange={(event) => setFirstname(event.target.value)}
                  required
                />
              </div>
              <div className="pb-3">
                <input
                  className="form-control"
                  value={lastname}
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Lastname"
                  onChange={(event) => setLastname(event.target.value)}
                  required
                />
              </div>
              <div className="pb-3">
                <input
                  className="form-control"
                  value={username}
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Username"
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
                {usernameInUse && (
                  <h4 className="incorrect-credentials mt-2">
                    El username ingresado no está disponible.
                  </h4>
                )}
              </div>
              <div className="pb-3">
                <input
                  className="form-control"
                  value={email}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                {emailInUse && (
                  <h4 className="incorrect-credentials mt-2">
                    El email ingresado no está disponible.
                  </h4>
                )}
              </div>
              <div className="pb-5">
                <input
                  className="form-control"
                  value={password}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
                <span className="error" aria-live="polite"></span>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100 rounded-pill mb-4"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
