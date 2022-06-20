import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { summerContext } from '../../context/SummerCollection';
import "./Details.css"
import DetailsCard from './DetailsCard';
import axios from 'axios';
import Similiar from '../Similar/Similiar';
const Details = () => {
    const { getOneProduct, oneSummer } = useContext(summerContext)
    const { summer, getSummer } = useContext(summerContext)
    const [colors, setColors] = useState([])
    const params = useParams();
    useEffect(() => {
    getSummer();
    }, []);

   useEffect(() => {
      axios.get("http://localhost:8000/colors")
        .then(response => {
            setColors(response.data)
         })
   }, [])
    
    useEffect(() => {
        getOneProduct(params.id)
    }, [])

     useEffect(() => {
        getOneProduct(params.id)
    }, [params.id])

    return (
        <div style={{backgroundColor: "#ECECEC"}}>
            {oneSummer ? (
                <DetailsCard item={oneSummer} colors={colors}/>
            ) : <h1>Loading</h1>}
            <div className='container'>
                <p className='extra-products'>Похожие товары</p>
                <Similiar/>
            </div>
            
        </div>
    )
    
};

export default Details;