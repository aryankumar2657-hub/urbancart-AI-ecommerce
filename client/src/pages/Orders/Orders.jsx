import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Orders.scss";

const formatPrice = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

const Orders = () => {
  const orders = useSelector((state) => state.cart.orders || []);

  return (
    <div className="ordersPage">
      <div className="ordersHeader">
        <span>Transactions</span>
        <h1>Order bills & history</h1>
        <p>Every demo purchase is saved locally so you can show bill generation and transaction flow in your project.</p>
      </div>

      {!orders.length ? (
        <div className="emptyOrders">
          <h2>No transactions yet</h2>
          <p>Place an order from the cart or Buy Now button to generate your first bill.</p>
          <Link to="/">Start shopping</Link>
        </div>
      ) : (
        <div className="ordersList">
          {orders.map((order) => (
            <div className="orderCard" key={order.id}>
              <div className="orderTop">
                <div>
                  <h2>{order.id}</h2>
                  <p>{order.date}</p>
                </div>
                <span>{order.status}</span>
              </div>

              <div className="customerInfo">
                <b>{order.customer.name}</b>
                <span>{order.customer.phone}</span>
                <span>{order.customer.paymentMode}</span>
              </div>

              <div className="orderItems">
                {order.products.map((item) => (
                  <div key={item.id}>
                    <span>{item.title} × {item.quantity}</span>
                    <b>{formatPrice(item.price * item.quantity)}</b>
                  </div>
                ))}
              </div>

              <div className="orderTotal">
                <span>Total Paid</span>
                <b>{formatPrice(order.grandTotal)}</b>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
