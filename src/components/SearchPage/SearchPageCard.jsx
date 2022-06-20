import React, { useContext, useState } from 'react';
import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { favoriteContext} from '../../context/favoriteContext';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link, useNavigate } from "react-router-dom";
import Color from '../Colors/Color';

const SearchPageCard = ({ item }) => {
    const discount = Math.ceil(item.price - (item.price * item.discount / 100))
    const { addDelToFav, isProdInFav } = useContext(favoriteContext)
    const [inFav, setInFav] = useState(isProdInFav(item.id))
    const [pic, setPic] = useState(item.img)
    const [hover, setHover] = useState("hover")
    const navigate = useNavigate()

    const handleMouse = (event) => {
        var mouseX = event.nativeEvent.offsetX; 
        let cardWidth = event.target.clientWidth
        let specWidth = Math.ceil(cardWidth / 4)

        if (mouseX > 1 && mouseX < specWidth) {
            setPic(item.img)
            setHover("hover-1")
        }if (mouseX > specWidth && mouseX < specWidth * 2) {
            setPic(item.img2)
            setHover("hover-2")
        } else if (
            mouseX > specWidth * 2 && mouseX < specWidth * 3) {
            setPic(item.img3)
            setHover("hover-3")
        } else if (
            mouseX > specWidth * 3 && mouseX < specWidth * 4) {
            setPic(item.img4)
            setHover("hover-4")
             }
    }
    const handleDetails = () => {
            if (item.type == "summer") {
                navigate(`/details/${item.id}`)
            } else if (item.type == "hit") {
                 navigate(`/hitdetails/${item.id}`)
            } else if (item.type == "brandnew") {
                navigate(`/newdetails/${item.id}`)
            }
        }
    const handleLeave = () => {
        setPic(item.img)
        setHover("hover")
    }
    return (
            <Card square={true} onMouseMove = {(e) => handleMouse(e)} onMouseLeave={()=>handleLeave()}> 
                <CardActionArea>
                    {inFav ? (
                    <FavoriteIcon
                    className='favorite'
                    style={{ color: "red" }}
                    onClick={() => {
                    addDelToFav(item);
                    setInFav(isProdInFav(item.id));
                    }}
                />
                ) : (
                    <FavoriteBorderIcon
                    style={{ color: "white", width:"24px" }}
                    className='favorite-hover'
                    onClick={() => {
                    addDelToFav(item);
                    setInFav(isProdInFav(item.id));
                    }}
                />
                    )}
                {item.discount ? <div className='red-discount'><span>{item.discount}%</span></div>: null}
                        <CardMedia
                        onClick={handleDetails}
                        component="img"
                        height="140"
                        image={pic}
                        alt="hits image"
                    />
                    <div className={hover}></div>
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
                <Color/>
                </CardContent>
                </CardActionArea>
            </Card>
    );
};

export default SearchPageCard;