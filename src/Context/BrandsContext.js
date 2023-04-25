import axios from "axios";
import { createContext } from "react";




export let brandsContext = createContext();


export function BrandsContextProvider({children}){


  function getBrands(){
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`).then((response)=>response).catch((error)=>error);
  }
  function getSpecificBrands(brandId){
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/brands/${brandId}`).then((response)=>response).catch((error)=>error);
  }












return <brandsContext.Provider value={{getBrands,getSpecificBrands}}>
{children}
</brandsContext.Provider>


}