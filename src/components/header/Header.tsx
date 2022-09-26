import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "../../redux/hooks";
import { commonSlice } from "../../redux/store";
// import { cartSlice } from "../../redux/cart";
import { authSlice } from "../../redux/auth/slice";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { BsSearch, BsShopWindow, BsCart, BsArrowUp } from "react-icons/bs";
import styles from "./Header.module.scss";
import logo from "../../assets/images/logo-bw.png";

export const Header: React.FC = () => {
  //Login starts
  const jwt = useSelector((state) => state.user.accessToken);
  const user = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();
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

  //Login ends

  const hasScrollUp = useSelector((state) => state.common.hasScrollUp);
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      // dispatch(purchaseSlice.actions.updateIsScroll(window.scrollY > 100));
      dispatch(commonSlice.actions.updateHasScrollUp(window.scrollY > 100));
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const scrollTopButton = () => {
    return (
      <button className={styles.scrollTopButton} onClick={scrollToTop}>
        <BsArrowUp />
      </button>
    );
  };

  return (
    <>
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
          {/* Cart */}
          <span className={styles.headerItem + " " + styles.cart}>
            <Link to="/store">
              <BsShopWindow />
            </Link>
            <Link className={styles.cartButton} to="/cart">
              {cartItems.length > 0 && (
                <span className={styles.quantitySpan}>{cartItems.length}</span>
              )}
              <BsCart />
            </Link>
          </span>
        </div>
      </div>
      {hasScrollUp && scrollTopButton()}
    </>
  );
};
