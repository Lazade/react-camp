import React from "react";
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <p>© 2022 REACT CAMPING Inc.</p>
    </div>
  )
}