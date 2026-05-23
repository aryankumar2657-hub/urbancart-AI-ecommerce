import React, { useState } from "react";
import "./Product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import BoltIcon from "@mui/icons-material/Bolt";
import useFetch from "../../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";

const Product = () => {
  const id = useParams().id;
  const [selectedImg, setSelectedImg] = useState("img");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch(`/products/${id}?populate=*`);

  const productPayload = () => ({
    id: data.id,
    title: data.attributes.title,
    desc: data.attributes.desc,
    price: data.attributes.price,
    img: data.attributes.img?.data?.attributes?.url || data.attributes.img2?.data?.attributes?.url,
    quantity,
  });

  const handleAddToCart = () => {
    if (!data) return;
    dispatch(addToCart(productPayload()));
    setMessage("Added to cart successfully");
    setTimeout(() => setMessage(""), 1800);
  };

  const handleBuyNow = () => {
    if (!data) return;
    navigate("/checkout", { state: { buyNowItem: productPayload() } });
  };

  if (loading) return <div className="product statePage">Loading product...</div>;
  if (error || !data) return <div className="product statePage">Unable to load product. Please check API server.</div>;

  const imageOne = data?.attributes?.img?.data?.attributes?.url;
  const imageTwo = data?.attributes?.img2?.data?.attributes?.url || imageOne;
  const selectedUrl = selectedImg === "img2" ? imageTwo : imageOne;

  return (
    <div className="product">
      <div className="left">
        <div className="images">
          <img
            src={(process.env.REACT_APP_UPLOAD_URL || "http://localhost:1337") + imageOne}
            alt={data?.attributes?.title}
            onClick={() => setSelectedImg("img")}
          />
          <img
            src={(process.env.REACT_APP_UPLOAD_URL || "http://localhost:1337") + imageTwo}
            alt={data?.attributes?.title}
            onClick={() => setSelectedImg("img2")}
          />
        </div>
        <div className="mainImg">
          <img
            src={(process.env.REACT_APP_UPLOAD_URL || "http://localhost:1337") + selectedUrl}
            alt={data?.attributes?.title}
          />
        </div>
      </div>
      <div className="right">
        <span className="badge">{data?.attributes?.type || "new arrival"}</span>
        <h1>{data?.attributes?.title}</h1>
        <span className="price">₹{Number(data?.attributes?.price || 0).toLocaleString("en-IN")}</span>
        <p>{data?.attributes?.desc}</p>
        <div className="quantity">
          <button onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
        {message && <div className="successMsg">{message}</div>}
        <div className="actionRow">
          <button className="add" onClick={handleAddToCart}>
            <AddShoppingCartIcon /> ADD TO CART
          </button>
          <button className="buy" onClick={handleBuyNow}>
            <BoltIcon /> BUY NOW
          </button>
        </div>
        <div className="links">
          <div className="item"><FavoriteBorderIcon /> Wishlist UI</div>
          <div className="item"><BalanceIcon /> Compare UI</div>
        </div>
        <div className="info">
          <span>Delivery: Free above ₹999</span>
          <span>Payment: COD / UPI demo checkout</span>
          <span>Bill: Auto-generated after checkout</span>
        </div>
        <hr />
        <div className="info">
          <span>DESCRIPTION</span>
          <hr />
          <span>ADDITIONAL INFORMATION</span>
          <hr />
          <span>FAQ</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
