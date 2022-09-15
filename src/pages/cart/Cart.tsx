import React, { useEffect } from "react";
import { Header, Footer } from "../../components";
import { Card } from "react-bootstrap";
import { GrFormSubtract, GrFormAdd } from 'react-icons/gr'
import styles from './Cart.module.scss';
import demo from '../../assets/images/demo-5.jpg';
import { useSelector, useDispatch } from "../../redux/hooks";
import { cartSlice, checkoutAction } from "../../redux/cart";
// import { useNavigate } from "react-router-dom";

export const Cart: React.FC = () => {

  const cartItems = useSelector(state => state.cart.cartItems);
  const isAllChecked = useSelector(state => state.cart.isAllChecked);
  const quantity = useSelector(state => state.cart.quantity);
  const totalPrice = useSelector(state => state.cart.totalPrice);
  
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    dispatch(cartSlice.actions.updateState());
  }, []);

  const selectAllButtonAction = () => {
    dispatch(cartSlice.actions.handleSelectAllButtonAction(!isAllChecked))
    dispatch(cartSlice.actions.updateState());
  }

  const checkButtonAction = (id: string) => {
    dispatch(cartSlice.actions.handleCheckButtonAction(id));
    dispatch(cartSlice.actions.updateState());
  }

  const subtractButtonAction = (id: string) => {
    dispatch(cartSlice.actions.handleSubtractButtonAction(id));
    dispatch(cartSlice.actions.updateState());
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

  const checkoutButtonAction = () => {
    if (quantity === 0) { return }
    // console.log()
    dispatch(checkoutAction(cartItems));
    // navigate('/placeOrder');
  }

  return (
    <>
      <Header />
      {/* Todo */}
      <div className={styles.cart}>
        <div className={styles.cartWrapper}>
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
                        (cartItems.length > 0) &&
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
                                      <button>Remove</button>
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
                        })
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
                      onClick={()=>checkoutButtonAction()}
                    >
                      Continue
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