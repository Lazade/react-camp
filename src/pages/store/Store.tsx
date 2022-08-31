import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";
import { useSelector, useDispatch } from "../../redux/hooks";
import { storeSlice, getCategoriesData } from "../../redux/store/index";
import axios from "axios";
import { Footer, Header } from "../../components";
import { BsArrowRightShort } from 'react-icons/bs';
import demo5 from '../../assets/images/demo-5.jpg';
import styles from './Store.module.scss';

interface CategoryData {
  name: string,
  id: string
}

export const Store: React.FC = () => {

  const loading = useSelector(state => state.store.loading)
  const error = useSelector(state => state.store.error);
  const productsData = useSelector(state => state.store.productsData);
  const categoriesData = useSelector<[any] | null>(state => state.store.categoriesData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoriesData());
  }, []);

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
                {/* <li><a href="#">テント <BsArrowRightShort /></a></li>
                <li><a href="#">テント <BsArrowRightShort /></a></li>
                <li><a href="#">テント <BsArrowRightShort /></a></li>
                <li><a href="#">テント <BsArrowRightShort /></a></li>
                <li><a href="#">テント <BsArrowRightShort /></a></li> */}
                {
                  // console.log(categoriesData)
                  !categoriesData ?
                  <div>Null</div> :
                  categoriesData.map((category) => {
                    console.log(category);
                    return <li key={category.name}><a href="#">{category.name} <BsArrowRightShort /></a></li>
                  })
                  // loading ?
                  // <div>loading</div> :
                  // <div>done</div>
                }
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