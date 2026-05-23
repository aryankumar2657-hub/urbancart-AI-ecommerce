import React, { useState } from "react";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import WestOutlinedIcon from "@mui/icons-material/WestOutlined";
import "./Slider.scss";

const slides = [
  {
    image: "https://images.pexels.com/photos/318236/pexels-photo-318236.jpeg?auto=compress&cs=tinysrgb&w=1600",
    eyebrow: "New Arrival 2026",
    title: "Build your everyday wardrobe with confidence",
    copy: "Minimal, comfortable and premium outfits curated for college, office and weekends.",
  },
  {
    image: "https://images.pexels.com/photos/3765175/pexels-photo-3765175.jpeg?auto=compress&cs=tinysrgb&w=1600",
    eyebrow: "Fresh Fits",
    title: "Modern fashion that feels effortless",
    copy: "Explore clean styles, soft textures and statement essentials in one place.",
  },
  {
    image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1600",
    eyebrow: "Limited Deals",
    title: "Upgrade your look without overspending",
    copy: "Smart seasonal offers on best-selling collections and accessories.",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => setCurrentSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
  const nextSlide = () => setCurrentSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);

  return (
    <section className="slider">
      <div className="container" style={{ transform: `translateX(-${currentSlide * 100}vw)` }}>
        {slides.map((slide) => (
          <div className="slide" key={slide.title}>
            <img src={slide.image} alt={slide.title} />
            <div className="overlay" />
            <div className="heroContent">
              <span>{slide.eyebrow}</span>
              <h1>{slide.title}</h1>
              <p>{slide.copy}</p>
              <button>Shop Collection</button>
            </div>
          </div>
        ))}
      </div>
      <div className="icons">
        <button className="icon" onClick={prevSlide}><WestOutlinedIcon /></button>
        <button className="icon" onClick={nextSlide}><EastOutlinedIcon /></button>
      </div>
    </section>
  );
};

export default Slider;
