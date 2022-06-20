import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useNavigate } from "react-router-dom";

const CollectionCard = ({ item }) => {
    let place;
    function changeLocation() {
    if (item.text === "Повседневная одежда") {
        place ="everyday"
    } else if (item.text === "Одежда на пляж") {
        place ="beach"
    }else if (item.text === "Юбки") {
         place ="skirts"
    }else if (item.text === "Джинсы") {
         place ="jeans"
    }
    }
    const navigate = useNavigate()
    return (
        <Card sx={{width: "280px",height: "374px",marginRight: "8px", marginBottom: "8px", position: "relative"}} key={item.id} square={true}>
            <CardMedia sx={{ width: "286px",height: "330px", }}
                component="img"
                height="140"
                image={item.img}
                alt="image"
                />
            <div className='collection-words'>
                <p>{item.text}</p>
            </div>
            <button onClick={() => {
                changeLocation()
                navigate(`/${place}`)
                }} className='collection-bottom'>Смотреть все
                    <ArrowForwardIosIcon sx={{ fill: '#fff'}} />
                </button>            
            </Card>
    );
};

export default CollectionCard;