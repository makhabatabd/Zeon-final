import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { allContext } from '../../context/AllContext';
import SearchPageCard from './SearchPageCard';
import "./SearchPage.css"
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Random from "../Random/Random";
import { makeStyles } from "@material-ui/styles";
import axios from 'axios';
import Pagination from '@mui/material/Pagination';

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
        color: "#979797",
        backgroundColor: "white", 
        border: "none", 
        borderRadius:"0"
    },
  },
}));

const SearchPage = () => {
  const { getAllProducts ,data } = useContext(allContext)
  const classes = useStyles();
    const [extraProducts, setExtraProducts] = useState([])
    const params = useParams()
   useEffect(() => {
        getAllProducts()
    }, [])
    const allData = data.reduce((acc, val) => acc.concat(val), [])
    const searchItem = params.searchValue

    const newFilter = allData.filter((value) => {
            return value.title.toLowerCase().includes(searchItem.toLowerCase());
    });

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(12)
  const paginateData = newFilter.slice((page - 1) * limit, page * limit)
  const count = Math.ceil(newFilter.length / limit)

  useEffect(() => {
    if (window.innerWidth < 321) {
    setLimit(4)
    } else {
      setLimit(12)
  }
  }, [])
useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}, [page])

        useEffect(() => {
      axios.get(`http://localhost:8000/summer?_limit=2`)
        .then(response => {
           setExtraProducts(prev => [...prev, ...response.data])
         })
     }, [])
    useEffect(() => {
      axios.get(`http://localhost:8000/new?_limit=1`)
        .then(response => {
           setExtraProducts(prev => [...prev, ...response.data])
         })
    }, [])
    useEffect(() => {
      axios.get(`http://localhost:8000/hits?_limit=1`)
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
      <>
      <div className='breadcrumps'>
                <div className='container'>
                <span className='breadcrumps-span'>
                    <Link style={{textDecoration: 'none'}} to={'/'}>
                        <span>Главная</span>
                        </Link>
                        <span>/</span>
                        <span className='item-title'>Результаты поиска</span>
                    </span>
                 </div>
        </div>
        <div className='search-page'>
            {paginateData.length > 0 ? (
            <div className='container'>
            <h2 className='search-title'>Результаты поиска по запросу: {searchItem}</h2>
            <div className='search-cards'>
            {paginateData.map((item) => (
                <SearchPageCard item={item} key={item.id}/>
            ))}
            </div>
            <div className='summer-pagination'>
              <Pagination
                sx={{flexWrap:"wrap"}}
                    siblingCount={0}
                      variant="outlined" classes={{ ul: classes.ul }} 
                      count={count}
                      page={+page}
                      onChange={(event, pageVal) => setPage(pageVal)}
                />
              </div>
            </div>
            ) : (
                    <div className='container'>
                    <div>
                        <h2 className='search-title'>Результаты поиска по запросу: {searchItem}</h2>
                        <p className="search-text">По Вашему запросу ничего не найдено.</p>
                        </div>
                         <h3 className="favorite-title">Возможно Вас заинтересует</h3>
                        <div className="search-random-cards">
                            {extraProducts.map((item) => (
                                <Random item={item} key={item.id}/>
                            ))}
                                </div>
                                  <div className='search-table-cards'>
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
                    </div>)}
          </div>
         </>
                                
    );
};

export default SearchPage;