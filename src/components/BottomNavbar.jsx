import React, { useEffect, useState } from "react";
import LogoutModal from "./LogoutModal";
import "./BottomNavbar.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateTweet from "./CreateTweet";
import UserPill from "./UserPill";

function BottomNavbar() {
  const [show, setShow] = useState(false); // show for create tweet modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const user = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}api/users/${user?.username}`
        );
        if (response.status === 200) setUserInfo(response.data);
      } catch (error) {
        return alert("Sorry something went wrong, please try again later");
      }
    };
    getUser();
  }, []);

  return (
    <div className="d-flex d-sm-none justify-content-around bottom-navbar align-items-center p-2">
      <Link to={"/home"}>
        <i className="navbar-icon fas fa-home fa-xl"></i>
      </Link>
      <Link to={`/${user?.username}`}>
        <i className="navbar-icon fas fa-user fa-xl"></i>
      </Link>
      <UserPill />
      <button className="btn rounded-pill btn-primary" onClick={handleShow}>
        New Tweet
      </button>
      <Modal show={show} onHide={handleClose}>
        <div className="d-flex justify-content-end m-2">
          <i
            className="fa-solid fa-xmark cursor-pointer"
            onClick={handleClose}
          ></i>
        </div>
        <CreateTweet handleClose={handleClose} />
      </Modal>
    </div>
  );
}

export default BottomNavbar;
