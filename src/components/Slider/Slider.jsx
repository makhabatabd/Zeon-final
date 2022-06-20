import React from 'react';
import "react-alice-carousel/lib/alice-carousel.css"
import { useNavigate } from 'react-router-dom';
import "./Slider.css"
import SliderComponent from "react-slick"
const Slider = () => {
    const navigate = useNavigate()
    const settings = {
    dots: true,
      infinite: true,
      speed: 700,
      slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, 
    autoplay: true, 
      easing: true
    }
    return (
                <div className='container-slider'>
                <SliderComponent className='slider' {...settings} >
                 <div className='slider-main-div' onClick={()=> navigate("/summer")}>
                    <div className='slider-left'>
                        <h1>Lorem</h1>
                        <h2>ipsum</h2>
                        <p>Lorem Lorem</p>
                        <p>Ipsum Ipsum</p>
                    </div>
                    <img className='img' src="https://cdn.discordapp.com/attachments/981039569258557442/981421599955746826/unknown.png" alt="slider image" />
                    <div className='slider-right'>
                        <h3>Sale</h3>
                        <p>30%</p>
                        <h4>for all</h4>
                    </div>
                </div>
                 <div className='slider-main-div'>
                    <div className='slider-left'>
                        <h1>Lorem</h1>
                        <h2>ipsum</h2>
                        <p>Lorem Lorem</p>
                        <p>Ipsum Ipsum</p>
                    </div>
                    <img className='img' src="https://cdn.discordapp.com/attachments/981039569258557442/981408439408418866/unknown.png" alt="slider image" />
                    <div className='slider-right'>
                        <h3>Sale</h3>
                        <p>30%</p>
                        <h4>for all</h4>
                    </div>
                </div>
                 <div className='slider-main-div'>
                    <div className='slider-left'>
                        <h1>Lorem</h1>
                        <h2>ipsum</h2>
                        <p>Lorem Lorem</p>
                        <p>Ipsum Ipsum</p>
                    </div>
                    <img className='img' src="https://cdn.discordapp.com/attachments/981039569258557442/981408844779515934/unknown.png" alt="slider image" />
                    <div className='slider-right'>
                        <h3>Sale</h3>
                        <p>30%</p>
                        <h4>for all</h4>
                    </div>
                </div>
            </SliderComponent>
            </div>
    );
};
export default Slider;

