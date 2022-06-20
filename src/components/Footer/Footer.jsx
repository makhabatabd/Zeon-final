import React, { useEffect, useState } from 'react';
import "./Footer.css"
import { Link } from 'react-router-dom';
import axios from 'axios';

const Footer = () => {
    const [footer, setFooter] = useState([])
    useEffect(() => {
      axios.get("http://localhost:8000/footer")
        .then(response => {
            setFooter(response.data)
         })
    }, [])
    return (
        <div className='footer'>
            {footer.map((item) => (
                <div className='container' key={item.id}>
                    <div className='footer-inner'>
                        <div className='footer-inner-part1'>
                            <img src={item.img} alt="Zeon Logo" width="243px" height="105px" />
                        </div>
                        <div className='footer-inner-part2'>
                            <h5>Компания</h5>
                            <Link style={{textDecoration: 'none'}} to={'/about'}>
                                <p>О нас</p>
                            </Link>
                            <Link style={{textDecoration: 'none'}} to={'/news'}>
                                <p>Новости</p>
                            </Link>
                            <Link style={{textDecoration: 'none'}} to={'/help'}>
                                <p>Помощь</p>
                            </Link>
                            <Link className='footer-offerta' style={{textDecoration: 'none'}} to={'/offerta'}>
                                <p>Публичная оферта</p>
                            </Link>
                        </div>
                        <div className='footer-inner-part3'>
                            <h5>Контакты</h5>
                            <div className='contacts'>
                                <img src={require('../../images/phonecall.png')} alt="the phone call" />
                                    <p><a href='tel:+996 500 123 456'>{item.phone}</a></p>
                            </div>
                            <div className='contacts'>
                                <img src={require('../../images/phonecall.png')} alt="the phone call" />
                                <p><a href='tel:+996 500 123 456'>{item.phone}</a></p>
                            </div>
                            <div className='contacts'>
                                <img src={require('../../images/mail.png')} alt="email" />
                                <p><a href='mailto:makhabat9898@gmail.com'>{item.mail}</a></p>
                            </div>
                        </div>
                        <div className='footer-inner-part4'>
                            <h5>Мы в социальных сетях</h5>
                            <div className='contacts'>
                                <img src={require('../../images/insta.png')} alt="the phone call" />
                               <p><a target="_blank" href="https://www.instagram.com/">{item.insta}</a></p>
                            </div>
                            <div className='contacts'>
                                <img src={require('../../images/telegram.png')} alt="the phone call" />
                                <p><a target="_blank" href="https://web.telegram.org/">{item.tel}</a></p>
                            </div>
                            <div className='contacts'>
                                <img src={require('../../images/phonecall.png')} alt="the phone call" />
                                <p><a target="_blank" href="https://web.whatsapp.com/">{item.wa}</a></p>
                            </div>
                        </div>
                    </div>
                    <p className='fotter-bottom'>{item.text}</p>
                </div>
                ))}
        </div>
    );
};

export default Footer;