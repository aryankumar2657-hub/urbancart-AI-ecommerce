import React from "react";
import "./Categories.scss";
import { Link } from "react-router-dom";

const collectionTiles = [
  {
    title: "Workwear",
    subtitle: "Clean office-ready essentials",
    link: "/products/1",
    image: "https://images.pexels.com/photos/769729/pexels-photo-769729.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "Street Style",
    subtitle: "Oversized fits and sneakers",
    link: "/products/2",
    image: "https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "Accessories",
    subtitle: "Complete the look",
    link: "/products/1",
    image: "https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "Footwear",
    subtitle: "Comfort-first daily pairs",
    link: "/products/2",
    image: "https://images.pexels.com/photos/1456735/pexels-photo-1456735.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

const Categories = () => {
  return (
    <section className="categories">
      <div className="sectionHeader">
        <span>Shop by mood</span>
        <h2>Curated collections for every day</h2>
      </div>
      <div className="categoryGrid">
        {collectionTiles.map((tile) => (
          <Link to={tile.link} className="tile link" key={tile.title}>
            <img src={tile.image} alt={tile.title} />
            <div className="tileContent">
              <span>{tile.subtitle}</span>
              <h3>{tile.title}</h3>
              <button>Explore</button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
