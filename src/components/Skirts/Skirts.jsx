import axios from 'axios';
import React, { useEffect, useState } from 'react';
import New from '../New/New';
import SkirtsCard from './SkirtsCard';

const Skirts = () => {
    const [skirts, setSkirts] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:8000/everyday`)
            .then(response => {
                setSkirts([...response.data])
            })
    })
        

    return (
        <div style={{backgroundColor: "#ECECEC"}}>
            <div className='container'>
                <h3 className='summer-title'>Юбки</h3>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {skirts.map((item, index) => (
                        <SkirtsCard item={item} key={index}/>
                    ))}
                </div>
            </div>
            <New/>
         </div>
                
    );
};

export default Skirts;