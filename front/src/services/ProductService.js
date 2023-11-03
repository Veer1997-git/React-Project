import axios from 'axios';
const API_URL="http://localhost:8888/api/v1/";
const addProducts=(data)=>{
    return axios.post(`${API_URL}products`,data)
}
const getProducts=()=>{
    return axios.get(`${API_URL}products`)
}
const getSearchProducts=(ser)=>{
    return axios.get(`${API_URL}searchproducts/${ser}`)
}
const deleteProduct=(id)=>{
    return axios.delete(`${API_URL}products/${id}`)
}
const updateProduct=(id,data)=>{
    return axios.put(`${API_URL}products/${id}`,data)
}
const getProductById=(id)=>{
    return axios.get(`${API_URL}getproductbyid/${id}`)
}
export {addProducts,getProducts,deleteProduct,updateProduct,getProductById,getSearchProducts};