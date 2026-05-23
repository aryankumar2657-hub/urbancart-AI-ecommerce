import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../redux/cartReducer";
import "./Checkout.scss";

const formatPrice = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

const Checkout = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  const directProduct = location.state?.buyNowItem;
  const products = directProduct ? [directProduct] : cartProducts;
  const [order, setOrder] = useState(null);
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    paymentMode: "Cash on Delivery",
  });

  const subtotal = useMemo(
    () => products.reduce((total, item) => total + item.price * item.quantity, 0),
    [products]
  );
  const delivery = subtotal >= 999 || subtotal === 0 ? 0 : 99;
  const tax = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + delivery + tax;

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!products.length) return;

    const newOrder = {
      id: `UC-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleString(),
      customer,
      products,
      subtotal,
      delivery,
      tax,
      grandTotal,
      status: "Order Placed",
      keepCart: Boolean(directProduct),
    };

    dispatch(placeOrder(newOrder));
    setOrder(newOrder);
  };

  if (order) {
    return (
      <div className="checkout successPage">
        <div className="billCard">
          <div className="successBadge">Success</div>
          <h1>Order placed successfully</h1>
          <p>Your bill has been generated. This transaction is saved locally for demo/resume use.</p>

          <div className="billMeta">
            <span>Bill No: <b>{order.id}</b></span>
            <span>Date: <b>{order.date}</b></span>
            <span>Status: <b>{order.status}</b></span>
          </div>

          <div className="billItems">
            {order.products.map((item) => (
              <div className="billItem" key={item.id}>
                <span>{item.title} × {item.quantity}</span>
                <b>{formatPrice(item.price * item.quantity)}</b>
              </div>
            ))}
          </div>

          <div className="billTotal">
            <span>Grand Total</span>
            <b>{formatPrice(order.grandTotal)}</b>
          </div>

          <div className="actions">
            <button onClick={() => window.print()}>Print Bill</button>
            <Link className="linkBtn" to="/orders">View Transactions</Link>
            <Link className="outlineBtn" to="/">Continue Shopping</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkoutHeader">
        <span>Secure checkout</span>
        <h1>Complete your order</h1>
        <p>Demo checkout with customer details, bill generation, and saved local transactions.</p>
      </div>

      {!products.length ? (
        <div className="emptyCheckout">
          <h2>Your cart is empty</h2>
          <Link to="/">Shop products</Link>
        </div>
      ) : (
        <div className="checkoutGrid">
          <form className="checkoutForm" onSubmit={handleSubmit}>
            <h2>Customer Details</h2>
            <input name="name" placeholder="Full name" value={customer.name} onChange={handleChange} required />
            <input name="phone" placeholder="Phone number" value={customer.phone} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email address" value={customer.email} onChange={handleChange} required />
            <textarea name="address" placeholder="Delivery address" value={customer.address} onChange={handleChange} required />
            <select name="paymentMode" value={customer.paymentMode} onChange={handleChange}>
              <option>Cash on Delivery</option>
              <option>UPI on Delivery</option>
              <option>Card on Delivery</option>
            </select>
            <button type="submit">Place Order & Generate Bill</button>
          </form>

          <div className="summaryCard">
            <h2>Order Summary</h2>
            {products.map((item) => (
              <div className="summaryItem" key={item.id}>
                <img src={(process.env.REACT_APP_UPLOAD_URL || "http://localhost:1337") + item.img} alt={item.title} />
                <div>
                  <h3>{item.title}</h3>
                  <p>Qty: {item.quantity}</p>
                </div>
                <b>{formatPrice(item.price * item.quantity)}</b>
              </div>
            ))}
            <div className="priceLine"><span>Subtotal</span><b>{formatPrice(subtotal)}</b></div>
            <div className="priceLine"><span>Delivery</span><b>{delivery === 0 ? "Free" : formatPrice(delivery)}</b></div>
            <div className="priceLine"><span>GST Demo 5%</span><b>{formatPrice(tax)}</b></div>
            <div className="grandTotal"><span>Total</span><b>{formatPrice(grandTotal)}</b></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
