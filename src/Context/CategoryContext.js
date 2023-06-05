import axios from "axios";
import { createContext } from "react";

export let categoryContext = createContext();


export function CategoryContextProvider({children}){


function getAllCategories(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`).then((response)=>response).catch((error)=>error);
}
function getAllSubCategories(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`).then((response)=>response).catch((error)=>error);
}
function getSpecificSubCategories(categoryId){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`).then((response)=>response).catch((error)=>error);
}

















return <categoryContext.Provider value={{getAllCategories,getAllSubCategories,getSpecificSubCategories}}>
  {children}
</categoryContext.Provider>

}