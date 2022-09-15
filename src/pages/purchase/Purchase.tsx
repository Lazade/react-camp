import React, { useEffect } from "react";
import { useSelector, useDispatch } from "../../redux/hooks";
import { useParams } from 'react-router-dom';
import { Header, Footer } from "../../components";
import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { purchaseSlice, getOrder } from "../../redux/purchase";
import styles from './Purchase.module.scss';
import demo5 from '../../assets/images/demo-5.jpg';

export const Purchase: React.FC = () => {

  const isScroll = useSelector((state => state.purchase.isScroll));
  const hasSubmit = useSelector((state => state.purchase.hasSubmit));
  const currentOrder = useSelector((state => state.purchase.currentOrder))
  
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
                Credit Card Info
              </Card.Header>
              <Card.Body>
                <div>
                  <Form>
                    <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationFormik01">
                        <Form.Label>First name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                        />
                      </Form.Group>
                      <Form.Group as={Col} md="6" controlId="validationFormik02">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                        />
                      </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Credit Card Number</Form.Label>
                      <Form.Control 
                        type=""
                        name="creditCardNumber" 
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicDate">
                      <Form.Label>Expire Date</Form.Label>
                      <Form.Control 
                        type="Month" 
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control 
                        type="password" 
                        name="cvv"
                      />
                    </Form.Group>
                    <Button variant="primary">
                      Submit
                    </Button>
                  </Form>
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
                <div className={styles.purchaseSummeryOperations}>
                  <button disabled={!hasSubmit} className={styles.payButton}>Pay</button>
                  <button className={styles.cancelButton}>Cancel</button>
                </div>
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