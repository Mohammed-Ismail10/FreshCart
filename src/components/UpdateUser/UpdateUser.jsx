import { useFormik } from "formik";
import React, { useContext } from "react";
import Helmet from "react-helmet";
import { object, string } from "yup";
import { updateUserContext } from "../../Context/UpdateUserContext.js";

export default function UpdateUser() {
let {UpdateUserData,error } = useContext(updateUserContext);

  async function UpdateData(values) {
    let {data} = await UpdateUserData(values);
    console.log(data);
  }

  let validationSchema = object({
    name: string()
      .required(`name is required`)
      .min(3, `name minimum length is 3`)
      .max(15, `name maximum length is 15`),
    email: string().required(`email is required`).email(`email is invalid`),
    phone: string()
      .required(`phone is required`)
      .matches(/^[0-9]{11}$/, `phone must be 11 numbers`),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: UpdateData,
  });

  return (
    <>
    <Helmet>
      <title>FreshCart update logged user data</title>
      </Helmet>
      <form className="py-5" onSubmit={formik.handleSubmit}>
      {error?<div className="alert alert-danger">{error}</div>:''}
        <label>New Name :</label>
        <input
          className="form-control mb-2"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          type="text"
        />
        {formik.errors.name && formik.touched.name ?
          <div className="alert alert-danger p-2">{formik.errors.name}</div>:''}
        <label>New Email :</label>
        <input
          className="form-control mb-2"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          type="text"
        />
        {formik.errors.email && formik.touched.email ?
          <div className="alert alert-danger p-2">{formik.errors.email}</div>:''}
        <label>New Phone :</label>
        <input
          className="form-control mb-2"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          type="text"
        />
        {formik.errors.phone && formik.touched.phone ?
          <div className="alert alert-danger p-2">{formik.errors.phone}</div>:''}
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </>
  );
}
