import React from "react";
import "./List.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";

const List = ({ catId, subCats = [], maxPrice, sort }) => {
  const categoryFilter = catId
    ? `&[filters][categories][id][$eq]=${catId}`
    : "";

  const subCategoryFilter = subCats
    .map((item) => `&[filters][sub_categories][id][$eq]=${item}`)
    .join("");

  const sortQuery = sort ? `&sort=price:${sort}` : "";

  const { data, loading, error } = useFetch(
    `/products?populate=*&[filters][price][$lte]=${maxPrice}${categoryFilter}${subCategoryFilter}${sortQuery}`
  );

  return (
    <div className="list">
      {error ? (
        <div className="listState">Unable to load products. Check Strapi API permissions.</div>
      ) : loading ? (
        <div className="listState">Loading products...</div>
      ) : data?.length ? (
        data.map((item) => <Card item={item} key={item.id} />)
      ) : (
        <div className="listState">No products found in this category.</div>
      )}
    </div>
  );
};
export default List;
