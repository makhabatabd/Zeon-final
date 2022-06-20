import React, { useContext, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { summerContext } from '../../context/SummerCollection';

const CartCard = ({ item }) => {
    const {users, updateCart } = useContext(summerContext)

    async function incrementCount () {
    let newCart = users.carts.map((el) => {
        if (el.id === item.id && el.color === item.color) {
            el.count += 1
        }
        return el
    })
    updateCart(users?.id, newCart);
    }

    function deleteFromCart() {
        let index = users.carts.findIndex((el) => el.id === item.id && el.color === item.color)
        const newState = [...users.carts]
        newState.splice(index, 1)
        updateCart(users?.id, [...newState]);
    }

    async function decrementCount () {
    let newCart = users.carts.map((el) => {
        if (el.id === item.id && el.color === item.color) {
            el.count -= 1
        }
        return el
    })
    updateCart(users?.id, newCart);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div className='cart-inner' >
                <div className='cart-card'>
                    <div className='cart-card-inner'>
                        <div className='cart-pic'>
                            <img width={112} src={item.img} alt="the main image" />
                        </div>
                        <div className='cart-info'>
                            <h1 className='cart-title'>{item.title}</h1>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <p className='cart-color'>Цвет:</p>
                                <div style={{ width: "16px", height: "16px", border: "1px solid #E7E7E7", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <span style={{ backgroundColor: item.color, width: "8px", height: "8px", borderRadius: "50%" }}></span>
                                </div>
                            </div>
                            <p className='cart-title'>Размер: {item.size}</p>
                            <div className='cart-price'>{item.discount ?
                                <div><span className='discount'>{Math.ceil(item.price - (item.price * item.discount / 100)).toLocaleString().replace(',', ' ')} p</span><span className='price-discount'>{item.price.toLocaleString().replace(',', ' ')} p</span></div> : <p className='discount'>{item.price.toLocaleString().replace(',', ' ')} p</p>} </div>
                            <button className='count'
                                onClick={() =>decrementCount()}
                            >
                                -
                            </button>
                             <input
                                    style={{ width: "32px", background:"transparent", ooutline:"none", border:"none", textAlign:"center"}}
                                    type="number"
                                    disabled
                                    value={item.count}
                                />
                            <button className='count'
                                onClick={() => incrementCount()}
                            >
                                +
                            </button>
                            <button className='cart-delete'>
                                <CloseIcon onClick={()=> deleteFromCart()} sx={{ width: "20px" }} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default CartCard;