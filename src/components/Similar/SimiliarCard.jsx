import React, { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { favoriteContext } from '../../context/favoriteContext';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate, useParams } from "react-router-dom";
import Color from '../Colors/Color';
import { authContext } from '../../context/authContext';
import { summerContext } from '../../context/SummerCollection';

const SimiliarCard = ({ item }) => {
    const { addDelToFav, isProdInFav } = useContext(favoriteContext)
    const { currentUser} = useContext(authContext);
    const [inFav, setInFav] = useState(isProdInFav(item.id, currentUser))
    const discount = Math.ceil(item.price - (item.price * item.discount / 100))
    const navigate = useNavigate()
    const { getUser } = useContext(summerContext)
     const [pic, setPic] = useState(item.img)
    const [hover, setHover] = useState("sm-hover")
    const handleMouse = (event) => {
        var mouseX = event.nativeEvent.offsetX; 
        let cardWidth = event.target.clientWidth
        let specWidth = Math.ceil(cardWidth / 4)

        if (mouseX > 1 && mouseX < specWidth) {
            setPic(item.img)
            setHover("sm-hover-1")
        }if (mouseX > specWidth && mouseX < specWidth * 2) {
            setPic(item.img2)
            setHover("sm-hover-2")
        } else if (
            mouseX > specWidth * 2 && mouseX < specWidth * 3) {
            setPic(item.img3)
            setHover("sm-hover-3")
        } else if (
            mouseX > specWidth * 3 && mouseX < specWidth * 4) {
            setPic(item.img4)
            setHover("sm-hover-4")
             }
    }
    const handleLeave = () => {
        setPic(item.img)
        setHover("hover")
    }

    useEffect(() => {
        getUser()
    }, [currentUser])

     useEffect(() => {
    setInFav(isProdInFav(item.id, currentUser))
    }, [isProdInFav]);
    return (
        <div className='sm-card-outter'>
        <Card sx={{width:"226px", height: "435px", border:"none", backgroundColor:"transparent", color:"rgba(0, 0, 0, 0)", boxShadow:"none"}} key={item.id} square={true}>
            <CardActionArea>
             {currentUser ?
                    inFav ? (
                    <FavoriteIcon
                    className='sm-favorite'
                    style={{ color: "red" }}
                    onClick={() => {
                    addDelToFav(item);
                    setInFav(isProdInFav(item.id, currentUser));
                    }}
                />
                ) : (
                    <FavoriteBorderIcon
                    style={{ color: "white"}}
                    className='sm-favorite-hover'
                    onClick={() => {
                    addDelToFav(item);
                    setInFav(isProdInFav(item.id, currentUser));
                    }}
                />
                    ) : <Link to="/auth"><FavoriteBorderIcon
                    style={{ color: "white" }}
                    className='sm-favorite-hover'
                />
                </Link> }
            {item.discount ? <div className='red-discount'><span>{item.discount}%</span></div>: null}
            <Link to={`/details/${item.id}`} >
                    <CardMedia onClick={() => navigate(`/details/${item.id}`)} sx={{ height: "332px" }}
                    onMouseMove = {(e) => handleMouse(e)} onMouseLeave={()=>handleLeave()}
                    component="img"
                    height="140"
                    image={pic}
                    alt="hits image"
                    />
                    <div className={hover}></div>
            </Link>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                    </Typography>
                {item.discount ?
                <div><span className='discount'>{discount.toLocaleString().replace(',', ' ')} p</span><span className='price-discount'>{item.price.toLocaleString().replace(',', ' ')} p</span></div> :  
                <Typography className='hit-price' variant="body2" color="text.secondary"><span className='discount'>{item.price.toLocaleString().replace(',', ' ')} p</span>
                </Typography>
                }  
                <Typography variant="body2" color="text.secondary">
                        Размер : {item.size}
                </Typography>
                    <Color id={item.id}/>
                </CardContent>
            </CardActionArea>
            </Card>
            </div>
    );
};

export default SimiliarCard;