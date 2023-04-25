import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";



export let updateUserContext = createContext();


export function UpdateUserContextProvider({ children }) {

  const [error, setError] = useState('');



  let headers = {
    token: localStorage.getItem(`userToken`)
  }


  function UpdateUserData(values) {
    return axios.put(`https://route-ecommerce.onrender.com/api/v1/users/updateMe/`,values,
      {
        headers
      }
      ).then(()=>{
      toast.success(`your data updated success`);
    })
      .catch(({response})=>{
        setError(response.data.errors.msg)
      })
  }


  
  function UpdateUserPassword(values) {
    return axios.put(`https://route-ecommerce.onrender.com/api/v1/users/changeMyPassword`,values,
      {
        headers
      }
      ).then(()=>{
      toast.success(`your password updated success`);
    })
      .catch(({response})=>{
        setError(response.data.errors.msg);
      })
  }

  function ForgotUserPassword(values) {
    return axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/forgotPasswords`,values
      ).then((response)=>response)
      .catch(({response})=>{
        setError(response.data.message);
      })
  }


  function VerifyFromCode(values) {
    return axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/verifyResetCode`,values
      ).then((response)=>response)
      .catch(({response})=>{
        setError(response.data.message);
      })
  }
  function ResetUserPassword(values) {
    return axios.put(`https://route-ecommerce.onrender.com/api/v1/auth/resetPassword`,values
      ).then((response)=>response)
      .catch(({response})=>{
        setError(response.data.message);
      })
  }











  return <updateUserContext.Provider value={{UpdateUserData,error,UpdateUserPassword,ForgotUserPassword,VerifyFromCode,ResetUserPassword}}>
    {children}
  </updateUserContext.Provider>

}