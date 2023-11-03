import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {isAdmin} from '../../services/AuthService'
export default function ProductList({product,delPro}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={product.imageURL}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            Price : Rs.{product.price} <br/>
            Quantity : {product.quantity}
               </Typography>
      </CardContent>
      <CardActions>
        {isAdmin() && <>
            <Button size="small" onClick={()=> delPro(product._id)}>Delete</Button>
        <Button size="small">Edit</Button>
        </>}
        
        <Button size="small">Add To Cart</Button>
      </CardActions>
    </Card>
  );
}