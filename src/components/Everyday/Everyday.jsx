import axios from 'axios';
import React, { useEffect, useState } from 'react';
import New from '../New/New';
import EverydayCard from './EverydayCard';

const Everyday = () => {
    const [everyday, setEveryday] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/everyday`)
            .then(response => {
                setEveryday([...response.data])
            })
    })
        

    return (
        <div style={{backgroundColor: "#ECECEC"}}>
            <div className='container'>
                <h3 className='summer-title'>Повседневная одежда</h3>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {everyday.map((item, index) => (
                        <EverydayCard item={item} key={index}/>
                    ))}
                </div>
            </div>
            <New/>
         </div>
                
    );
};

export default Everyday;