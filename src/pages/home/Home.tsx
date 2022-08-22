import React from "react";
import { Header, Footer, ProductRankingItem } from "../../components";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import demo1 from '../../assets/images/demo-1.jpg';
import demo2 from '../../assets/images/demo-2.jpg';
import demo3 from '../../assets/images/demo-3.jpg';
import styles from './Home.module.scss';

export const Home: React.FC = () => {
  return (
    <>
      <Header />
      {/* Carousels */}
      <section className={styles.section}>
        <div className={styles.sectionWrapper}>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={demo1}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>1</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={demo2}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>2</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={demo3}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>3</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </section>
      {/* Outdoor Gear Ranking */}
      <section className={styles.section}>
        <div className={styles.sectionWrapper}>
          <div className={styles.sectionTitle}>
            <h3>Outdoor Gear Ranking</h3>
            <p>Outdoor gears ranking</p>
          </div>
          <Container fluid>
            <Row>
              <Col lg={3}>
                <ProductRankingItem />
              </Col>
              <Col lg={3}>
                <ProductRankingItem />
              </Col>
              <Col lg={3}>
                <ProductRankingItem />
              </Col>
              <Col lg={3}>
                <ProductRankingItem />
              </Col>
              <Col lg={3}>
                <ProductRankingItem />
              </Col>
              <Col lg={3}>
                <ProductRankingItem />
              </Col>
              <Col lg={3}>
                <ProductRankingItem />
              </Col>
              <Col lg={3}>
                <ProductRankingItem />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/* New Arrivals */}
      <section className={styles.section}>
        <div className={styles.sectionWrapper}>
          <div className={styles.sectionTitle}>
            <h3>New Arrival Gear</h3>
            <p>New arrival gears</p>
          </div>
          <Container fluid>
            <Row>
              <Col lg={3}>
                <ProductRankingItem />
              </Col>
              <Col lg={3}>
                <ProductRankingItem />
              </Col>
              <Col lg={3}>
                <ProductRankingItem />
              </Col>
              <Col lg={3}>
                <ProductRankingItem />
              </Col>
              <Col lg={3}>
                <ProductRankingItem />
              </Col>
              <Col lg={3}>
                <ProductRankingItem />
              </Col>
              <Col lg={3}>
                <ProductRankingItem />
              </Col>
              <Col lg={3}>
                <ProductRankingItem />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      {/* Images Collection */}
      <section className={styles.section}>
        <div className={styles.sectionWrapper}>
          <div className={styles.sectionTitle}>
            <h3>Images Collections</h3>
          </div>
          <Container fluid>
            <Row>
              <Col lg={6}>
                <figure className={styles["image-wrapper"]}>
                  <img width={630} height={635} src="https://cdn-yotpo-images-production.yotpo.com/instagram/57/17866477811550857/medium.jpg" alt="" />
                </figure>
              </Col>
              <Col lg={6}>
                <Row>
                  <Col lg={6}>
                    <figure className={styles["image-wrapper"]}>
                      <img width={315} height={315} src="https://cdn-yotpo-images-production.yotpo.com/instagram/57/17866477811550857/medium.jpg" alt="" />
                    </figure>
                  </Col>
                  <Col lg={6}>
                    <figure className={styles["image-wrapper"]}>
                      <img width={315} height={315} src="https://cdn-yotpo-images-production.yotpo.com/instagram/57/17866477811550857/medium.jpg" alt="" />
                    </figure>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <figure className={styles["image-wrapper"]}>
                      <img width={315} height={315} src="https://cdn-yotpo-images-production.yotpo.com/instagram/57/17866477811550857/medium.jpg" alt="" />
                    </figure>
                  </Col>
                  <Col lg={6}>
                    <figure className={styles["image-wrapper"]}>
                      <img width={315} height={315} src="https://cdn-yotpo-images-production.yotpo.com/instagram/57/17866477811550857/medium.jpg" alt="" />
                    </figure>
                  </Col>
                </Row>
              </Col>
            </Row>
            <br />
            <Row>
              <Col lg={6}>
                <Row>
                  <Col lg={6}>
                    <figure className={styles["image-wrapper"]}>
                      <img width={315} height={315} src="https://cdn-yotpo-images-production.yotpo.com/instagram/57/17866477811550857/medium.jpg" alt="" />
                    </figure>
                  </Col>
                  <Col lg={6}>
                    <figure className={styles["image-wrapper"]}>
                      <img width={315} height={315} src="https://cdn-yotpo-images-production.yotpo.com/instagram/57/17866477811550857/medium.jpg" alt="" />
                    </figure>
                  </Col>
                </Row>
                <Row>
                  <Col lg={6}>
                    <figure className={styles["image-wrapper"]}>
                      <img width={315} height={315} src="https://cdn-yotpo-images-production.yotpo.com/instagram/57/17866477811550857/medium.jpg" alt="" />
                    </figure>
                  </Col>
                  <Col lg={6}>
                    <figure className={styles["image-wrapper"]}>
                      <img width={315} height={315} src="https://cdn-yotpo-images-production.yotpo.com/instagram/57/17866477811550857/medium.jpg" alt="" />
                    </figure>
                  </Col>
                </Row>
              </Col>
              <Col lg={6}>
                <figure className={styles["image-wrapper"]}>
                  <img width={630} height={635} src="https://cdn-yotpo-images-production.yotpo.com/instagram/57/17866477811550857/medium.jpg" alt="" />
                </figure>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
      <Footer />
    </>
  );
}