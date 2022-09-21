import React from "react";
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
import { AiOutlineShoppingCart, AiOutlineLike } from '../../../node_modules/react-icons/ai';
import { BsPencilSquare, BsChevronRight, BsStarHalf, BsStarFill, BsFacebook, BsYoutube, BsInstagram, BsTwitter } from '../../../node_modules/react-icons/bs';


export const ProductDetail: React.FC = () => {
  return (
    <>
      <Header />
      <section className={styles.productDetail}>
        <div className={styles.topInfo}>
          <a className={styles.topLink} href="#">25,000円(税込)以上お買い上げでノベルティプレゼント!</a>
          <ul className={styles.pageNav}>
            <li>
              <a href="#">React Camp homepage</a>
            </li>
            <li>
              <span><BsChevronRight /></span>
            </li>
            <li>
              <a href="">Outdoor gear</a>
            </li>
            <li>
              <span><BsChevronRight /></span>
            </li>
            <li>チタンシェラカップ(M-777)</li>
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
            チタンシェラカップ
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
            <p>
              ¥2,090
              <small>(税込)</small>
            </p>
          </div>
          <div className={styles.productCartQty}>
            <span>数量</span>
            <div className={styles.selectBox}>
              <select name="qty">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            <p>在庫あり</p>
            <div className={styles.addCart}>
              <button>
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
                <img width={750} src={PD1} />
              </div>
            </figure>
          </div>
          <div className={styles.minorFigures}>
            <figure>
              <div>
                <img width={124} height={93} src={PD2} />
              </div>
            </figure>
            <figure>
              <div>
                <img width={124} height={93} src={PD3} />
              </div>
            </figure>
            <figure>
              <div>
                <img width={124} height={93} src={PD4} />
              </div>
            </figure>
            <figure>
              <div>
                <img width={124} height={93} src={PD5} />
              </div>
            </figure>
            <figure>
              <div>
                <img width={124} height={93} src={PD6} />
              </div>
            </figure>
            <figure>
              <div>
                <img width={124} height={93} src={PD7} />
              </div>
            </figure>
            <figure>
              <div>
                <img width={124} height={93} src={PD8} />
              </div>
            </figure>
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