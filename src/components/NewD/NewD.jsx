import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Similiar from '../Similar/Similiar';
import NewDCard from './NewDCard';

const NewD = () => {
    const [newD, setNewD] = useState(null)
    const params = useParams();
    const [colors, setColors] = useState([])

        useEffect(() => {
        axios.get(`http://localhost:8000/new/${params.id}`)
            .then(response => {
            setNewD(response.data)
        })  
        }, [])
     useEffect(() => {
        axios.get(`http://localhost:8000/new/${params.id}`)
            .then(response => {
            setNewD(response.data)
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
            {newD ? <NewDCard colors={colors} id={params.id} item={newD} /> : <h1>Loading</h1>}
            <div className='container'>
                <p className='extra-products'>Похожие товары</p>
                <Similiar/>
            </div>
            
        </div>
    );
};

export default NewD;