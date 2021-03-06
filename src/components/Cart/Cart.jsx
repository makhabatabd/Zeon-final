import React, { useContext, useEffect, useState } from 'react';
import { cartContext } from '../../context/CartContext';
import "./Cart.css"
import Order from "../Order/Order"
import axios from 'axios';
import Random from '../Random/Random';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { summerContext } from '../../context/SummerCollection';
import { authContext } from '../../context/authContext';
import CartCard from './CartCard';
import { Link } from 'react-router-dom';
    
const Cart = () => {
    const { getUser, users} = useContext(summerContext)
    const {currentUser} = useContext(authContext)
    const [open, setOpen] = useState(false)
    const [extraProducts, setExtraProducts] = useState([])
    const [info, setInfo] = useState(false)
    const [button, setButton] = useState(false)
    
    let totalCount = 0
    let totalPrice = 0
    let discount = 0
    let total = 0

    users?.carts?.forEach((item) => (
        totalCount+=item.count
    ))

    users?.carts?.forEach((item) => (
        totalPrice+=item.price*item.count
    ))

    users?.carts?.forEach((item) => (
        item.discount ? discount += item.count * (Math.ceil(item.price - (item.price - (item.price * item.discount / 100)))): 0
    ))

    total = totalPrice - discount


    useEffect(() => {
      axios.get(`http://localhost:8000/summer?_limit=2`)
        .then(response => {
           setExtraProducts(prev => [...prev, ...response.data])
         })
     }, [])
    useEffect(() => {
      axios.get(`http://localhost:8000/hits?_limit=2`)
        .then(response => {
           setExtraProducts(prev => [...prev, ...response.data])
         })
    }, [])
    useEffect(() => {
      axios.get(`http://localhost:8000/brandnew?_limit=1`)
        .then(response => {
           setExtraProducts(prev => [...prev, ...response.data])
         })
    }, [])
    return (
        <div className='main-div'>
            <div className='container'>
                <Link to="/history" style={{textDecoration:"none", color:"black", display: "inline-block", marginBottom:"19px"}}>
                    ???????????? ???????????????????? ??????????????
                </Link>
                {users?.carts?.length > 0 ? (
                    <div className='main-cart-div'> 
                        <div style={{marginRight: "16px"}}>
                            {users?.carts?.map((item, index) => {
                                return (
                                    <CartCard item={item} key={index} />
                                )
                            })}
                        </div>
                        <div className='cart-payment'>
                            <div className='mini-payment'>
                                 {info ?  <div className='mini-payment-inner'>
                                <h3 className='cart-payment-title'>?????????? ????????????</h3>
                                <div className='payment-info'>
                                    <span> ???????????????????? ????????????:</span>
                                    <p>{totalCount} ???????????? ({totalCount * 5} ????.) </p>
                                </div>
                                <div className='payment-info'>
                                    <span>??????????????????: </span>
                                    <p>{totalPrice.toLocaleString().replace(',', ' ')} ????????????</p>
                                </div>
                                <div className='payment-info'> 
                                    <span>???????????? :</span>
                                    <p>{discount.toLocaleString().replace(',', ' ')} ????????????</p>
                                </div>
                                <hr className='hr'/>
                                <div className='payment-info'>
                                <span>?????????? ?? ????????????</span>
                                <p>{total.toLocaleString().replace(',', ' ')} ????????????</p>
                                    </div>
                                    {button ?  <button className='mini-info-btn' onClick={() => {
                                    setInfo(false)
                                    setButton(false)
                                }}>????????????</button>: <button className='mini-info-btn' onClick={() => {
                                    setInfo(true)
                                    setButton(true)
                                }}>???????????????????? ?? ????????????</button>}
                                <button onClick={() => {
                                    setOpen(true)
                                }} className='payment-button'>???????????????? ??????????</button>
                            </div>: <div className='payment-total-info'>
                                <span>?????????? ?? ????????????</span>
                                <p>{total.toLocaleString().replace(',', ' ')} ????????????</p>
                                {button ?  <button className='mini-info-btn' onClick={() => {
                                    setInfo(false)
                                    setButton(false)
                                }}>????????????</button>: <button className='mini-info-btn' onClick={() => {
                                    setInfo(true)
                                    setButton(true)
                                }}>???????????????????? ?? ????????????</button>}
                                <button onClick={() => {
                                    setOpen(true)
                                }} className='payment-button'>???????????????? ??????????</button>
                                </div>}
                            </div>
                            <div className='cart-payment-inner'>
                                <h3 className='cart-payment-title'>?????????? ????????????</h3>
                                <div className='payment-info'>
                                    <span> ???????????????????? ????????????:</span>
                                    <p>{totalCount} ????</p>
                                </div>
                                <div className='payment-info'>
                                    <span>???????????????????? ??????????????:</span>
                                    <p>{totalCount * 5} ????</p>
                                </div>
                                <div className='payment-info'>
                                    <span>??????????????????: </span>
                                    <p>{totalPrice.toLocaleString().replace(',', ' ')} ????????????</p>
                                </div>
                                <div className='payment-info'> 
                                    <span>???????????? :</span>
                                    <p>{discount.toLocaleString().replace(',', ' ')} ????????????</p>
                                </div>
                                <hr style={{ width: "387px", border: "dashed 1px #BFBFBF", margin:"12px 0 12px 0" }} />
                                <div className='payment-info'>
                                <span>?????????? ?? ????????????</span>
                                <p>{total.toLocaleString().replace(',', ' ')} ????????????</p>
                                </div>
                                <button onClick={() => {
                                    setOpen(true)
                                }} className='payment-button'>???????????????? ??????????</button>
                                <Order open={open} setOpen={setOpen} total={total} discount={discount} totalPrice={totalPrice} totalCount={totalCount} />
                            </div>
                        </div>
                    </div>)  :  <>
                            <div>
                                <h1 className='cart-bottom-title'>??????????????</h1>
                                <p className="favorite-text">?? ?????? ???????? ?????? ?????????????? ?? ??????????????</p>
                                <h3 className="favorite-title">???????????????? ?????? ????????????????????????</h3>
                                </div>
                                <div className="maybe-cards">
                                    {extraProducts.map((item) => (
                                        <Random item={item} key={item.id}/>
                                    ))}
                        </div>
                         <div className='maybe-table-cards'>
                                        <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 262 }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    {extraProducts.map((item) => (
                                                        <TableCell key={item.id}>
                                                            <Random item={item} key={item.id}/>
                                                        </TableCell>))}
                                                </TableRow>
                                            </TableHead>
                                        </Table>
                                        </TableContainer>
                                </div>
                        </>}
            </div>
        </div>
    );
};

export default Cart;