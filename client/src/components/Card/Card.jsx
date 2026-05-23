import React from "react";
import "./Card.scss";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  const uploadUrl = process.env.REACT_APP_UPLOAD_URL || "http://localhost:1337";
  const mainImage = item.attributes?.img?.data?.attributes?.url;
  const secondImage = item.attributes?.img2?.data?.attributes?.url || mainImage;

  return (
    <Link className="link" to={`/product/${item.id}`}>
      <div className="card">
        <div className="image">
          {item?.attributes.isNew && <span>New Season</span>}
          {mainImage && (
            <img
              src={uploadUrl + mainImage}
              alt={item?.attributes.title}
              className="mainImg"
            />
          )}
          {secondImage && (
            <img
              src={uploadUrl + secondImage}
              alt={item?.attributes.title}
              className="secondImg"
            />
          )}
        </div>
        <h2>{item?.attributes.title}</h2>
        <div className="prices">
          <h3>₹{Number(item.oldPrice || item?.attributes.price + 500).toLocaleString("en-IN")}</h3>
          <h3>₹{Number(item?.attributes.price || 0).toLocaleString("en-IN")}</h3>
        </div>
      </div>
    </Link>
  );
};

export default Card;
