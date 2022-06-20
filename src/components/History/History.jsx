import React, { useContext } from 'react';
import { summerContext } from '../../context/SummerCollection';
import "./History.css"

const History = () => {
    const {users} = useContext(summerContext)
    return (
        <div className='main-history' style={{backgroundColor: "#ECECEC", padding: "10px"}}>
            <div className='container'>
                {users?.orders?.length > 0 ? (
                        <div>
                            {users?.orders?.map((item, index) => (
                                <div key={index} className="main-order-div">
                                    <div className='order-payment'>
                                    <div className='blocks'>
                                        <span> Имя заказчика:  </span>
                                        <p>{item.name}</p>
                                    </div>
                                    <div className='blocks'>
                                        <span> Фамилия заказчика:  </span>
                                        <p>{item.surname}</p>
                                    </div>
                                    <div className='blocks'>
                                        <span> Электронная почта заказчика:  </span>
                                        <p>{item.email}</p>
                                    </div>
                                    <div className='blocks'>
                                        <span> Страна заказчика:  </span>
                                        <p>{item.country}</p>
                                    </div>
                                    <div className='blocks'>
                                        <span> Город заказчика:  </span>
                                        <p>{item.city}</p>
                                    </div>
                                    <div className='blocks'>
                                        <span> Телефон заказчика:  </span>
                                        <p>{item.phone}</p>
                                    </div>
                                    <div className='blocks'>
                                        <span> Время оформления заказа:  </span>
                                        <p>{item.timestamp}</p>
                                    </div>
                                    <div className='blocks'>
                                            <span> Общая сумма заказа:  </span>
                                        <p>{item.totalPrice.toLocaleString().replace(',', ' ')} р</p>
                                    </div>
                                    <div className='blocks'>
                                        <span> Общая скидка заказа:  </span>
                                        <p>{item.discount ? item.discount : 0} р</p>
                                    </div>
                                    <div className='blocks'>
                                        <span> Сумма после скидки:  </span>
                                        <p>{item.total.toLocaleString().replace(',', ' ')} р</p>
                                     </div>
                                    </div>
                                    <div className='order-products'>
                                    <h2 style={{margin:"0 0 6px 0"}}>Купленные продукты :</h2>
                                    {item.products?.map((item, index) => (
                                        <div style={{display:"flex", backgroundColor:"white", marginBottom:"10px"}} key={index}>
                                         <div key={item.id} className="product-image">
                                            <img style={{display:"block"}} width="100%" src={item.img} alt="first pic" />
                                        </div>
                                        <div>
                                            <h2 className='cart-title'>{item.title}</h2>
                                            <h2 className='cart-title' style={{paddingTop: 0}}>
                                                Количество линеек: {item.count}
                                            </h2>
                                            <h2 style={{paddingTop: 0}} className='cart-title'>Количество товаров: {item.amount}</h2>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <p className='cart-color'>Цвет:</p>
                                                <div style={{ width: "16px", height: "16px", border: "1px solid #E7E7E7", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                    <span style={{ backgroundColor: item.color, width: "8px", height: "8px", borderRadius: "50%" }}></span>
                                                </div>
                                            </div>
                                        </div>
                                            </div>
                                    ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : 
                        <h1>У вас пока нет покупок</h1>
                } 
            </div>
            
        </div>
    );
};

export default History;