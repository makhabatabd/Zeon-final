import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSearchParams } from 'react-router-dom';
import { collectionContext } from '../../context/Collection';
import Pagination from '@mui/material/Pagination';
import { makeStyles } from "@material-ui/styles";
import { Link } from 'react-router-dom';
import "./Collection.css"

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


const Collection = () => {
    const {collection, getCollection, collectionCount} = useContext(collectionContext)
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
            _limit: 8,
            _page: page,
    });
    }
    }, []);

    useEffect(() => {
    getCollection();
  }, [searchParams]);

       useEffect(() => {
        if (screenWidth < 321) {
            setSearchParams({
            _limit: 4,
            _page: page,
            })
            } else {
            setSearchParams({
            _limit: 8,
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
                <h3 className='collection-main-title'>Коллекции</h3>
            <div className='collection-cards'>
                    {collection.map((item) => (
                        <div className='collection-card-div' key={item.id}>
                        <Card sx={{width: "285px",height: "374px",marginRight: "8px",position: "relative", marginBottom: "8px"}} key={item.id} square={true}>
                        <CardMedia sx={{ width: "286px",height: "330px" }}
                            component="img"
                            height="140"
                            image={item.img}
                            alt="image"
                        />
                            <div className='collection-words'>
                                <p>{item.title}</p>
                            </div>
                            <Link style={{textDecoration: 'none'}} to={'/summer'}>
                            <button className='collection-bottom'>Смотреть все
                                <ArrowForwardIosIcon sx={{ fill: '#fff'}} />
                                </button>
                            </Link>
                    </Card>
                    </div>
                    ))}
            </div>
                <div className='collection-pagination'>
                    <Pagination
                    variant="outlined" classes={{ ul: classes.ul }} shape="rounded"
                    count={collectionCount}
                    page={+page}
                    onChange={(event, pageVal) => setPage(pageVal)}
                    />
                </div>
                </div>
            </div>
    );
};

export default Collection;