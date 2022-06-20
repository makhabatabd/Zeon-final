import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from "@material-ui/styles";
import { summerContext } from '../../context/SummerCollection';
import New from '../New/New';
import "./Summer.css"
import SummerCard from './SummerCard';

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

const Summer = () => {
    const {summer, getSummer, summerCount} = useContext(summerContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(+searchParams.get("_page") || 1);
    const classes = useStyles();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    useEffect(() => {
        setScreenWidth(window.innerWidth)
    }, [window.innerWidth])

    
    useEffect(() => {
        if (screenWidth < 321) {
            setSearchParams({
            _limit: 4,
            _page: page,
            })
        } else {
            setSearchParams({
            _limit: 12,
            _page: page,
    });
    }
    }, []);

    useEffect(() => {
    getSummer();
  }, [searchParams]);

    useEffect(() => {
        if (screenWidth < 321) {
            setSearchParams({
            _limit: 4,
            _page: page,
            })
            } else {
            setSearchParams({
            _limit: 12,
            _page: page,
    });
    }
    }, [page]);

useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}, [page])
    

    return (
        <div style={{backgroundColor: "#ECECEC"}}>
            <div className='container'>
                <h3 className='summer-title'>Коллекция Лето 2022</h3>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {summer.map((item) => (
                        <SummerCard item={item} key={item.id}/>
                    ))}
            </div>
                <div className='summer-pagination'>
                    <Pagination
                    variant="outlined" classes={{ ul: classes.ul }} 
                    count={+summerCount}
                    page={+page}
                    onChange={(event, pageVal) => setPage(pageVal)}
                    />
                </div>
            </div>
            <New/>
        </div>
    );
};

export default Summer;