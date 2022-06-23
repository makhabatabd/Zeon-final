import React, { useContext, useEffect, useState } from 'react';
import { favoriteContext } from '../../context/favoriteContext';
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { cartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import {Link} from "react-router-dom"
import { authContext } from '../../context/authContext';
import { summerContext } from '../../context/SummerCollection';

const NewDCard = ({item,colors}) => {
    const { addDelToFav, isProdInFav } = useContext(favoriteContext)
    const { currentUser } = useContext(authContext)
    const { users } = useContext(summerContext) 
    const [inFav, setInFav] = useState(isProdInFav(item.id, currentUser))
    const [toggleColor, setToggleColor] = useState(item.color)
    const { updateCart, getUser } = useContext(summerContext)
    const { isProdInCart } = useContext(cartContext)
    const [checkItem, setCheckItem] = useState(isProdInCart(item.id, item.color = toggleColor));
    const discount = Math.ceil(item.price - (item.price * item.discount / 100))
    const navigate = useNavigate()
   const [createCart, setCreateCart] = useState({
        count: 1, 
        amount:item.amount,
        title: item.title,
        color: item.color, 
        price: item.price, 
        discount:item.discount,
        img: item.img, 
        size: item.size,
    })
    useEffect(() => {
    setCheckItem(isProdInCart(item.id, item.color = toggleColor))
}, [isProdInCart]);

        useEffect(() => {
        getUser()
        }, [currentUser])
    
    function changeCart(newCart) {
    let cart = {
      ...newCart,
      id:item.id,
    };
    let carts = [...users?.carts , cart]
    updateCart(users?.id, carts);
    setCreateCart("");
    }
    useEffect(() => {
        setCheckItem(isProdInCart(item.id, item.color = toggleColor));
    }, [toggleColor])
    return (
        <>
        <div className='breadcrumps'>
                <div className='container'>
                <span className='breadcrumps-span'>
                    <Link style={{textDecoration: 'none'}} to={'/'}>
                        <span>Главная</span>
                        </Link>
                        <span>/</span>
                    <Link style={{textDecoration: 'none'}} to={'/collection'}>
                        <span>Коллекции</span>
                        </Link>
                        <span>/</span>
                    <Link style={{textDecoration: 'none'}} to={'/summer'}>
                        <span>Новинки</span>
                        </Link>
                        <span>/</span>
                        <span className='item-title'>{item.title}</span>
                    </span>
                 </div>
            </div>
        <div className='main-div-details'>
            <div className='container'>
                <div className='main-div-inner'>
                    <div className='main-pics'>
                    <div className='main-div-pic'>
                        <img width="100%" src={item.img} alt="1" />
                    </div>
                    <div className='main-div-pic'>
                        <img width="100%" src={item.img4} alt="2" />
                    </div>
                    <div className='main-div-pic'>
                        <img width="100%" src={item.img3} alt="3" />
                    </div>
                    <div className='main-div-pic'>
                        <img width="100%" src={item.img2} alt="4" />
                    </div>
                    </div>
                     <div className='table-pics'>
                     <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 262 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                        <TableCell>
                                              <img width="100%" src={item.img} alt="1" />
                                        </TableCell>
                                        <TableCell>
                                              <img width="100%" src={item.img4} alt="2" />
                                        </TableCell>
                                        <TableCell>
                                              <img width="100%" src={item.img3} alt="3" />
                                        </TableCell>
                                        <TableCell>
                                              <img width="100%" src={item.img2} alt="4" />
                                        </TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                        </TableContainer> 
                        </div>
                <div className='details-info'>
                    <div className='details-info-inner'>
                        <div className='details-title'>{item.title}</div>
                        <div className='articul-name'><span className='artikul'>Артикул:</span>{item.artikul}</div>
                        <div className='details-circles'>
                        <p>Цвет</p>
                        <div className='detail-circles'>
                                        {colors.map((el) => (
                                            <div key={item.id + el.color} onClick={() => {
                                                setToggleColor(el.color)
                                                setCreateCart({
                                                    count: 1,
                                                    amount: item.amount, 
                                                    title: item.title, 
                                                    color: el.color, 
                                                    price: item.price, 
                                                    discount: item.discount, 
                                                    img: item.img, 
                                                    size: item.size
                                                })
                                            }} className={toggleColor === el.color ? "active" : "not-active"}>
                                                <div className='circles' style={{ backgroundColor: el.color }} ></div>
                                            </div>
                                        ))}
                            </div>
                        </div>
                        {item.discount ?
                            <div><span className='deatils-discount'>{discount.toLocaleString().replace(',', ' ')} p</span><span className='details-price-discount'>{item.price.toLocaleString().replace(',', ' ')} p</span></div> :  
                           <span className='details-price'>{item.price.toLocaleString().replace(',', ' ')} p</span> 
                        }     
                        <p className='details-text-intro'>О товаре:</p>
                            <p className='details-text' style={{width:"99%"}}>{item.text}</p>
                        <div className='details-bottom'> 
                            <div className='details-info-bottom'>
                                    <p><span>Размерный ряд: </span>{item.size}</p>
                                    <p><span>Количество в линейки: </span>{item.amount}</p>
                            </div>
                            <div className='details-info-bot'>
                                <p><span>Состав ткани: </span>{item.made}</p>
                                <p><span>Материал: </span>{item.material}</p>
                            </div>
                            </div>
                            <div style={{ display: "flex" }}>
                               <div style={{marginRight: "8px"}}>
                                    {currentUser ?
                                            checkItem ? <button onClick={() => {
                                        navigate("/cart");
                                        }} className='details-button-cart'>
                                            Перейти в корзину
                                    </button>  : <button className="details-button" onClick={()=>changeCart(createCart)}>
                                        <img style={{marginRight:"10px", marginBottom:"-3px"}} width="20px" src="https://cdn.discordapp.com/attachments/979601812472598619/980774983724830730/unknown.png" alt="cart" />
                                            Добавить в корзину
                                            </button> : 
                                            <Link to="/auth">
                                            <button className="details-button">
                                        <img style={{marginRight:"10px", marginBottom:"-3px"}} width="20px" src="https://cdn.discordapp.com/attachments/979601812472598619/980774983724830730/unknown.png" alt="cart" />
                                            Добавить в корзину
                                            </button>
                                            </Link>
                                    }
                                </div>
                                <div style={{ backgroundColor: "black"}}>
                                    {currentUser ?
                                        inFav ? (
                                        <FavoriteIcon
                                            style={{ color: "white", padding:"8px", fontSize:"28px" }}
                                            onClick={() => {
                                                addDelToFav(item);
                                                setInFav(isProdInFav(item.id, currentUser));
                                            }}
                                        />
                                    ) : (
                                        <FavoriteBorderIcon
                                            style={{ color: "white", padding:"8px", fontSize:"28px" }}
                                            onClick={() => {
                                                addDelToFav(item);
                                                setInFav(isProdInFav(item.id, currentUser));
                                            }}
                                        />
                                            ) : 
                                            <Link to="/auth">
                                             <FavoriteBorderIcon
                                            style={{ color: "white",padding:"8px", fontSize:"28px" }}
                                                />
                                            </Link>
                                    }
                                </div>
                            </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            </>
    );
};

export default NewDCard;