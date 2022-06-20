import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Similiar from '../Similar/Similiar';
import HitDetailsCard from './HitDetailsCard';

const HitDetails = () => {
    const [hit, setHit] = useState(null)
    const params = useParams();
    const [colors, setColors] = useState([])

        useEffect(() => {
        axios.get(`http://localhost:8000/hits/${params.id}`)
            .then(response => {
            setHit(response.data)
        })  
        }, [])
    
     useEffect(() => {
        axios.get(`http://localhost:8000/hits/${params.id}`)
            .then(response => {
            setHit(response.data)
        })  
     }, [params.id])
    
    useEffect(() => {
      axios.get("http://localhost:8000/colors")
        .then(response => {
            setColors(response.data)
         })
   }, [])
    return (
        <div style={{backgroundColor: "#ECECEC"}}>
            {hit ? <HitDetailsCard colors={colors} id={params.id} item={hit} /> : <h1>Loading</h1>}
            <div className='container'>
                <p className='extra-products'>Похожие товары</p>
                <Similiar/>
            </div>
            
        </div>
    );
};

export default HitDetails;