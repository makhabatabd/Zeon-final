import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import "./Order.css"
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import { summerContext } from '../../context/SummerCollection';

const Order = ({open, setOpen, totalCount, totalPrice, discount, total}) => {
    const [phone, setPhone] = useState("")
    const [success, setSuccess] = useState(false)
    const { users, updateCart, updateOrder } = useContext(summerContext)
    let products = users?.carts

    let date = Date.now()
    let timestamp = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(date)

    const navigate = useNavigate()
    const [fill, setFill] = useState(false);
    const [data, setData] = useState({
        name: "", 
        surname: "", 
        email: "", 
        country: "", 
        city: "", 
        phone: "",  
        totalCount, 
        totalPrice, 
        discount, 
        total,
        timestamp,
        products,
    })
    const [checked, setChecked] = useState(false)

    const handleInputChange = (e) => {
        let newOrder = {
            ...data, 
            [e.target.name]: e.target.value, 
            phone:phone, 
        }
        
        setData(newOrder)

         console.log(checked);
        // console.log(e.target);
        console.log(newOrder);
    };

      function deleteAll() {
        const newState = [...users.carts]
        newState.splice(0, users.carts?.length)
        updateCart(users?.id, [...newState]);
    }


    function handleCheck() {
        if (
            data.name &&
            data.surname &&
            data.email &&
            data.country &&
            data.city &&
            checked &&
            phone?.length > 7  &&
            (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))
        ) {
            setFill(true)
        } else {
            setFill(false)
        }
    }

    function save() {
        let orders = [...users?.orders, data]
        updateOrder(users?.id, orders)
        setOpen(false)
        setSuccess(true)
    }

    
    useEffect(() => {
        handleCheck()
    }, [data, checked, phone])


    const handleClose = () => {
        setOpen(false);
        setFill(false)
    };

    function value(e, callback) {
        console.log(checked);
        setChecked(!checked)
        console.log(checked);
    }


    return (
               <div style={{ position: "relative" }}>
                <Dialog PaperProps={{ sx: { width: {xs: "320px", md:"480px"}, height: {xs: "700px", md:"746px"} } }} open={open} onClose={handleClose}>
        <div className='dialog-inner'>
            <DialogContent sx={{height: {xs:"680px", md:"680px"}, padding:{xs: "10px", md:"21px"}}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start"}}>
                <h2>Оформление заказа</h2>
                <CloseIcon sx={{padding: 0}} onClick={handleClose} />
                </div>
            <label className='order-label' htmlFor="name">Ваше имя</label>
            <br/>
            <input onChange={(e)=>handleInputChange(e)}  className='order-input' type="text" id='name' name='name' placeholder='Например Иван' />
            <br/>
            <label className='order-label'  htmlFor="surname">Ваше фамилия</label>
            <br/>
            <input onChange={(e)=>handleInputChange(e)} className='order-input' name='surname' id='surname' type="text" placeholder='Например Иванов' />
            <br />
            <div>
            <input onChange={(e)=>handleInputChange(e)}  pattern="[^@\s]+@[^@\s]+" className='email-input' type="email" id='email' name='email' placeholder='example@mail.com' />
            <br />
            <label className='email-label' htmlFor="email">Электронная почта</label>
            </div>
            <br/>
            <label className='order-label'  htmlFor="">Ваш номер телефона</label>
            <br/>
            <PhoneInput placeholder="Enter phone number" international value={phone} onChange={setPhone} defaultCountry="KG" className='phone-input'/>
            <br/>
            <label className='order-label'  htmlFor="country">Страна</label>
            <br/>
            <input onChange={(e)=>handleInputChange(e)} className='order-input' type="text" name='country' id='country' placeholder='Страна' />
            <br/>
            <label className='order-label'  htmlFor="city">Город</label>
            <br/>
            <input onChange={(e)=>handleInputChange(e)} className='order-input' type="text" name='city' id='city' placeholder='Город' />
            <br/>
            <input className='order-checkbox' type="checkbox" value={checked} onChange={(e) => value(e)} name="checked"  />
            <label htmlFor="checked" className='label'>Согласен с условиями <Link className='cart-link' style={{ textDecoration: 'none', color: "#2F80ED" }} to={'/offerta'}>публичной оферты</Link></label>
                        {fill ? <button onClick={() => save()
            } className='active-button'>Заказать</button> : <button className='order-button'>Заказать</button>}
        </DialogContent>
        </div>
        </Dialog>
        <Dialog
            PaperProps={{ sx: { width: "335px", height: "264px" }}}
                onClose={() => setSuccess(false)
                }
            open={success}
            >
                <div className='dialog-success'>
                <DialogContent>
                <img width="64px" style={{margin:"10px auto 0"}} src={require('../../images/tick.png')}alt="tick" />
                <h3 className='success-title'>Спасибо!</h3>
                <p className='success-text'>Ваша заявка была принята ожидайте, скоро Вам перезвонят</p>
                        <button className='success-button' onClick={() => {
                            setSuccess(false)
                            setOpen(false)
                            navigate("/")
                            deleteAll()

                }}>
                    Продолжить покупки
                </button>
                </DialogContent>
            </div>
        </Dialog>
            </div>
    );
};

export default Order;