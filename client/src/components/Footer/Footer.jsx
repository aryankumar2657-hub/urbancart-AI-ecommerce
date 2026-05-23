import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="top">
        <div className="item">
          <h1>UrbanCart</h1>
          <span>A modern e-commerce storefront built with React, API integration, cart management and a polished responsive UI.</span>
        </div>
        <div className="item">
          <h1>Collections</h1>
          <span>Women</span>
          <span>Men</span>
          <span>Accessories</span>
          <span>Footwear</span>
        </div>
        <div className="item">
          <h1>Support</h1>
          <span>Order Tracking</span>
          <span>Returns</span>
          <span>Shipping Policy</span>
          <span>Customer Care</span>
        </div>
        <div className="item">
          <h1>Why Shop Here</h1>
          <span>Clean product UI, shopping cart flow, filters, product pages and payment-ready layout for portfolio presentation.</span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">UrbanCart</span>
          <span className="copyright">© 2026 Portfolio E-Commerce Project</span>
        </div>
        <div className="right">
          <img src="/img/payment.png" alt="Payment methods" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
