import React,{useState,useEffect} from 'react'
import { deleteProduct, getProducts,getSearchProducts } from '../../services/ProductService';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProductList from '../ProductList/ProductList';
import { useSearchParams } from 'react-router-dom';
export default function Products() {
  const [proData,setProData]=useState([]);
  const [searchParams]=useSearchParams();
  const ser=searchParams?.get('ser');
  useEffect(()=>{
     if(ser!=null){
      getSearchProducts(ser)
       .then(res=>{
           if(res.data.err==0){
             console.log(res.data)
            setProData(res.data.prodata)
          }
       })
       .catch(err=> console.log(err))
       
     }
     else{
    getProducts()
    .then(res=>{
       if(res.data.err==0){
         console.log(res.data)
         setProData(res.data.prodata)
       }
    })
    .catch(err=> console.log(err))
  }
  },[ser]);
  const delPro=(id)=>{
    if(window.confirm("Do u want to delete?"))
    {
       deleteProduct(id)
       .then(res=>{
         if(res.data.err==0){
           alert("Product Deleted");
           let data=proData.filter(pro=> pro._id!=id);
           setProData(data);
         }
       })
    }
  }
  return (
    <div>
       <Box sx={{ flexGrow: 1 }}>
          <h2> Products</h2>
          <Grid container spacing={2}>
             {proData.map(pro=> 
                  <Grid  xs={4} key={pro._id}>
                      <ProductList product={pro} delPro={delPro}/>
                  </Grid>
              )}
          </Grid>
       </Box>
    </div>
  )
}
