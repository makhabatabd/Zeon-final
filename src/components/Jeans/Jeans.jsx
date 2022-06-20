import axios from 'axios';
import React, { useEffect, useState } from 'react';
import New from '../New/New';
import JeansCard from './JeansCard';

const Jeans = () => {
    const [jeans, setJeans] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/everyday`)
            .then(response => {
                setJeans([...response.data])
            })
    })
        

    return (
        <div style={{backgroundColor: "#ECECEC"}}>
            <div className='container'>
                <h3 className='summer-title'>Джинсы</h3>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {jeans.map((item, index) => (
                        <JeansCard item={item} key={index}/>
                    ))}
                </div>
            </div>
            <New/>
         </div>
                
    );
};

export default Jeans;