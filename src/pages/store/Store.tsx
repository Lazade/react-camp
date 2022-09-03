import React, { useEffect } from "react";
import { useSelector, useDispatch } from "../../redux/hooks";
import { 
  storeSlice, 
  getProductsAndCategoriesData, 
  getProductsOfCurrentCategory 
} from "../../redux/store/index";
import { Spinner  } from 'react-bootstrap';
import { Footer, Header } from "../../components";
import { BsArrowRightShort } from 'react-icons/bs';
import demo5 from '../../assets/images/demo-5.jpg';
import styles from './Store.module.scss';

interface CategoryData {
  name: string,
  id: string
}

interface productData {
  id: string,
  category: string,
  name: string,
  description: string,
  thumbnail: string,
  price: Number,
  isOnSale: boolean,
  isNewArrival: boolean,
  isInStock: boolean,
}

export const Store: React.FC = () => {

  const loading = useSelector(state => state.store.loading)
  const error = useSelector(state => state.store.error);
  const currentCategory = useSelector(state => state.store.currentCategory);
  const productsData = useSelector<null | productData[]>(state => state.store.productsData);
  const categoriesData = useSelector<null | CategoryData[]>(state => state.store.categoriesData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAndCategoriesData());
  }, []);

  const categoryClickAction = (cateid: string = "") => {
    if (currentCategory === cateid) { return }
    dispatch(storeSlice.actions.categoryActionHandler(cateid))
    dispatch(getProductsOfCurrentCategory(cateid));
  }

  return(
    <>
      <Header />
      {
        loading &&
        <div className={styles["loading-view"]}>
          <Spinner animation="border" />
        </div>
      }
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
                <li className={currentCategory === "" ? styles["li-focused"] : ""} onClick={() => categoryClickAction("")}>
                  <span>All <BsArrowRightShort /></span>
                </li>
                {
                  categoriesData &&
                  categoriesData.map((category) => (
                    <li className={(currentCategory === category.id) ? styles["li-focused"] : ""} key={category.id} onClick={() => categoryClickAction(category.id)}>
                      <span>{category.name} <BsArrowRightShort /></span>
                    </li>
                  ))
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
              {
                productsData &&
                productsData.map((productData) => {
                  let span;
                  if (!productData.isInStock) {
                    span = <span className={styles.soldOutSpan}>Sold Out</span>
                  } else if (productData.isNewArrival) {
                    span = <span className={styles.newArrivalSpan}>New Arrival</span>
                  } else if (productData.isOnSale) {
                    span = <span className={styles.discountSpan}>On Sale</span>
                  } else {
                    span = null
                  }
                  return (
                  <div key={productData.id} className={styles["product-item"]}>
                    {span}
                    <div className={styles["product-item-thumbnail"]}>
                      {/* thumbnail */}
                      <img src={demo5} alt="#" />
                    </div>
                    <div className={styles["product-item-info"]}>
                      {/* product info */}
                      <div className={styles["product-item-info-title"]}>
                        <p>{productData.name}</p>
                      </div>
                      <div className={styles["product-item-info-price"]}>
                        <p>{`¥ ${productData.price}`} <span>(税込)</span></p>
                      </div>
                    </div>
                    <a className={styles["product-item-link"]} href={`/product/${productData.id}`} target="_blank" rel="noreferrer"></a>
                  </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}