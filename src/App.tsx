import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, NavLink } from "react-router-dom";
import {
  Home,
  ProductDetail,
  Store,
  Cart,
  SignIn,
  SignUp,
  Purchase,
  OrderList,
  NotFound
} from "./pages";
import { useSelector, useDispatch } from "./redux/hooks";
import { getUserCart } from "./redux/cart";
import "bootstrap/dist/css/bootstrap.min.css";

const ProtectedRoute = ({
  isAuthenticated,
  redirectPath = '/signin',
  children,
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }
  return children;
};

function App() {
  const accessToken = useSelector(state => state.user.accessToken);
  
  const dispatch = useDispatch();

  useEffect(() => {
    if (accessToken !== null) {
      dispatch(getUserCart(accessToken));
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* localhost:port/ */}
        <Route path="/" element={<Home />} />
        {/* localhost:port/product/1 */}
        <Route path="product/:id" element={<ProductDetail />} />
        {/* localhost:port/store/ */}
        <Route path="store" element={<Store />} />
        {/* localhost:port/cart/ */}
        <Route path="cart" element={<Cart />} />
        {/* localhost:port/signup/ */}
        <Route path="signup" element={<SignUp />} />
        {/* localhost:port/signin/ */}
        <Route path="signin" element={<SignIn />} />
        {/* localhost:port/user/orders */}
        <Route 
          path="user/orders" 
          element={
            <ProtectedRoute 
              isAuthenticated={accessToken !== null}
              redirectPath="/signin"
            >
              <OrderList />
            </ProtectedRoute>}
        />
        <Route
          path="order/:orderId"
          element={
            <ProtectedRoute
              isAuthenticated={accessToken !== null}
              redirectPath="/signin"
            >
              <Purchase />
            </ProtectedRoute>
          }
        />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;
