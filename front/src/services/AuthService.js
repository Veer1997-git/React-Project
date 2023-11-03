import axios from 'axios';
import jwt_Decode from 'jwt-decode';

const API_URL="http://localhost:8888/api/v1/";
const loginUser=(data)=>{
    return axios.post(`${API_URL}auth`,data)
}
const signupUser=(data)=>{
    return axios.post(`${API_URL}signup`,data)
}

const getToken=()=>{
    return localStorage.getItem("_token")
}

const isLoggedIn=()=>{
    return getToken()!=undefined? true: false;
}

const getUserData=()=>{
    try{
        return jwt_Decode(getToken());
    }
    catch(err){
        return null;
    }
}
const isAdmin=()=>{
    return !getUserData()?false:getUserData().isAdmin;
}

export {loginUser,signupUser,isLoggedIn,getToken,getUserData,isAdmin}