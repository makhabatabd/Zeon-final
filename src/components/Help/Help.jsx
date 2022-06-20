import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./Help.css"


const Help = () => {
    const [help, setHelp] = useState([])
  const [image, setImage] = useState([])
  const [text, setText] = useState(null);
  const toggle = (index) => {
    if (text === index) {
      return setText(null)
    }
    setText(index)
  }
      useEffect(() => {
      axios.get("http://localhost:8000/help")
        .then(response => {
           setHelp(prev => [...prev, ...response.data])
         })
      }, [])
    useEffect(() => {
      axios.get("http://localhost:8000/image")
        .then(response => {
           setImage(response.data)
         })
    }, [])
    return (
        <div className='help-main-div'>
            <div className='container'>
                <div className='help-inner-div'>
                    {image.map((item) => (
                        <div className='help-inner-image' key={item.id}>
                        <img src={item.img} alt="help-main-pic" />
                    </div>
                    ))}
                    <div className='help-inner-info'>
                        <h3>Помощь</h3>
                        {help.map((item, index) => (
                           <div className="help-outter-card" key={item.id}>
                              <div className="help-inner-card" onClick={()=>toggle(index)} >
                                <h4>{item.title}</h4>
                                {text === index ? (
                                  <img
                                    src={require("../../images/arrow-down.png")}
                                    alt="arrow down"
                                  />
                                ) : (
                                  <img
                                    src={require("../../images/arrow-up.png")}
                                    alt="arrow up"
                                  />
                                )}
                              </div>
                            <p className={text === index ? "help-extra" : "help-extra-info"}>{item.text}</p> 
                            </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;