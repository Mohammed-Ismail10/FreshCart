import { useFormik } from "formik";
import React, { useContext } from "react";
import { object, string } from "yup";
import { updateUserContext } from "../../Context/UpdateUserContext.js";
import * as Yup from 'yup';
import Helmet from "react-helmet";

export default function UpdatePassword() {

  let {UpdateUserPassword,error } = useContext(updateUserContext);

  async function UpdateData(values) {
    let {data} = await UpdateUserPassword(values);
  }

  let validationSchema = object({
    currentPassword: string()
    .required(`password is required`)
    .matches(
      /^[A-Z][a-z0-9]{8,15}$/,
      `password must be start with uppercase`
    ),
      password: string()
      .required(`password is required`)
      .matches(
        /^[A-Z][a-z0-9]{8,15}$/,
        `password must be start with uppercase`
      ),
      rePassword: string()
      .required(`rePassword is required`)
      .oneOf([Yup.ref(`password`)], `password and repassword is not match`),
  });

  let formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: UpdateData,
  });



  return (
    <>
    <Helmet>
      <title>FreshCart update logged user password</title>
    </Helmet>
      <form className="py-5" onSubmit={formik.handleSubmit}>
      {error?<div className="alert alert-danger">{error}</div>:''}
        <label>Current Password :</label>
        <input
          className="form-control mb-2"
          name="currentPassword"
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          type="password"
          onBlur={formik.handleBlur}
        />
        {formik.errors.currentPassword && formik.touched.currentPassword ?
          <div className="alert alert-danger p-2">{formik.errors.currentPassword}</div>:''}
        <label>New password :</label>
        <input
          className="form-control mb-2"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          type="password"
          onBlur={formik.handleBlur}
        />
        {formik.errors.password && formik.touched.password ?
          <div className="alert alert-danger p-2">{formik.errors.password}</div>:''}
        <label>Re password :</label>
        <input
          className="form-control mb-2"
          name="rePassword"
          value={formik.values.rePassword}
          onChange={formik.handleChange}
          type="Password"
          onBlur={formik.handleBlur}
        />
        {formik.errors.rePassword && formik.touched.rePassword ?
          <div className="alert alert-danger p-2">{formik.errors.rePassword}</div>:''}
        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </>
  )
}
