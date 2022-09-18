import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  ProductDetail,
  Store,
  Cart,
  SignIn,
  SignUp,
  Purchase,
} from "./pages";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* localhost:port/ */}
        <Route path="/" element={<Home />} />
        {/* localhost:port/product/1 */}
        <Route path="product/:id" element={<ProductDetail />} />
        {/* localhost:port/store/ */}
        <Route path="store" element={<Store />}></Route>
        {/* localhost:port/cart/ */}
        <Route path="cart" element={<Cart />}></Route>
        {/* localhost:port/purchase/ */}
        <Route path="purchase" element={<Purchase />}></Route>
        {/* localhost:port/signup/ */}
        <Route path="signup" element={<SignUp />}></Route>
        {/* localhost:port/signin/ */}
        <Route path="signin" element={<SignIn />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
