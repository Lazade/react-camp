import React from "react";
import { Link } from "react-router-dom";
import styles from './Footer.module.scss';
import logo from '../../assets/images/logo-bw.png';

export const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <Link to={"/"}><img src={logo} alt="Logo" /></Link>
      <p>© 2022 REACT CAMPING Inc.</p>
    </div>
  )
}