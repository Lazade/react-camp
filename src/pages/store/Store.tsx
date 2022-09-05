import React from "react";
import { Footer, Header } from "../../components";
import { BsArrowRightShort } from 'react-icons/bs';
import demo5 from '../../assets/images/demo-5.jpg';
import styles from './Store.module.scss';

export const Store: React.FC = () => {
  return(
    <>
      <Header />
      <section className={styles.store}>
        <div className={styles["store-wrapper"]}>
          {/* left */}
          <div className={styles["store-leftside"]}>
            {/* Category */}
            <div className={styles["leftside-part"] + ' ' + styles["category-part"]}>
              <div className={styles["title-part"]}>
                <p className={styles["title-part-title"]}>Category</p>
              </div>
              <ul>
                <li><a href="#">テント <BsArrowRightShort /></a></li>
                <li><a href="#">テント <BsArrowRightShort /></a></li>
                <li><a href="#">テント <BsArrowRightShort /></a></li>
                <li><a href="#">テント <BsArrowRightShort /></a></li>
                <li><a href="#">テント <BsArrowRightShort /></a></li>
              </ul>
            </div>
            {/* in stock */}
            <div className={styles["leftside-part"] + ' ' + styles["stock-part"]}>
              <div className={styles["title-part"]}>
                <p className={styles["title-part-title"]}>In Stock</p>
              </div>
              <ul>
                <li>
                  <span className={styles["span-mark"]}></span>
                  <span className={styles["span-option"]}>In stock</span>
                </li>
                <li>
                  <span className={styles["span-mark"]}></span>
                  <span className={styles["span-option"]}>Not in stock</span>
                </li>
              </ul>
            </div>
            {/* price range */}
            <div className={styles["leftside-part"] + ' ' + styles["price-range-part"]}>
              <div className={styles["title-part"]}>
                <p className={styles["title-part-title"]}>Price Range</p>
              </div>
              <ul>
                <li>
                  <span className={styles["span-mark"]}></span>
                  <div className={styles["div-option"]}>¥5,000以下 <span>(256)</span></div>
                </li>
                <li>
                  <span className={styles["span-mark"]}></span>
                  <div className={styles["div-option"]}>¥5,001~ ¥10,000<span>(256)</span></div>
                </li>
                <li>
                  <span className={styles["span-mark"]}></span>
                  <div className={styles["div-option"]}>¥5,001~ ¥10,000<span>(256)</span></div>
                </li>
                <li>
                  <span className={styles["span-mark"]}></span>
                  <div className={styles["div-option"]}>¥5,001~ ¥10,000<span>(256)</span></div>
                </li>
                <li>
                  <span className={styles["span-mark"]}></span>
                  <div className={styles["div-option"]}>¥5,001~ ¥10,000<span>(256)</span></div>
                </li>
              </ul>
            </div>
          </div>
          {/* right */}
          <div className={styles["store-rightside"]}>
            <div className={styles["product-list-wrapper"]}>
              <div className={styles["product-item"]}>
                <div className={styles["product-item-thumbnail"]}>
                  {/* thumbnail */}
                  <img src={demo5} alt="#" />
                </div>
                <div className={styles["product-item-info"]}>
                  {/* product info */}
                  <div className={styles["product-item-info-title"]}>
                    <p>SP Dog Pullover Logo</p>
                  </div>
                  <div className={styles["product-item-info-price"]}>
                    <p>¥1,320 <span>(税込)</span></p>
                  </div>
                  <div>
                    rating
                  </div>
                </div>
              </div>
              <div className={styles["product-item"]}>
                <span className={styles.soldOutSpan}>Sold Out</span>
                <div className={styles["product-item-thumbnail"]}>
                  {/* thumbnail */}
                  <img src={demo5} alt="#" />
                </div>
                <div className={styles["product-item-info"]}>
                  {/* product info */}
                  <div className={styles["product-item-info-title"]}>
                    <p>SP Dog Pullover Logo</p>
                  </div>
                  <div className={styles["product-item-info-price"]}>
                    <p>¥1,320 <span>(税込)</span></p>
                  </div>
                  <div>
                    rating
                  </div>
                </div>
                <a href="#"></a>
              </div>
              <div className={styles["product-item"]}>
                <span className={styles.discountSpan}>15% Off</span>
                <div className={styles["product-item-thumbnail"]}>
                  {/* thumbnail */}
                  <img src={demo5} alt="#" />
                </div>
                <div className={styles["product-item-info"]}>
                  {/* product info */}
                  <div className={styles["product-item-info-title"]}>
                    <p>SP Dog Pullover Logo</p>
                  </div>
                  <div className={styles["product-item-info-price"]}>
                    <p>¥1,320 <span>(税込)</span></p>
                  </div>
                  <div>
                    rating
                  </div>
                </div>
              </div>
              <div className={styles["product-item"]}>
                <span className={styles.newArrivalSpan}>New Arrival</span>
                <div className={styles["product-item-thumbnail"]}>
                  {/* thumbnail */}
                  <img src={demo5} alt="#" />
                </div>
                <div className={styles["product-item-info"]}>
                  {/* product info */}
                  <div className={styles["product-item-info-title"]}>
                    <p>SP Dog Pullover Logo</p>
                  </div>
                  <div className={styles["product-item-info-price"]}>
                    <p>¥1,320 <span>(税込)</span></p>
                  </div>
                  <div>
                    rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}