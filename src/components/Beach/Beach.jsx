import axios from 'axios';
import React, { useEffect, useState } from 'react';
import New from '../New/New';
import BeachCard from './BeachCard';

const Beach= () => {
    const [beach, setBeach] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/everyday`)
            .then(response => {
                setBeach([...response.data])
            })
    })
        

    return (
        <div style={{backgroundColor: "#ECECEC"}}>
            <div className='container'>
                <h3 className='summer-title'>Одежда на пляж</h3>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {beach.map((item, index) => (
                        <BeachCard item={item} key={index}/>
                    ))}
                </div>
            </div>
            <New/>
         </div>
                
    );
};

export default Beach;