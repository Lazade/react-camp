import React from "react";
import styles from "./LoadingView.module.scss";
import { Spinner } from "react-bootstrap";

export const LoadingView: React.FC = () => {
  return (
    <div className={styles.loadingView}>
      <Spinner animation="border" />
    </div>
  )
}