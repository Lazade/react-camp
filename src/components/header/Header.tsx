import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { BsSearch, BsShopWindow, BsCart } from "react-icons/bs";
import styles from "./Header.module.scss";
import logo from "../../assets/images/logo-bw.png";
import { useSelector } from "../../redux/hooks";
import { authSlice } from "../../redux/auth/slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const jwt = useSelector((state) => state.user.accessToken);
  const user = useSelector((state) => state.user);
  console.log(user);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const onLogout = () => {
    dispatch(authSlice.actions.logOut());
    navigate("/");
  };

  useEffect(() => {
    if (jwt && user.userName) {
      setName(user.userName);
    }
  }, [jwt]);

  return (
    <div className={styles.header}>
      <div className={styles.headerWrapper}>
        {/* logo */}
        <a href="/" className={styles.headerItem + " " + styles.logo}>
          <img src={logo} alt="Logo" />
          React Camp
        </a>
        {/* Search Bar */}
        <span className={styles.headerItem + " " + styles.search}>
          <Form.Control placeholder="Search" />
          <button>
            <BsSearch />
          </button>
        </span>
        {jwt ? (
          <span className={styles.headerItem + " " + styles.loggedIn}>
            <span>Welcome {name}</span>
            <button onClick={onLogout}>Sign Out</button>
          </span>
        ) : (
          <span className={styles.headerItem + " " + styles.user}>
            <Link to={"/signup"}>Sign Up</Link>
            <Link to={"/signin"}>Sign In</Link>
          </span>
        )}

        {/* Sign up & Sign in (not logged in)*/}
        {/* <span className={styles.headerItem + " " + styles.user}>
          <Link to={"/signup"}>Sign Up</Link>
          <Link to={"/signin"}>Sign In</Link>
        </span> */}
        {/* Cart */}
        <span className={styles.headerItem + " " + styles.cart}>
          <Link to="/store">
            <BsShopWindow />
          </Link>
          <Link to="/cart">
            <BsCart />
          </Link>
        </span>
      </div>
    </div>
  );
};
