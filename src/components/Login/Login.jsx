import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import Helmet from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Login({saveUserData}) {

const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');

  let navigate = useNavigate();

  async function login(values) {
    setIsLoading(true);
    let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values).catch((data)=>{
    setIsLoading(false);
    setError(`${data.response.data.message}`);
  });

    if(data.message == 'success'){
      localStorage.setItem(`userToken`,data.token);
      saveUserData();
      navigate('/');
    }
    setIsLoading(false);
  }

  let validationSchema = Yup.object({
    email: Yup.string().required(`email is required`).email(`email is invalid`),
    password: Yup.string()
      .required(`password is required`)
      .matches(
        /^[A-Z][a-z0-9]{8,15}$/,
        `password must be start with uppercase`
      ),
  });
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });

  return (
    <>
    <Helmet>
      <title>FreshCart login</title>
    </Helmet>
      <div className="w-75 mx-auto py-4">
        <h2>Login Now :</h2>
        {error?<div className="alert alert-danger">{error}</div>:''}
        <form className="mt-3" onSubmit={formik.handleSubmit}>
          

          <label>Email :</label>
          <input
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            type="email"
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? 
            <div className="alert alert-danger p-2">{formik.errors.email}</div>:''
          }

          

          <label>password :</label>
          <input
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            type="password"
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? 
            <div className="alert alert-danger p-2">{formik.errors.password}</div>:''
          }

          <Link className="text-primary fw-semibol d-block my-3" to={`/forgotpassword`}>
            Forgot password?
          </Link>
          
{isLoading?<span
            
            className="p-2 px-3 m-2 rounded d-inline-block bg-main text-white"
          >
            <i className="fas fa-spinner fa-spin"></i>
          </span>:
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white"
          >
            Login
          </button>}
        </form>
      </div>
    </>
  );
}
