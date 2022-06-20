import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./About.css"

const About = () => {
    const [about, setAbout] = useState([])
    useEffect(() => {
      axios.get("http://localhost:8000/about")
        .then(response => {
           setAbout(response.data)
         })
      }, [])
    return (
        <div className='about'>
            <div className='container'>
                {about.map((item) => (
                <div className='about-main-div' key={item.id}>
                    <div className='about-images'>
                        <div className='about-images-vertical'>
                            <img className='about-first-pic' src={item.img1} alt="about pics" />
                            <img className='about-second-pic' src={item.img2} alt="about pics" />
                        </div>
                        <div style={{height: "40%"}}>
                            <img className='about-third-pic' src={item.img3} alt="about pics" />
                         </div>
                    </div>
                    <div className='about-text'>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
};

export default About;