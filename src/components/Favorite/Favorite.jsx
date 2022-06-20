import React, { useContext, useEffect, useState } from "react";
import "./Favorite.css";
import { favoriteContext } from "../../context/favoriteContext";
import axios from "axios";
import Random from "../Random/Random";
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import FavoriteCard from "./FavoriteCard";
import { authContext } from "../../context/authContext";

const Favorite = () => {
    const { fav, getFav, deleteProdInFav } = useContext(favoriteContext)
    const [extraProducts, setExtraProducts] = useState([])
    const [limit, setLimit] = useState(0)
    const { currentUser } = useContext(authContext)
   
    useEffect(() => {
        if (window.innerWidth < 321) {
            changeLimit(4)
        }
        else {
            changeLimit(limit +12)
        }
    }, [])
    
    useEffect(() => {
        getFav()
    }, [])

     const changeLimit = (number) => {
         if (window.innerWidth < 321) {
             setLimit(prev => prev + number)
            } else {
                setLimit(prev => prev + number)
            } 
    }

    const ScrollHandler = (e) => { 
        if (window.innerWidth < 321) {
            if (
                e.target.documentElement.scrollHeight - 400 - (e.target.documentElement.scrollTop + window.innerHeight) < 0
            ) {
                changeLimit(4)
            }
        } else {
            e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && changeLimit(12)
        } 
    } 
 
  useEffect(() => { 
    document.addEventListener('scroll', ScrollHandler) 
 
    return () => { 
      document.removeEventListener('scroll', ScrollHandler) 
    } 
  }, [])
    
    
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

    fav.products = fav.products?.filter((item) => {
        return item.user === currentUser
    })
    const length = fav.products?.length

    return (
        <div className="fav-div">
            <div className="container">
                <h3 className='fav-main-title'>Избранное</h3>
                <div>
                    {fav?.products.length > 0 ? (
                        <>
                            <p className="fav-main-text">Товары в избранном: {length}</p>
                            <div style={{ display: "flex", flexWrap: "wrap" }}>
                                {fav.products
                                    .filter((i, k)=> k < limit)
                                    .map((item1) => (
                                        <FavoriteCard item1={item1} deleteProdInFav={deleteProdInFav} key={item1.item.id}/>
                                    ))}
                                </div>
                        </>
                    ) : (
                            <>
                            <div>
                                <p className="favorite-text">У вас пока нет избранных товаров</p>
                                <h3 className="favorite-title">Возможно Вас заинтересует</h3>
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
                        </>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Favorite;