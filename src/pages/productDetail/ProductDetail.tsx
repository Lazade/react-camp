import React, { useEffect } from "react";
import { useSelector, useDispatch } from "../../redux/hooks";
import { useParams, Link } from "react-router-dom";
import { productSlice, getProduct } from "../../redux/product";
import { cartSlice, CartItem, addToCart } from "../../redux/cart";
import { Header, Footer } from "../../components";
import styles from './ProductDetail.module.scss';
import PD1 from '../../assets/images/PD1.jpg';
import PD2 from '../../assets/images/PD2.jpg';
import PD3 from '../../assets/images/PD3.jpg';
import PD4 from '../../assets/images/PD4.jpg';
import PD5 from '../../assets/images/PD5.jpg';
import PD6 from '../../assets/images/PD6.jpg';
import PD7 from '../../assets/images/PD7.jpg';
import PD8 from '../../assets/images/PD8.jpg';
import CA1 from '../../assets/images/CA1.jpg';
import NV from '../../assets/images/logo.png';
import { AiOutlineShoppingCart, AiOutlineLike } from 'react-icons/ai'
import { BsPencilSquare, BsChevronRight, BsStarHalf, BsStarFill, BsFacebook, BsYoutube, BsInstagram, BsTwitter } from 'react-icons/bs';


