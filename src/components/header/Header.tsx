import React from "react";
import { Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { BsSearch, BsShopWindow, BsCart } from 'react-icons/bs';
import styles from './Header.module.scss';
import logo from '../../assets/images/logo.png';

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerWrapper}>
        {/* logo */}
        <a href="/" className={styles.headerItem + ' ' + styles.logo}>
            <img src={logo} alt="Logo" />
            {/* React Camp */}
        </a>
        {/* Search Bar */}
        <span className={styles.headerItem + ' ' + styles.search}>
          <Form.Control placeholder="Search" />
          <button>
            <BsSearch />
          </button>
        </span>
        {/* Sign up & Sign in */}
        <span className={styles.headerItem + ' ' + styles.user}>
          <Link to={"/signup"}>Sign Up</Link>
          <Link to={"/signin"}>Sign In</Link>
        </span>
        {/* Cart */}
        <span className={styles.headerItem + ' ' + styles.cart}>
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
}