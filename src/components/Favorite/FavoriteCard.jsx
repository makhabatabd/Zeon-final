import React from 'react';
import Color from "../Colors/Color";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from "@mui/material";
import { useNavigate } from 'react-router-dom';


const FavoriteCard = ({ item1, deleteProdInFav }) => {
    const navigate = useNavigate()
    const handleDetails = () => {
            if (item1.item.type == "summer") {
                navigate(`/details/${item1.item.id}`)
            } else if (item1.item.type == "hit") {
                 navigate(`/hitdetails/${item1.item.id}`)
            } else if (item1.item.type == "brandnew") {
                navigate(`/newdetails/${item1.item.id}`)
            }
        }
    return (
        <Card key={item1.item.id} square={true}>
            <CardActionArea>
                <FavoriteIcon
                    className='favorite'
                    style={{ color: "red", position: "absolute", top: "2%", right: "5%"}}
                    onClick={() => {deleteProdInFav(item1.item.id)}}/>
                    <CardMedia
                        className="photos"
                        height="140"
                        component="img"
                        image={item1.item.img}
                        alt="fav image"
                        onClick={handleDetails}
                        />
                    <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {item1.item.title}
                        </Typography>
                            {item1.item.discount ?
                            <div><span className='discount'>{Math.ceil(item1.item.price - (item1.item.price * item1.item.discount / 100)).toLocaleString().replace(',', ' ')} p</span><span className='price-discount'>{item1.item.price.toLocaleString().replace(',', ' ')} p</span></div> :  
                            <Typography className='hit-price' variant="body2" color="text.secondary"><span className='discount'>{item1.item.price.toLocaleString().replace(',', ' ')} p</span>
                             </Typography>
                            }   
                            <Typography variant="body2" color="text.secondary">
                                Размер : {item1.item.size}
                            </Typography>
                            <Color id={item1.item.id}/>
                     </CardContent>
                </CardActionArea>
            </Card>
    );
};

export default FavoriteCard;