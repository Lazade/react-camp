import React from "react";
import { Header, Footer } from "../../components";
import styles from './ProductDetail.module.scss';

export const ProductDetail: React.FC = () => {
  return(
    <>
      <Header />
      <div>
        {/* Product Floating Nav */}
        <div>
          {/* Product Image */}
          <div>
            Product Images
          </div>
          {/* Product Intro */}
          <div>
            Product Intro
          </div>
          {/* Product Spec */}
          <div>
            Product Spec
          </div>
          {/* Product Detail */}
          <div>
            Product Detail
          </div>
          {/* Product Review */}
          <div>
            Product Review
          </div>
        </div>
        {/* Product Cart */}
        <div>
          Product Cart
        </div>
      </div>
      <Footer />
    </>
  );
}