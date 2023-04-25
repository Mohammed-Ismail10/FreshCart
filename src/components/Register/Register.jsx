import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import Helmet from "react-helmet";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {

const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState('');

  let navigate = useNavigate();

  async function register(values) {
    setIsLoading(true);
    let {data}=await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`,values).catch((data)=>{
    setIsLoading(false);
    setError(`${data.response.data.message}`);
  });

    if(data.message == 'success'){
      navigate('/login');
    }
    setIsLoading(false);
  }

  let validationSchema = Yup.object({
    name: Yup.string()
      .required(`name is required`)
      .min(3, `name minimum length is 3`)
      .max(15, `name maximum length is 15`),
    email: Yup.string().required(`email is required`).email(`email is invalid`),
    phone: Yup.string()
      .required(`phone is required`)
      .matches(/^01[0125][0-9]{8}$/, `phone must be valid number`),
    password: Yup.string()
      .required(`password is required`)
      .matches(
        /^[A-Z][a-z0-9]{8,15}$/,
        `password must be start with uppercase`
      ),
    rePassword: Yup.string()
      .required(`rePassword is required`)
      .oneOf([Yup.ref(`password`)], `password and repassword is not match`),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: register,
  });

  return (
    <>
    <Helmet>
      <title>FreshCart Register</title>
    </Helmet>
      <div className="w-75 mx-auto py-4">
        <h2>Register Now :</h2>
        {error?<div className="alert alert-danger">{error}</div>:''}
        <form onSubmit={formik.handleSubmit}>
          <label>Name :</label>
          <input
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.name}
            name="name"
            type="text"
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ?
          <div className="alert alert-danger p-2">{formik.errors.name}</div>:''
          }

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

          <label>Phone :</label>
          <input
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.phone}
            name="phone"
            type="tel"
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? 
            <div className="alert alert-danger p-2">{formik.errors.phone}</div>:''
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

          <label>rePassword :</label>
          <input
            className="form-control mb-2"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            name="rePassword"
            type="password"
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? 
            <div className="alert alert-danger p-2">{formik.errors.rePassword}</div>:''
          }
{isLoading?<span
            className="p-2 m-2 rounded d-inline-block text-white bg-main"
          >
            <i className="fas fa-spinner fa-spin"></i>
          </span>:
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn bg-main text-white"
          >
            Register
          </button>}
        </form>
      </div>
    </>
  );
}
