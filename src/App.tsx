import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, ProductDetail } from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='product/:id' element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
