import React, { useContext, useEffect, useState } from 'react';
import { headerContext } from '../../context/HeaderContext';
import "./Header.css"
import { Link, useNavigate } from 'react-router-dom';
import Hidden from '@mui/material/Hidden';
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import CloseIcon from '@mui/icons-material/Close';
import Badge from '@mui/material/Badge';
import { favoriteContext } from '../../context/favoriteContext';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Search from '../Search/Search';
import { Button } from '@mui/material';
import { authContext } from '../../context/authContext';
import LogoutIcon from '@mui/icons-material/Logout';
import { summerContext } from '../../context/SummerCollection';

const Header = () => {
    const { getHeader, header } = useContext(headerContext)
    const [open, setOpen] = useState(false);
    const { getFav, fav } = useContext(favoriteContext)
    const { users, getUser } = useContext(summerContext) 
    const { currentUser, handleLogOut } = useContext(authContext);
    const [openDialog, setOpenDialog] = useState(false)
    const [success, setSuccess] = useState(false)
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        getHeader()
    }, [])
    useEffect(() => {
        getFav()
    }, [])

    useEffect(() => {
        getUser()
        }, [currentUser])
    
    useEffect(() => {
        getFav()
    }, [currentUser])

    fav.products = fav?.products?.filter((item) => {
        return item.user === currentUser
    })
    const length = fav.products?.length

    const blockInvalidChar = e => ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault();

    return (
        <div>
            {header.map((item) => (
                <div key={item.id}>
                    <div className='header-lines' style={{position:"relative"}}>
                        <div className='container' style={{maxWidth: "1172px", padding: "0 99px", margin:"0 auto"}}>
                            <Hidden xsDown smDown>
                            <div className='header-top'>
                                <div className='header-top-left'>
                                    <Link style={{textDecoration: 'none', color: "#393939"}} to={'/about'}>
                                        <span>О нас</span>
                                        </Link>
                                    <Link style={{textDecoration: 'none', color: "#393939"}} to={'/collection'}>
                                        <span>Коллекции</span>
                                    </Link>
                                    <Link style={{textDecoration: 'none', color: "#393939"}} to={'/news'}>
                                       <span>Новости</span>
                                    </Link>
                                </div>
                                <div className='header-top-right'>
                                    <p><span>Тел: </span><a style={{textDecoration: 'none', color: "#393939"}} href='tel:+996 500 123 456'>{item.number}</a></p>
                                    </div>
                                </div>
                            </Hidden>
                        </div>
                    </div>
                    <div className='header-lines'>
                        <div className='container'>
                            <div className='header-bottom'>
                                <Hidden smUp>
                                    <div style={{border:"1px solid #E0E0E0"}} onClick={() => setOpen(true)}>
                                    <MenuIcon style={{padding:"6px 6px 1px 6px"}}/>
                                    </div>
                                </Hidden>
                                <Link style={{textDecoration: 'none'}} to={'/'}>
                                <div className='logo'>
                                        <img width="162px" src={item.logo} alt="the logo" />
                                </div>
                                </Link>
                                <Search/>
                            <Hidden xsDown smDown>
                                <div className='header-extra-info'>
                                        <div style={{display: "flex", alignItems:"center"}}>
                                            <div>
                                            {length > 0 ? <Badge badgeContent=" " variant="dot" color='secondary' overlap="circular">
                                                    <FavoriteBorderIcon sx={{ color: "#515151" }} />
                                                </Badge> : <FavoriteBorderIcon sx={{ color: "#515151" }} />}
                                            </div>
                                            <div>
                                             <Link style={{ textDecoration: 'none', color: "#393939" }} to={'/favorite'}>
                                                <span className='header-selected'>Избранное</span> 
                                            </Link>
                                            </div>
                                        </div>


                                        <div style={{display: "flex", alignItems:"center"}}>
                                            {users?.carts?.length > 0 ? <Badge badgeContent=" " variant="dot" color='secondary' overlap="circular"><img src={require('../../images/shopping-bag 1.png')} alt="cart" /></Badge>: <img src={require('../../images/shopping-bag 1.png')} alt="cart" /> }
                                            <Link style={{ textDecoration: 'none', color: "#393939" }} to={'/cart'}>
                                                <span className='header-cart'>Корзина</span>
                                            </Link>
                                    </div>
                                </div>
                            </Hidden>
                            </div>
                            {currentUser ? (
                                <div style={{display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
                                    <span>
                                        {currentUser}
                                    </span>
                                    <LogoutIcon onClick={() => {
                                        handleLogOut()
                                        navigate("/")

                                    }}/>
                                </div>
                            ) : (
                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                <Button
                                    style={{ color: "#393939", fontWeight: "500" }}
                                    onClick={() => navigate("/auth")}
                                >
                                    Log in/ Sign up
                                </Button>
                                </div>
                                )}
                        </div>
                    </div>
                    <SwipeableDrawer
                        anchor="left"
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                    >
                        <div onClick={()=>setOpen(false)} className="burger-list" style={{
                            display: "flex", flexDirection: "column", justifyContent: "space-between", height:"100%", padding: "16px", width: "250px"}}>
                            <div>
                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <p style={{ margin: "18px 0 18px 0px" }}>Меню</p>
                                <IconButton onClick={() => setOpen(false)}
                                onKeyPress={() => setOpen(false)}
                                role="button"
                                tabIndex={0}>
                                    <CloseIcon/>
                                </IconButton>
                                </div>
                                <div className='burger-top'>
                                        <div className='burger-top-left'>
                                            <Link style={{textDecoration: 'none', color:"#393939"}} to={'/about'}>
                                            <p style={{fontWeight: "500", fontSize: "13px", margin: "0 0 20px 0"}}>О нас</p>
                                        </Link>
                                            <Link style={{textDecoration: 'none', color:"#393939"}} to={'/news'}>
                                            <p style={{fontWeight: "500", fontSize: "13px", margin: "0 0 20px 0"}}>Новости</p>
                                        </Link>
                                        <Link style={{textDecoration: 'none', color:"#393939"}} to={'/collection'}>
                                            <p style={{ fontWeight: "500", fontSize: "13px", margin: "0 0 20px 0" }}>Коллекции</p>
                                        </Link>
                                        <hr  style={{width:"100px", opacity:"0.6", border: "1px solid #D3D3D3", margin: "14px 0 14px 0"}}/>
                                        </div>
                                </div>
                                    <div>
                                    <div onClick={() => navigate("/favorite")} style={{ display: "flex", alignItems: "center" }}>
                                                {length > 0 ? <Badge sx={{marginRight: "7px"}} badgeContent=" " variant="dot" color='secondary' overlap="circular">
                                                    <FavoriteBorderIcon sx={{ color: "#515151", width: "20px", marginRight: "-1px", marginTop: "-3px" }} />
                                        </Badge> : <FavoriteBorderIcon sx={{ color: "#515151", width:"20px", marginRight:"7px" }} />}
                                        <p style={{fontWeight: "500", fontSize: "13px"}}>Избранное</p>
                                        </div>
                                        <div onClick={()=>navigate("/cart")} style={{ display: "flex", alignItems: "center" }}>
                                        {users?.carts?.length > 0 ? <Badge sx={{marginRight: "7px"}} badgeContent=" " variant="dot" color='secondary' overlap="circular"><img style={{width: "20px", marginRight: "-1px", marginTop: "-3px"}} src={require('../../images/shopping-bag 1.png')} alt="cart" /></Badge> : <img style={{width:"20px", marginRight:"7px"}} src={require('../../images/shopping-bag 1.png')} alt="cart" />}
                                        <p style={{fontWeight: "500", fontSize: "13px"}}>Корзина</p>
                                        </div >
                                    </div>
                            </div>
                                    <div className='burger-bottom'>
                                <p style={{ margin: "0px 0px 8px 0" }}>Свяжитесь с нами</p>
                                    <div className='burger-top-right'>
                                            <p style={{margin:"0 0 8px 0"}}>Тел: <a style={{ textDecoration: "none", color: "#393939" }} href='tel:+996 500 123 456'>{item.number}</a></p>
                                    </div>
                                    <div className='footer-icons'>
                                        <a style={{marginRight: "6px"}} href=""><img src={require('../../images/telegram (1).png')} alt="telegram" /></a>
                                        <a style={{marginRight: "6px"}}  href=""><img src={require('../../images/whatsapp.png')} alt="wa" /></a>
                                    <span onClick={() => setOpenDialog(true)} style={{marginRight: "6px"}}  href=""><img src={require('../../images/telephone.png')} alt="phone" /></span>
                                    </div>
                                    </div>
                        </div>
                    </SwipeableDrawer>
                </div>
            ))}
             <Dialog
            onClose={()=>setOpenDialog(false)}
            open={openDialog}
            >
                <div className='call-dialog-inner'>
                    <button className='delete'><CloseIcon onClick={() => {
                        setOpenDialog(false)
                        setOpen(false)
                        setName("")
                        setPhone("")
                        setSuccess(false)
                        }} /></button>
                <DialogContent>
                <h1 className='dialog-title'>Если у Вас остались вопросы</h1>
                <p className='dialog-text'>Оставьте заявку и мы обязательно Вам перезвоним</p>
                <Typography>
                <input onChange={(e)=>setName(e.target.value)} className='input1 input' type="text" placeholder='Как к Вам обращаться?'/>
                </Typography>
                <Typography>
                    <input onChange={(e)=>setPhone(e.target.value)} className='input2 input' type="number" placeholder='Номер телефона'/>
                </Typography>
                    </DialogContent>
                    {name && phone.length > 3 ? <button className='dialog-button-active'
                        onKeyDown={blockInvalidChar}
                        onClick={() => {
                        setName("")
                        setPhone("")
                        setSuccess(true)
                        setOpenDialog(false) 
                    }}> Заказать звонок </button>
                        : <button disabled className='dialog-button'>
                    Заказать звонок
                </button>}
            </div>
            </Dialog>
            <Dialog
                PaperProps={{ sx: { width: "335px", height: "264px" }}}
            onClose={()=>setSuccess(false)}
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
                }}>
                    Продолжить покупки
                </button>
                </DialogContent>
            </div>
        </Dialog>
            </div>
    );
};

export default Header;