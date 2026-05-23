import React from "react";
import Card from "../Card/Card";
import "./FeaturedProducts.scss";
import useFetch from "../../hooks/useFetch";

const FeaturedProducts = ({ type }) => {
  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][type][$eq]=${type}`
  );

  const title = type === "featured" ? "Editor picks" : "Trending now";
  const copy = type === "featured"
    ? "Hand-picked pieces with clean cuts, easy colors and daily comfort for a premium shopping experience."
    : "Popular products customers are adding to their carts this week, refreshed with a modern storefront layout.";

  return (
    <section className="featuredProducts">
      <div className="top">
        <div>
          <span>{type} collection</span>
          <h1>{title}</h1>
        </div>
        <p>{copy}</p>
      </div>
      <div className="bottom">
        {error
          ? <div className="state">Unable to load products. Start the API server and try again.</div>
          : loading
          ? <div className="state">Loading products...</div>
          : data?.map((item) => <Card item={item} key={item.id} />)}
      </div>
    </section>
  );
};

export default FeaturedProducts;
