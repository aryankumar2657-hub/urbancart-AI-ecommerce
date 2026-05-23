import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import Cart from "../Cart/Cart";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const products = useSelector((state) => state.cart.products);

  const cartQty = products.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="navbar">
      <div className="announcement">
        <LocalShippingOutlinedIcon />
        Free shipping on orders above ₹999 · New summer collection live
      </div>

      <div className="wrapper">
        <div className="brand">
          <Link className="link logo" to="/">
            UrbanCart
          </Link>

          <span className="tagline">
            Premium everyday fashion
          </span>
        </div>

        <div className="navLinks">
          <Link className="link" to="/">
            Home
          </Link>

          <Link className="link" to="/products/1">
            Men
          </Link>

          <Link className="link" to="/products/2">
            Women
          </Link>

          <Link className="link" to="/products/3">
            Kids
          </Link>

          <Link className="link" to="/orders">
            Bills
          </Link>
        </div>

        <div className="icons">
          <div className="searchBox">
            <SearchIcon />
            <span>Search products</span>
          </div>

          <PersonOutlineOutlinedIcon />

          <FavoriteBorderOutlinedIcon />

          <Link
            className="orderIcon link"
            to="/orders"
            title="Transactions"
          >
            <ReceiptLongIcon />
          </Link>

          <div
            className="cartIcon"
            onClick={() => setOpen(!open)}
          >
            <ShoppingCartOutlinedIcon />
            <span>{cartQty}</span>
          </div>
        </div>
      </div>

      {open && <Cart />}
    </div>
  );
};

export default Navbar;
