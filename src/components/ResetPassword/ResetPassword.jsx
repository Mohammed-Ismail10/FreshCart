import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import Helmet from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { updateUserContext } from "../../Context/UpdateUserContext.js";

export default function ResetPassword() {
  let { ResetUserPassword, error } = useContext(updateUserContext);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function submit(values) {
    setLoading(true);
    let { status } = await ResetUserPassword(values);
    if (status === 200) {
      toast.success(`password changed successfully`);
      navigate(`/login`);
    }
    setLoading(false);
  }

  let validationSchema = object({
    email: string().required(`email is required`).email(`email is invalid`),
    newPassword: string()
      .required(`password is required`)
      .matches(
        /^[A-Z][a-z0-9]{8,15}$/,
        `password must be start with uppercase`
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: submit,
  });

  return (
    <>
    <Helmet>
      <title>FreshCart reset password</title>
    </Helmet>
      <form className="py-5" onSubmit={formik.handleSubmit}>
        {error ? <div className="alert alert-danger p-2">{error}</div> : null}
        <label className="mt-2">Email:</label>
        <input
          className="form-control my-2"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="email"
        />
        {formik.errors.email && formik.touched.email ? (
          <div className="alert alert-danger p-2">{formik.errors.email}</div>
        ) : null}
        <label className="mt-2">New password:</label>
        <input
          className="form-control my-2"
          name="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="password"
        />
        {formik.errors.newPassword && formik.touched.newPassword ? (
          <div className="alert alert-danger p-2">
            {formik.errors.newPassword}
          </div>
        ) : null}
        {loading ? (
          <span className="p-2 px-3 m-2 rounded d-inline-block text-white bg-success">
            <i className="fas fa-spinner fa-spin"></i>
          </span>
        ) : (
          <button className="btn btn-success" type="submit">
            Submit
          </button>
        )}
      </form>
    </>
  );
}
