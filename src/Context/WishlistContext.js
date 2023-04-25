import axios from "axios";
import { Children, createContext, useEffect, useState } from "react";



export let wishlistContext = createContext();



export function WishlistContextProvider({children}){

let headers ={
  token:localStorage.getItem(`userToken`)
}

const [countWishlist, setCountWishlist] = useState(0);

async function getCountWishlist(){
  let {data} = await getLoggedWishlist();
  setCountWishlist(data.count);
}

useEffect(()=>{
  getCountWishlist();
},[])



function addToWishlist(productId){
  return axios.post(`https://route-ecommerce.onrender.com/api/v1/wishlist`,{
    productId
  },{
    headers
  }).then((response)=>response).catch((error)=>error);
}



function getLoggedWishlist(){
  return axios.get(`https://route-ecommerce.onrender.com/api/v1/wishlist`,{
    headers
  }).then((response)=>response).catch((error)=>error);
}



function deleteWish(wishId){
  return axios.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${wishId}`,{
    headers
  }).then((response)=>response).catch((error)=>error);
}









  return <wishlistContext.Provider value={{addToWishlist,getLoggedWishlist,countWishlist,setCountWishlist,deleteWish}}>
    {children}
  </wishlistContext.Provider>
}