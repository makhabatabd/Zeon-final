import React, { useContext, useEffect, useState } from 'react';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { favoriteContext } from '../../context/favoriteContext';
import Color from '../Colors/Color';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../context/authContext';

const NewCard = ({ item }) => {
    const { addDelToFav, isProdInFav } = useContext(favoriteContext)
    const { currentUser} = useContext(authContext);
    const [inFav, setInFav] = useState(isProdInFav(item.id, currentUser))
    const discount = Math.ceil(item.price - (item.price * item.discount / 100))
    const navigate = useNavigate()
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
    setInFav(isProdInFav(item.id, currentUser))
    }, [isProdInFav]);

    const cardStyle = {
        width: "226px", 
        marginRight: "8px", 
        border: "none", 
        backgroundColor: "transparent", 
        color: "rgba(0, 0, 0, 0)", 
        boxShadow: "none",
    }
    return (
         <div className='sm-card-outter'>
            <Card className='sm-card' style={cardStyle} sx={{ height: "435px" }} key={item.id} square={true}>
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
                    <CardMedia
                        onMouseMove={(e) => handleMouse(e)} onMouseLeave={() => handleLeave()}
                        sx={{height:"332px"}}
                    component="img"
                    image={pic}
                        alt="image"
                        onClick={()=>navigate(`/newd/${item.id}`)}
                    />
                    <div className={hover}></div>
                <CardContent sx={{padding:0}}>
                {item.discount ?
                <div><span style={{marginRight:"8px"}} className='price-discount'>{item.price.toLocaleString().replace(',', ' ')} p</span><span className='discount'>{discount.toLocaleString().replace(',', ' ')} p</span></div> :  
                <span className='discount'>{item.price.toLocaleString().replace(',', ' ')} p</span>
                }  
                <Typography sx={{margin: "6px 0 6px 0", color:"#393939", fontSize: "14px", fontWeight:"500", fontFamily: "Montserrat"}} gutterBottom variant="h5" component="div">
                    {item.title}
                </Typography>
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

export default NewCard;