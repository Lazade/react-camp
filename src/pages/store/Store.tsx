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

export const Store: React.FC = () => {

  const loading = useSelector(state => state.store.loading)
  const error = useSelector(state => state.store.error);
  const currentCategory = useSelector(state => state.store.currentCategory);
  // const productsData = useSelector(state => state.store.productsData);
  const categoriesData = useSelector(state => state.store.categoriesData);
  const filtedProductsData = useSelector(state => state.store.filtedProductsData);
  const countOfLessThan5000 = useSelector(state => state.store.countOfLessThan5000);
  const countOfFrom5000To10000 = useSelector(state => state.store.countOfFrom5000To10000);
  const countOfFrom10001To20000 = useSelector(state => state.store.countOfFrom10001To20000);
  const countOfFrom20001To30000 = useSelector(state => state.store.countOfFrom20001To30000);
  const countOfGreaterThan30000 = useSelector(state => state.store.countOfGreaterThan30000);
  const isShowInStock = useSelector(state => state.store.isShowInStock);
  const priceRange = useSelector(state => state.store.priceRange);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAndCategoriesData());
  }, []);

  const categoryClickAction = (cateid: string = "") => {
    if (currentCategory === cateid) { return }
    dispatch(storeSlice.actions.categoryActionHandler(cateid))
    dispatch(getProductsOfCurrentCategory(cateid));
  }

  const toggleIsShowInStock = () => {
    const value = isShowInStock;
    dispatch(storeSlice.actions.setIsShowInStock((value === null || value === false) ? true : null))
  }

  const toggleIsNotShowInStock = () => {
    const value = isShowInStock;
    dispatch(storeSlice.actions.setIsShowInStock((value === null || value === true) ? false : null))
  }

  const setPriceRange = (value: string) => {
    const oldValue = priceRange;
    dispatch(storeSlice.actions.setPriceRangeHandler((value === oldValue) ? null : value))
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
        <div className={styles.storeWrapper}>
          {/* left */}
          <div className={styles.storeLeftside}>
            {/* Category */}
            <div className={styles.leftsidePart + ' ' + styles.categoryPart}>
              <div className={styles.titlePart}>
                <p className={styles.titlePartTitle}>Category</p>
              </div>
              <ul>
                <li className={currentCategory === "" ? styles.liFocused : ""} onClick={() => categoryClickAction("")}>
                  <span>All <BsArrowRightShort /></span>
                </li>
                {
                  categoriesData &&
                  categoriesData.map((category) => (
                    <li className={(currentCategory === category.id) ? styles.liFocused : ""} key={category.id} onClick={() => categoryClickAction(category.id)}>
                      <span>{category.name} <BsArrowRightShort /></span>
                    </li>
                  ))
                }
              </ul>
            </div>
            {/* in stock */}
            <div className={styles.leftsidePart + ' ' + styles.stockPart}>
              <div className={styles.titlePart}>
                <p className={styles.titlePartTitle}>In Stock</p>
              </div>
              <ul>
                <li
                  className={isShowInStock === true ? styles.showStockItem + ' ' + styles.showStockItemChecked : styles.showStockItem} 
                  onClick={toggleIsShowInStock}
                >
                  <span className={styles.spanMark}></span>
                  <span className={styles.spanOption}>In stock</span>
                </li>
                <li
                  className={isShowInStock === false ? styles.showStockItem + ' ' + styles.showStockItemChecked : styles.showStockItem}
                  onClick={toggleIsNotShowInStock}
                >
                  <span className={styles.spanMark}></span>
                  <span className={styles.spanOption}>Not in stock</span>
                </li>
              </ul>
            </div>
            {/* price range */}
            <div className={styles.leftsidePart + ' ' + styles.priceRangePart}>
              <div className={styles.titlePart}>
                <p className={styles.titlePartTitle}>Price Range</p>
              </div>
              <ul>
                <li 
                  className={styles.priceRangeItem + (priceRange === '<5000' ? (' ' + styles.priceRangeItemChecked) : '')}
                  onClick={() => setPriceRange('<5000')}
                >
                  <span className={styles.priceRangeItemSpanMark}></span>
                  <div className={styles.priceRangeItemDivOption}>~ ¥5,000 <span>({countOfLessThan5000})</span></div>
                </li>
                <li 
                  className={styles.priceRangeItem + (priceRange === '5001~10000' ? (' ' + styles.priceRangeItemChecked) : '')}
                  onClick={() => setPriceRange('5001~10000')}
                >
                  <span className={styles.priceRangeItemSpanMark}></span>
                  <div className={styles.priceRangeItemDivOption}>¥5,001~ ¥10,000<span>({countOfFrom5000To10000})</span></div>
                </li>
                <li 
                  className={styles.priceRangeItem + (priceRange === '10001~20000' ? (' ' + styles.priceRangeItemChecked) : '')}
                  onClick={() => setPriceRange('10001~20000')}
                >
                  <span className={styles.priceRangeItemSpanMark}></span>
                  <div className={styles.priceRangeItemDivOption}>¥10,001~ ¥20,000<span>({countOfFrom10001To20000})</span></div>
                </li>
                <li 
                  className={styles.priceRangeItem + (priceRange === '20001~30000' ? (' ' + styles.priceRangeItemChecked) : '')}
                  onClick={() => setPriceRange('20001~30000')}
                >
                  <span className={styles.priceRangeItemSpanMark}></span>
                  <div className={styles.priceRangeItemDivOption}>¥20,001~ ¥30,000<span>({countOfFrom20001To30000})</span></div>
                </li>
                <li 
                  className={styles.priceRangeItem + (priceRange === '>30000' ? (' ' + styles.priceRangeItemChecked) : '')}
                  onClick={() => setPriceRange('>30000')}
                >
                  <span className={styles.priceRangeItemSpanMark}></span>
                  <div className={styles.priceRangeItemDivOption}>¥30,001~ <span>({countOfGreaterThan30000})</span></div>
                </li>
              </ul>
            </div>
          </div>
          {/* right */}
          <div className={styles["store-rightside"]}>
            <div className={styles["product-list-wrapper"]}>
              {
                filtedProductsData &&
                filtedProductsData.map((productData) => {
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