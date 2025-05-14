import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from "./pages/Navigation"

import './index.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Products from './components/Product.jsx'
import ProductDetails from './components/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import ProfilePage from './pages/Profile.jsx'
import ProtectedRoute from './utils/ProtectedRoute.jsx'
import Checkout from './components/Checkout.jsx'

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<Products /> } />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute> } />
          <Route path='/checkout' element={<Checkout />}/>
          {/* <Route path="/notification" element={<Notification />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
