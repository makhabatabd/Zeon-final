import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Similiar from '../Similar/Similiar';
import NewDetailsCard from './NewDetailsCard';

const HitDetails = () => {
    const [item, setItem] = useState(null)
    const [brandNew, setBrandNew] = useState([])
    const [colors, setColors] = useState([])
    const params = useParams();
     const {id} = useParams()
    useEffect(() => {
        axios.get("http://localhost:8000/brandnew")
            .then(response => {
            setBrandNew(response.data)
        })
    }, [])
        useEffect(() => {
        axios.get(`http://localhost:8000/brandnew/${params.id}`)
            .then(response => {
            setItem(response.data)
        })  
        }, [])
     useEffect(() => {
        axios.get(`http://localhost:8000/brandnew/${params.id}`)
            .then(response => {
            setItem(response.data)
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
            {item ? <NewDetailsCard colors={colors} id={params.id} item={item} /> : <h1>Loading</h1>}
            <div className='container'>
                <p className='extra-products'>Похожие товары</p>
                <Similiar/>
            </div>
            
        </div>
    );
};

export default HitDetails;