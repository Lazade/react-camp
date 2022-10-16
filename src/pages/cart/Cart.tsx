import React, { useEffect } from "react";
import { Header, Footer, LoadingView, ErrorAlert } from "../../components";
import { Card } from "react-bootstrap";
import { GrFormSubtract, GrFormAdd } from 'react-icons/gr'
import styles from './Cart.module.scss';
import demo from '../../assets/images/demo-5.jpg';
import { useSelector, useDispatch } from "../../redux/hooks";
import { cartSlice, getUserCart, getCartFromLocal, subtractAction } from "../../redux/cart";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { apiURL } from "../../config";

export const Cart: React.FC = () => {

  const jwt = useSelector(state => state.user.accessToken);

  const { cartItems, isAllChecked, quantity, totalPrice, loading, error } = useSelector(state => state.cart);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (jwt === null) {
      dispatch(getCartFromLocal());
    } else {
      dispatch(getUserCart(jwt));
    }
  }, [jwt]);

  const selectAllButtonAction = () => {
    dispatch(cartSlice.actions.handleSelectAllButtonAction(!isAllChecked))
    dispatch(cartSlice.actions.updateState());
  }

  const checkButtonAction = (id: string) => {
    dispatch(cartSlice.actions.handleCheckButtonAction(id));
    dispatch(cartSlice.actions.updateState());
  }

  const subtractButtonAction = (id: string) => {
    dispatch(subtractAction({id, jwt}));
  }

  const plusButtonAction = (id: string) => {
    dispatch(cartSlice.actions.handlePlusButtonAction(id));
    dispatch(cartSlice.actions.updateState());
  }

  const quantityChanged = (id: string, event: React.BaseSyntheticEvent) => {
    const newQuantity = parseInt(event.target.value)
    dispatch(cartSlice.actions.handleQuantityValueChange({ id, newQuantity }));
    dispatch(cartSlice.actions.updateState());
  }

  const removeButtonAction = (id: string) => {
    dispatch(cartSlice.actions.handleRemoveButtonAction(id));
    dispatch(cartSlice.actions.updateState());
  }

  const checkoutButtonAction = () => {
    if (quantity === 0) { return }
    const purchasingItems = cartItems.filter((item) => item.isChecked)
                              .map((item) => { return {
                                productId: item.product.id, quantity: item.quantity, price: (item.quantity * item.product.price.valueOf())
                              }})
    dispatch(cartSlice.actions.checkoutFetchStart())
    axios.post(`${apiURL}/order`, { orderItems: purchasingItems, userId: '630c1191e9ff85c27667201f' })
      .then((res) => {
        console.log(res);
        const { data, error } = res.data;
        const orderId = data;
        navigate(`/order/${orderId}`);
      })
      .catch((error) => {
        if (error instanceof Error) {
          dispatch(cartSlice.actions.checkoutFetchError(error.message))
        }
      })
  }

  const removeAllButtonAction = () => {
    dispatch(cartSlice.actions.handleRemoveAllButtonAction());
  }

  return (
    <>
      <Header />
      {
        loading&&
        <LoadingView />
      }
      <div className={styles.cart}>
        <div className={styles.cartWrapper}>
          {
            (error !== null)&&
            <ErrorAlert error={error} />
          }
          <div className={styles.innerContent}>
            <div className={styles.leftPart}>
              <div className={styles.cartsContent}>
                <div className={styles.cartsContentHeader}>
                  <h5 className={styles.title}>Shopping Cart</h5>
                  <p className={styles.price}>Price</p>
                  <button 
                    className={styles.selectButton}
                    onClick={selectAllButtonAction}
                  >
                    {isAllChecked ? 'Unselect All' : 'Select All'}
                  </button>
                </div>
                <Card>
                  <Card.Body>
                    <div className={styles.cartsContentBody}>
                      {
                        (cartItems.length > 0) ?
                        cartItems.map((item) => {
                          return (
                            <div className={styles.cartItem} key={item.product.id}>
                              <div className={styles.cartItemWrapper}>
                                {/* checkButton */}
                                <div className={styles.checkPart}>
                                  <button className={item.isChecked ? styles.checked : ''} onClick={() => checkButtonAction(item.product.id)}></button>
                                </div>
                                {/* thumbnail */}
                                <div className={styles.thumbnailPart}>
                                  <a target="__blank" href={`/product/${item.product.id}`}><img src={demo} alt="123" width={180} height={180} /></a>
                                </div>
                                {/* info */}
                                <div className={styles.infoPart}>
                                  <p className={styles.nameLabel}>{item.product.name}</p>
                                  <div className={styles.operationsParts}>
                                    {/* quantity */}
                                    <div className={styles.quantityPart + ' ' + styles.operationsPart}>
                                      <button 
                                        className={styles.subtractButton}
                                        onClick={() => subtractButtonAction(item.product.id)}
                                      >
                                        <GrFormSubtract />
                                      </button>
                                      <input type="number" 
                                        value={item.quantity}
                                        onChange={(e) => quantityChanged(item.product.id, e)}
                                      />
                                      <button 
                                        className={styles.plusButton}
                                        onClick={() => plusButtonAction(item.product.id)}
                                      >
                                        <GrFormAdd />
                                      </button>
                                    </div>
                                    {/* remove */}
                                    <div className={styles.removePart}>
                                      <button
                                        onClick={() => removeButtonAction(item.product.id)}
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                {/* price */}
                                <div className={styles.pricePart}>
                                  <p>{`$ ${item.product.price}`} <span>(taxed)</span></p>
                                </div>
                              </div>
                            </div>
                          )
                        }): 
                        <div>None</div>
                      }
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <div className={styles.footerPart}>
                      <div className={styles.totalItems}>Total: {quantity} items</div>
                      <div className={styles.totalPrice}>$ {totalPrice} <span>(taxed)</span></div>
                    </div>
                  </Card.Footer>
                </Card>
              </div>
            </div>
            <div className={styles.rightPart}>
              <div className={styles.checkContent}>
                <Card>
                  <Card.Header as='h5'>Total</Card.Header>
                  <Card.Body>
                    <div>
                      <table className={styles.orderTable}>
                        <tbody>
                          <tr>
                            <td>Counts</td>
                            <td className={styles.tdValue}>{quantity} items </td>
                          </tr>
                          <tr>
                            <td>Price</td>
                            <td className={styles.tdValue}>$ {totalPrice} <span>(taxed)</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <button 
                      className={(quantity > 0) ? styles.checkButton : styles.checkButton + ' ' + styles.disabled}
                      onClick={(checkoutButtonAction)}
                    >
                      Continue
                    </button>
                    <button
                      className={styles.removeAllButton}
                      onClick={removeAllButtonAction}
                    >
                      Remove All
                    </button>
                  </Card.Footer>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}