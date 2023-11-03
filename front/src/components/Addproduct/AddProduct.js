import  React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import { addProducts } from '../../services/ProductService';
const defaultTheme = createTheme();

export default function AddProduct() {
  const [state,setState]=useState({name:'',category:'',price:'',quantity:'',features:'',imagePath:''})
  const [errMsg,setErrMsg]=useState("");
  const navigate=useNavigate();
  const handler=(event)=>{
     const {name,value}=event.target;
     setState({...state,[name]:value})
  }
  const uploadImage=(event)=>{
     if(event.target.files.length>0){
        setState({...state,imagePath:event.target.files[0]});
     }
  }
  const handleSubmit=(event)=>{
     event.preventDefault();
     if(state.imagePath!=""){
        if(state.imagePath.type==="image/jpg" || state.imagePath.type==="image/jpeg" || state.imagePath.type==="image/png"){
           //when we send data with attachment to the server we send with formdata 
           const formData=new FormData();
           formData.append("name",state.name);
           formData.append("category",state.category);
           formData.append("price",state.price);
           formData.append("quantity",state.quantity);
           formData.append("features",state.features);
           formData.append("attach",state.imagePath);
           addProducts(formData)
           .then(res=>{
              if(res.data.err==0){
                alert(res.data.msg)
              }
              if(res.data.err==1){
                setErrMsg(res.data.msg)
              }
           })
           .catch(err=> console.log(err))
        }
        else{
          setErrMsg("Only upload jpg or png image");
        }
     }
     else{
        setErrMsg("Please select an image");
     }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Add Product
          </Typography>
          {errMsg!='' && <Alert severity="error">{errMsg}!</Alert>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={handler}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="category"
              label="category"
              type="text"
              id="password"
              autoComplete="category"
              onChange={handler}
            />
              <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="price"
              type="text"
              id="price"
              autoComplete="price"
              onChange={handler}
            />
              <TextField
              margin="normal"
              required
              fullWidth
              name="quantity"
              label="quantity"
              type="text"
              id="quantity"
              autoComplete="quantity"
              onChange={handler}
            />
              <TextField
              margin="normal"
              required
              fullWidth
              name="features"
              label="features"
              type="text"
              id="features"
              autoComplete="features"
              onChange={handler}
            />
              <TextField
              margin="normal"
              required
              fullWidth
              name="file"
              type="file"
              id="file"
              autoComplete="file"
              onChange={uploadImage}
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
           
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  )
}
