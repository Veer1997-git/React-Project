import React from 'react'
import {BrowserRouter as Router, Routes,Route, Navigate} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Container from '@mui/material/Container';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import AddProduct from './components/Addproduct/AddProduct';
import { isAdmin, isLoggedIn } from './services/AuthService';
function RequiredAuth({children,redirectTo})
{
  
   return isLoggedIn()?children: <Navigate to={redirectTo}/>
}
function RequiredAdminAuth({children,redirectTo})
{
  
   return isLoggedIn()&&isAdmin()?children: <Navigate to={redirectTo}/>
}
export default function App() {
  return (
    <div>
      <Router>
           <Nav />
           <Container>
              <Routes>
                  <Route path="/" element={<Login/>}/>
                  <Route path="/signup" element={<Signup/>}/>
                  <Route path="/dashboard" element={
                  <RequiredAuth redirectTo="/">   <Products/> </RequiredAuth>
                }/>
                  <Route path="/dashboard/cart" element={ <RequiredAuth redirectTo="/">   <Cart/> </RequiredAuth>}/>
                  <Route path="/dashboard/addproduct" element={ <RequiredAdminAuth redirectTo="/dashboard">   <AddProduct/> </RequiredAdminAuth>}/>
              </Routes>
           </Container>
      </Router>
    </div>
  )
}
