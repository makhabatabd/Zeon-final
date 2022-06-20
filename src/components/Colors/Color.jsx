import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { authContext } from '../../context/authContext';
import { cartContext } from '../../context/CartContext';
import { summerContext } from '../../context/SummerCollection';

const Color = ({id}) => {
    const [colors, setColors] = useState([])
    const { isProd } = useContext(cartContext)
    const { currentUser } = useContext(authContext)
    const [inCart, setInCart] = useState(isProd(id))
    const { getUser } = useContext(summerContext)
    useEffect(() => {
      axios.get("http://localhost:8000/colors")
        .then(response => {
            setColors(response.data)
        })
    }, [])
    useEffect(() => {
        getUser()
        }, [currentUser])
    return (
        <div>
            <div className='colorful-circles'>
                {colors.map((item) => {
                    id == inCart[0]?.id && inCart?.map(i => {
                        if (i?.color == item.color) {
                            item.status = true 
                        } 
                    })
                    return <div key={item.id} style={{ backgroundColor: item.color }} className={item.status && currentUser ? "circle-circle" : "circle"}></div>
                })}
            </div>
        </div>
    );
};

export default Color;