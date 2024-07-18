import React from 'react';
import Slider from 'react-slick';
import slider1 from '../../assets/Frontend_Assets/slider-4.jpg';
import slider2 from '../../assets/Frontend_Assets/slider-2.jpg';
import slider3 from '../../assets/Frontend_Assets/slider-3.jpg';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Hero.css';

const Hero = () => {
    const slides = [
        {
            image: slider1,
            title: "Welcome to Our Store",
            subtitle: "Discover the best products available here at unbeatable prices",
            buttonText: "Shop Now and Enjoy",
            buttonLink: "#"
        },
        {
            image: slider2,
            title: "Exclusive Deals Just for You",
            subtitle: "Don't miss out on our special offers and amazing discounts",
            buttonText: "View Deals and Save Big",
            buttonLink: "#"
        },
        {
            image: slider3,
            title: "New Arrivals Just In",
            subtitle: "Check out the latest collection and stay ahead of the trends",
            buttonText: "Explore the New Collection",
            buttonLink: "#"
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div className="hero-slider">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <div key={index} className="slide">
                        <img src={slide.image} alt={`Slide ${index + 1}`} />
                        <div className="overlay"></div>
                        <div className="slide-content">
                            <h1>{slide.title}</h1>
                            <h2>{slide.subtitle}</h2>
                            <a href={slide.buttonLink} className="button btn">{slide.buttonText}</a>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow custom-next`}
            style={{ ...style, display: 'block' }}
            onClick={onClick}
        />
    );
}

const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow custom-prev`}
            style={{ ...style, display: 'block' }}
            onClick={onClick}
        />
    );
}

export default Hero;
