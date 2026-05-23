import React from "react";
import "./Cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
  resetCart,
} from "../../redux/cartReducer";

const formatPrice = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const totalPrice = products.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <div className="cart">
      <div className="cartHeader">
        <h1>Your Cart</h1>
        <span>{products.length} items</span>
      </div>

      {!products.length ? (
        <div className="emptyCart">
          <ReceiptLongIcon />
          <h2>Your cart is empty</h2>
          <p>Add products to generate a checkout bill.</p>
        </div>
      ) : (
        <>
          {products.map((item) => (
            <div className="item" key={item.id}>
              <img src={(process.env.REACT_APP_UPLOAD_URL || "http://localhost:1337") + item.img} alt={item.title} />
              <div className="details">
                <h1>{item.title}</h1>
                <p>{item.desc?.substring(0, 90)}</p>
                <div className="itemControls">
                  <button onClick={() => dispatch(decreaseQuantity(item.id))}>
                    <RemoveIcon fontSize="small" />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(increaseQuantity(item.id))}>
                    <AddIcon fontSize="small" />
                  </button>
                </div>
                <div className="price">
                  {item.quantity} × {formatPrice(item.price)} = {formatPrice(item.quantity * item.price)}
                </div>
              </div>
              <DeleteOutlinedIcon
                className="delete"
                onClick={() => dispatch(removeItem(item.id))}
              />
            </div>
          ))}

          <div className="total">
            <span>SUBTOTAL</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>

          <Link className="checkoutBtn" to="/checkout">
            PROCEED TO CHECKOUT
          </Link>
          <span className="reset" onClick={() => dispatch(resetCart())}>
            Reset Cart
          </span>
        </>
      )}
    </div>
  );
};

export default Cart;
