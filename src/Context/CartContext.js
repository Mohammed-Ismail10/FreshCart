import axios from "axios";
import toast from "react-hot-toast";

const { createContext, useEffect, useState } = require("react");



export let cartContext = createContext();

export function CartContextProvider({children}) {

  let headers = {
    token: localStorage.getItem(`userToken`)
  }


const [cartId, setCartId] = useState(null);
const [numOfCartItems, setNumOfCartItems] = useState(0);

  // async function getCart() {
  //   let {data} = await getLoggedCart();
  //   console.log(data);
  //   setCartId(data.data._id);
  //   setNumOfCartItems(data.numOfCartItems);
  // }
  // useEffect(() => {
  //   getCart();
  // }, [])





  function addToCart(productId) {
    return axios.post(`https://route-ecommerce.onrender.com/api/v1/cart`,
      {
        productId: productId
      },
      {
        headers: headers
      }).then((response) => response).catch((error) => error);
  }

  function getLoggedCart() {
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/cart`,
      {
        headers: headers
      }).then((response) => response).catch(({response}) => {
        toast.error(response.data.message.split(' ').slice(0,-1).join(' '));
      });
  }
  function deleteItem(productId) {
    return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
      {
        headers: headers
      }).then((response) => response).catch((error) => error);
  }
  function updateItem(productId, count) {
    return axios.put(`https://route-ecommerce.onrender.com/api/v1/cart/${productId}`,
      {
        count: count
      },
      {
        headers: headers
      }).then((response) => response).catch((error) => error);
  }
  function clearAllItems() {
    return axios.delete(`https://route-ecommerce.onrender.com/api/v1/cart`,
      {
        headers: headers
      }).then((response) => response).catch((error) => error);
  }
  function onlinePayment(cartId, shippingAddress) {
    return axios.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
      {
        shippingAddress: shippingAddress
      },
      {
        headers: headers
      }).then((response) => response).catch((error) => error);
  }



  return <cartContext.Provider value={{setNumOfCartItems,numOfCartItems,cartId, addToCart, getLoggedCart, deleteItem, updateItem, clearAllItems, onlinePayment }}>
    {children}
  </cartContext.Provider>




}