export const ProductDetail: React.FC = () => {

  const { id } = useParams();
  // const loading = useSelector(state => state.product.loading);
  // const error = useSelector(state => state.product.error);
  const productData = useSelector(state => state.product.productData);
  const categoryData = useSelector(state => state.product.categoryData);
  const currentImage = useSelector(state => state.product.currentImage);
  const displayImages = useSelector(state => state.product.displayImages);
  const selectedQuantity = useSelector(state => state.product.selectedQuantity);

  const dispatch = useDispatch()

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getProduct(id))
    }
    dispatch(productSlice.actions.setDisplayImages([PD1, PD2, PD3, PD4, PD5, PD6, PD7, PD8]))
  }, [])

  const addToCartAction = () => {
    if (productData !== null) {
      const quantity = selectedQuantity
      const newCartItem: CartItem = {
        product: productData,
        quantity,
        isChecked: false,
      }
      // dispatch(cartSlice.actions.handlerAddToCart(newCartItem))
      dispatch(addToCart(newCartItem));
    }
  }

  const figureClickAction = (image: string) => {
    dispatch(productSlice.actions.setCurrentImage(image))
  }

  const changeQuantity = (event: React.BaseSyntheticEvent) => {
    const quantity = parseInt(event.target.value)
    dispatch(productSlice.actions.selectedQuantityChange(quantity))
  }

  return (
    <>
      <Header />
      <section className={styles.productDetail}>
        <div className={styles.topInfo}>
          <a className={styles.topLink} href="#">25,000円(税込)以上お買い上げでノベルティプレゼント!</a>
          <ul className={styles.pageNav}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <span><BsChevronRight /></span>
            </li>
            <li>
              <Link to="/store">{categoryData?.name}</Link>
            </li>
            <li>
              <span><BsChevronRight /></span>
            </li>
            <li>{productData?.name}</li>
          </ul>
        </div>
        {/* Navigation Wrapper */}
        <div className={styles.navWrapper}>
          <img width={40} src={NV} />
          <a href="#revLink">Review</a>
          <a href="#specLink">Spec</a>
          <a href="#">Top</a>
        </div>
        {/* Cart wrapper */}
        <div className={styles.leftWrapper}>
          <h1 className={styles.productName}>
            {productData?.name}
          </h1>
          <p className={styles.productID}>M-777</p>
          <div className={styles.toReview}>
            <a href="#">
              <span className={styles.reviewIcons}><BsStarFill /></span>
              <span className={styles.reviewIcons}><BsStarFill /></span>
              <span className={styles.reviewIcons}><BsStarFill /></span>
              <span className={styles.reviewIcons}><BsStarFill /></span>
              <span className={styles.reviewIcons}><BsStarHalf /></span>
              <span className={styles.reviewOnly}>4レビュー</span>
            </a>
          </div>
          <div className={styles.productPrice}>
            <p>{`¥ ${productData?.price}`}<small>(税込)</small></p>
          </div>
          <div className={styles.productCartQty}>
            <span>数量</span>
            <div className={styles.selectBox}>
              <select name="qty" value={selectedQuantity} onChange={(e) => changeQuantity(e)}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
              </select>
            </div>
            <p>{productData?.isInStock ? '在庫あり' : '在庫なし'}</p>
            <div className={styles.addCart}>
              <button
                onClick={addToCartAction}
              >
                <span className={styles.cartIcon}><AiOutlineShoppingCart /></span>
                <span>カートに追加</span>
              </button>
            </div>
          </div>
          <div className={styles.shippingInfo}>
            <p>
              合計  ¥5,000 以上のご購入で配送料金が無料となります。
              <br />
              <a href="#">送料 - 配送について</a>
            </p>

          </div>
        </div>
        {/* Detail wrapper */}
        <div className={styles.rightWrapper}>
          <div className={styles.mainFigure}>
            <figure>
              <div>
                <img width={750} src={currentImage === null ? PD1 : currentImage} />
              </div>
            </figure>
          </div>
          <div className={styles.minorFigures}>
            {
              displayImages.map((image, index) => {
                return (
                  <figure 
                    key={index}
                    onClick={() => figureClickAction(image)}
                  >
                    <div>
                      <img width={124} height={93} src={image} />
                    </div>
                  </figure>
                )
              })
            }
          </div>
          <div className={styles.infoBox}>
            <h2>さまざまな使い方ができるシェラカップ。チタン製で超軽量です。</h2>
            <p className={styles.info1}>アウトドアの定番、シェラカップ。コップやお皿、計量カップの代わりとして使うことができる万能アイテムです。重ねられるので、収納や携帯にも便利。指に掛かりやすいハンドルのため、持ちやすいのがうれしいポイントです。チタン製のため驚くほど軽量です。</p>
            <p className={styles.info2}>強度があり光沢が美しいステンレス製のシェラカップも用意しています。</p>
          </div>
          <div className={styles.reviewBox} id="revLink">
            <div className={styles.titleBlock}>
              <h2>Review</h2>
              <p>チタンシェラカップのレビュー</p>
            </div>
            <div className={styles.summaryBlock}>
              <hr />
              <div className={styles.reviewDisplay}>
                <i>4.5</i>
                <span className={styles.reviewIcons}><BsStarFill /></span>
                <span className={styles.reviewIcons}><BsStarFill /></span>
                <span className={styles.reviewIcons}><BsStarFill /></span>
                <span className={styles.reviewIcons}><BsStarFill /></span>
                <span className={styles.reviewIcons}><BsStarHalf /></span>
                <span className={styles.reviewOnly}>4レビュー</span>
              </div>
              <div className={styles.writeButton}>
                <button>
                  <span className={styles.writeIcon}><BsPencilSquare /></span>
                  <i>レビューを書く</i>
                </button>
              </div>
            </div>
            <div className={styles.comentBlock}>
              <hr />
              <div className={styles.comentDate}>
                <span>2022-02-13</span>
              </div>
              <div className={styles.buyers}>
                <div className={styles.avatar}>
                  <img width={60} src={CA1} />
                </div>
                <div className={styles.profile}>
                  <span>ご利用者様</span>
                  <span>購入確認済</span>
                </div>
                <div className={styles.stars}>
                  <span ><BsStarFill /></span>
                  <span ><BsStarFill /></span>
                  <span ><BsStarFill /></span>
                  <span ><BsStarFill /></span>
                  <span ><BsStarHalf /></span>
                </div>
              </div>
              <div className={styles.content}>
                <p>高品質なので価格がお安くなればぜひ揃えたい</p>
                <span>スノーピークポイント失効間近だったのでステンレスシェラカップを購入してみました。100均のシェラカップでも使用上は問題ありませんが、やはりスノーピーク製は品質が高くて所有欲が満たされます。心地よい重量感があり、空の状態でも傾いたりせずしっかり置くことができます。価格が1,700円程度とややお高めなので星ひとつ減らしました。1,000円程度まで値段がさがれば巣のピークで揃えてもいいかなと思いました。今後のより一層の企業努力に期待しております。</span>
              </div>
              <div className={styles.contentLike}>
                <span>このレビューは参考になりましたか？</span>
                <span><AiOutlineLike /></span>
              </div>
            </div>
          </div>
          <div className={styles.specBox} id="specLink">
            <div className={styles.specTitle}>
              <h2>Spec</h2>
              <p>チタンシェラカップの仕様</p>
            </div>
            <hr />
            <ul className={styles.specDetail}>
              <li>
                <div className={styles.specName}>
                  <p>サイズ</p>
                </div>
                <div>
                  <p>φ120&times;45mm</p>
                </div>
                <hr />
              </li>
              <li>
                <div className={styles.specName}>
                  <p>重量</p>
                </div>
                <div>
                  <p>37g</p>
                </div>
                <hr />
              </li>
              <li>
                <div className={styles.specName}>
                  <p>容量</p>
                </div>
                <div>
                  <p>310ml</p>
                </div>
                <hr />
              </li>
              <li>
                <div className={styles.specName}>
                  <p>材料</p>
                </div>
                <div>
                  <p>チタニウム</p>
                </div>
                <hr />
              </li>
              <li>
                <div className={styles.specName}>
                  <p>特長</p>
                </div>
                <div>
                  <p>軽量なチタン製のシェラカップです。</p>
                </div>
                <hr />
              </li>
              <li>
                <div className={styles.specName}>
                  <p>仕様</p>
                </div>
                <div>
                  <p>
                    ● 材質 : チタニウム
                    ● 容量 : 310ml
                  </p>
                </div>
                <hr />
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.snsLink}>
          <span>
            <a href="#">
              <BsTwitter />
            </a>
          </span>
          <span>
            <a href="#">
              <BsFacebook />
            </a>
          </span>
          <span>
            <a href="#">
              <BsInstagram />
            </a>
          </span>
          <span>
            <a href="#">
              <BsYoutube />
            </a>
          </span>
        </div>
      </section>
      <Footer />
    </>
  );
}