import React, { useEffect } from "react";
import { useSelector, useDispatch } from "../../redux/hooks";
import { useParams } from 'react-router-dom';
import { Header, Footer } from "../../components";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { purchaseSlice, getOrder, payOrder } from "../../redux/purchase";
import styles from './Purchase.module.scss';
import demo5 from '../../assets/images/demo-5.jpg';

export const Purchase: React.FC = () => {

  const isScroll = useSelector((state => state.purchase.isScroll));
  const hasSubmit = useSelector((state => state.purchase.hasSubmit));
  const currentOrder = useSelector((state => state.purchase.currentOrder));
  const prePurchaseInfo = useSelector((state => state.purchase.prePurchaseInfo));
  
  const dispatch = useDispatch();
  const params = useParams()

  useEffect(() => {
    window.addEventListener("scroll", () => {
      dispatch(purchaseSlice.actions.updateIsScroll(window.scrollY > 100));
    })
  }, [])

  useEffect(() => {
    const orderId = params.orderId;
    if (orderId) {
      dispatch(getOrder(orderId));
    }
  }, [params])

  const nameInputChange = (event: React.BaseSyntheticEvent) => {
    const value = event.target.value;
    dispatch(purchaseSlice.actions.handleNameInputChange(value));
  }

  const emailInputChange = (event: React.BaseSyntheticEvent) => {
    const value = event.target.value;
    dispatch(purchaseSlice.actions.handleEmailInputChange(value));
  }

  const creditCardNumberInputChange = (event: React.BaseSyntheticEvent) => {
    const value = event.target.value;
    dispatch(purchaseSlice.actions.handleCreditCardNumberInputChange(value));
  }

  const expireDateInputChange = (event: React.BaseSyntheticEvent) => {
    const value = event.target.value;
    dispatch(purchaseSlice.actions.handleExpiredDateInputChange(value));
  }

  const cvvInputChange = (event: React.BaseSyntheticEvent) => {
    const value = event.target.value;
    dispatch(purchaseSlice.actions.handleCvvInputChange(value));
  }

  const payOrderAction = () => {
    if (currentOrder !== null) {
      const orderId = currentOrder._id;
      dispatch(payOrder({ orderId, prePurchaseInfo }));
    }
    
  }

  return (
    <>
    <Header/>
    <div className={styles.purchasePage}>
      <div className={styles.purchasePageWrapper}>
        <div className={styles.innerContent}>
          {/* left part */}
          <div className={styles.leftPart}>
            <div className={styles.leftPartContainer}>
            <div className={styles.section}>
              <Card>
                <Card.Header as="h5">
                  Purchasing Items
                </Card.Header>
                <Card.Body>
                  <div className={styles.purchasingItemsInner}>
                    {
                      currentOrder &&
                      currentOrder.orderItems.map((item) => {
                        return (
                          <div key={item._id} className={styles.purchasingItem}>
                            <div className={styles.purchasingItemWrapper}>
                              {/* image */}
                              <div className={styles.itemImage}>
                                <img src={demo5} alt="demo" />
                              </div>
                              <div className={styles.itemInfo}>
                                <div className={styles.nameInfo}>{item.name}</div>
                                <div className={styles.quanityInfo}>Quantity: <span className={styles.quanitySpan}>{item.quantity}</span></div>
                                <div className={styles.priceInfo}>
                                  Price: 
                                  <span className={styles.priceSpan}>$ {item.cost}</span>
                                  <span className={styles.taxSpan}>(taxed)</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className={styles.section}>
            <Card>
              <Card.Header as="h5">
                Payment Information
              </Card.Header>
              <Card.Body>
                <div>
                  {
                    currentOrder?.status === "PENDING" &&
                    <Form>
                      <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationFormik01">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={prePurchaseInfo.name}
                            onChange={(e) => nameInputChange(e)}
                          />
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationFormik02">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="text"
                            name="email"
                            value={prePurchaseInfo.email}
                            onChange={(e) => emailInputChange(e)}
                          />
                        </Form.Group>
                      </Row>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Credit Card Number</Form.Label>
                        <Form.Control 
                          type=""
                          name="creditCardNumber"
                          value={prePurchaseInfo.creditCardNumber}
                          onChange={(e) => creditCardNumberInputChange(e)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicDate">
                        <Form.Label>Expire Date</Form.Label>
                        <Form.Control 
                          type="Month"
                          value={prePurchaseInfo.expireDate}
                          onChange={(e) => expireDateInputChange(e)}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control 
                          type="password" 
                          name="cvv"
                          value={prePurchaseInfo.cvv}
                          onChange={(e) => cvvInputChange(e)}
                        />
                      </Form.Group>
                    </Form>
                  }
                  {
                    currentOrder?.status === "COMPLETED" &&
                    <Form>
                      <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationFormik01">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            disabled
                            value={currentOrder?.purchaseInfo?.name}
                          />
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationFormik02">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            disabled
                            value={currentOrder?.purchaseInfo?.email}
                          />
                        </Form.Group>
                      </Row>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Credit Card Number</Form.Label>
                        <Form.Control 
                          type=""
                          name="creditCardNumber"
                          disabled
                          value={currentOrder?.purchaseInfo?.creditCardNumber}
                        />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicDate">
                        <Form.Label>Expire Date</Form.Label>
                        <Form.Control 
                          type="Month" 
                          disabled
                          value={currentOrder?.purchaseInfo?.expireDate}
                        />
                      </Form.Group>
                    </Form>
                  }
                </div>
              </Card.Body>
            </Card>
            </div>
            </div>
          </div>
          {/* right floating part */}
          <div className={styles.rightPart}>
            <div className={isScroll ? styles.rightPartFixed : ''}>
            {/* pay summery */}
            <Card>
              <Card.Header as='h5'>Summery</Card.Header>
              <Card.Body>
                <div className={styles.purchaseSummeryContents}>
                  <h5 className={styles.title}>Content</h5>
                  <table className={styles.orderTable}>
                    <tbody>
                      <tr className={styles.orderSummeryNormalRow}>
                        <td>Counts</td>
                        <td>{currentOrder&& currentOrder.totalQuantity}</td>
                      </tr>
                      <tr className={styles.orderSummeryNormalRow}>
                        <td>Price</td>
                        <td>$ {currentOrder&& currentOrder.costPrice}</td>
                      </tr>
                      <tr className={styles.orderSummeryNormalRow}>
                        <td>Delivery fee</td>
                        <td>$ 0</td>
                      </tr>
                      <tr className={styles.orderSummeryNormalRow}>
                        <td><div className={styles.lineBox}></div></td>
                        <td><div className={styles.lineBox}></div></td>
                      </tr>
                      <tr className={styles.orderSummeryTotalRow}>
                        <td>Total</td>
                        <td>$ {currentOrder&& currentOrder.costPrice}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card.Body>
              <Card.Footer>
                {
                  currentOrder?.status === "PENDING" ?
                  <div className={styles.purchaseSummeryOperations}>
                    <button className={styles.payButton} onClick={payOrderAction}>Pay</button>
                    <button className={styles.cancelButton}>Cancel</button>
                  </div> :
                  <div>{currentOrder?.status}</div>
                }
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