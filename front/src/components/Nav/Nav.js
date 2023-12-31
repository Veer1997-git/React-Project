import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import "./Nav.css";
import {useNavigate} from 'react-router-dom'
import { isLoggedIn,isAdmin } from '../../services/AuthService';
import SearchIcon from '@mui/icons-material/Search';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Nav() {
  const navigate=useNavigate();
  const signOut=()=>{
    if(window.confirm("Do u want to logout ?"))
    {
      localStorage.removeItem("_token");
      navigate("/")
    }
  }
  const searchData=(val)=>{
   if(val!==undefined){
     navigate("/dashboard?ser="+val)
   }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
           
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Qprofiles App
          </Typography>
          {!isLoggedIn() && <>
          <Button color="inherit" onClick={()=> navigate("/")}>Login</Button>
          <Button color="inherit" onClick={()=> navigate("/signup")}>SignUp</Button>
          </>}
          {isLoggedIn() && <>
            <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onKeyUp={(e)=> searchData(e.target.value)}
            />
          </Search>
          <Button color="inherit" onClick={()=> navigate("/dashboard")}>Home</Button>
          <Button color="inherit" onClick={()=> navigate("/dashboard/cart")}>Cart</Button>
            {isAdmin() && <>
              <Button color="inherit" onClick={()=> navigate("/dashboard/addproduct")}>Add Product</Button>
            </>}
          <Button color="inherit" onClick={signOut}>Logout</Button>
          </>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}