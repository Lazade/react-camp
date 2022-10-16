import React, { useEffect } from "react";
import { useSelector, useDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { orderSlice, getOrderList } from "../../redux/order";
import styles from "./OrderList.module.scss";
import { Header, Footer, LoadingView, ErrorAlert } from "../../components";
import demo5 from '../../assets/images/demo-5.jpg';

export const OrderList: React.FC = () => {

  const isLoading = useSelector(state => state.order.isLoading);
  const error = useSelector(state => state.order.error);
  const orderDatas = useSelector(state => state.order.orderDatas);
  const jwt = useSelector(state => state.user.accessToken);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    if (jwt === null) {
      navigation("/signin")
    } else {
      dispatch(getOrderList(jwt));
    }
  }, [])

  return (
    <>
      <Header/>
      {
        isLoading&&
        <LoadingView />
      }
      <div className={styles.orderListPage}>
        <div className={styles.orderListPageWrapper}>
          {
            error&&
            <ErrorAlert error={error} />
          }
          <div className={styles.orderListPageInner}>
            {
              orderDatas.length > 0 ? 
              orderDatas.map((data) => {
                return (
                  <div className={styles.orderItem} key={data._id}>
                    <div className={styles.orderItemInfo}>
                      <div className={styles.orderItemInfoWrapper}>
                        <div className={styles.orderItemInfoLeft}>
                          <div className={styles.orderItemInfoItem}>
                            <p className={styles.itemTitle}>
                              Status
                            </p>
                            <p className={styles.itemBody + ' ' + styles[`status${data.status}`]}>
                              {data.status}
                            </p>
                          </div>
                          <div className={styles.orderItemInfoItem}>
                            <p className={styles.itemTitle}>
                              Order Date
                            </p>
                            <p className={styles.itemBody}>
                              {data.createdAt}
                            </p>
                          </div>
                          <div className={styles.orderItemInfoItem}>
                            <p className={styles.itemTitle}>
                              Order Cost
                            </p>
                            <p className={styles.itemBody}>
                              $ {data.costPrice}
                            </p>
                          </div>
                        </div>
                        <div className={styles.orderItemInfoRight}>
                          <div className={styles.orderItemInfoItem}>
                            <p className={styles.itemTitle}>
                              Order ID: {data._id}
                            </p>
                            <div className={styles.links}>
                              <a className={styles.linkItem} href={`/order/${data._id}`} target="_blank">Show Order</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.orderItemDetail}>
                      {
                        data.orderItems.map((order) => {
                          return (
                            <div className={styles.productItem} key={order._id}>
                              <div className={styles.productItemInner}>
                                {/* info */}
                                <div className={styles.productItemInfo}>
                                  {/* image */}
                                  <div className={styles.productItemInfoImage}>
                                    <img src={demo5} alt="demo" />
                                  </div>
                                  {/* detail info */}
                                  <div className={styles.productItemInfoDetail}>
                                    <table>
                                      <tbody>
                                        <tr>
                                          <td>Name:</td>
                                          <td>{order.name}</td>
                                        </tr>
                                        <tr className={styles.productItemInfoDetailInfoRow}>
                                          <td>Price:</td>
                                          <td>$ {order.price}</td>
                                        </tr>
                                        <tr className={styles.productItemInfoDetailInfoRow}>
                                          <td>Quantity:</td>
                                          <td>{order.quantity}</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                {/* status & buttons */}
                                <div className={styles.productItemStatus}>
                                  
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className={styles.orderItemFooter}>
                      <div className={styles.orderItemFooterInner}>
                        <button className={styles.hideOrderButton}>Don't show this order</button>
                        {  
                          data.status === "PENDING"&&
                          <div className={styles.operationButtons}>
                            <a className={styles.continuePayment} href={`/order/${data._id}`} target="_blank">Continue</a>
                            <button className={styles.cancelButton}>Cancel</button>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                )
              }) :
              <div>
                Empty
              </div>
            }
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}