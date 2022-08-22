import React from "react";
import styles from './ProductRankingItem.module.scss';
import { Link } from "react-router-dom";

export const ProductRankingItem: React.FC = () => {
  return(
    <div className={styles.productItem}>
      <span className={styles["rank-span"]}>1</span>
      <figure>
        <img src="https://snowpeak-ec.s3.amazonaws.com/sys-master/AmazonS3Images/hee/h1c/8884358971422/E-104_main_300Wx300H" alt="#" />
      </figure>
      <div className={styles["item-info"]}>
        <p className={styles["item-name"]}>チタンシェラカップ</p>
        <p className={styles["item-price"]}>
          ¥2,090
          <span className={styles["item-price-tag-info"]}>（税込）</span>
        </p>
      </div>
      <Link to={"product/1"}></Link>
    </div>
  );
}