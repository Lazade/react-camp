import React, { FC } from "react";
import { Header, Footer } from "../../components";
import { Link } from "react-router-dom";
import styles from './404NotFound.module.scss';

export const NotFound: FC = () => {
  return(
    <>
      <Header />
      <div className={styles.notFoundPage}>
        <div className={styles.notFoundPageWrapper}>
          <div className={styles.notFoundPageInner}>
            <h1>404 Not Found!</h1>
            <p>Oops, page was not found! <Link to="/">Go back home</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
