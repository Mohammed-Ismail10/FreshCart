import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import Helmet from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { updateUserContext } from "../../Context/UpdateUserContext.js";

export default function ForgotPassword() {
  let { ForgotUserPassword, error } = useContext(updateUserContext);
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  async function submit(values) {
    setLoading(true);
    let { data } = await ForgotUserPassword(values);
    if (data.statusMsg == "success") {
      navigate(`/verifyresetcode`);
      toast.success(data.message);
    }
    setLoading(false);
  }

  let validationSchema = object({
    email: string().required(`email is required`).email(`email is invalid`),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: submit,
  });

  return (
    <>
    <Helmet>
      <title>Forgot password</title>
    </Helmet>
      <form onSubmit={formik.handleSubmit} className="py-5">
        <label>Enter email to send code :</label>
        {error ? (
          <div className="alert alert-danger">
            {error.split(` `).slice(0, -1).join(` `)}
          </div>
        ) : (
          ""
        )}
        <input
          className="form-control my-3"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="email"
        />
        {loading ? (
          <span className="p-2 px-3 m-2 rounded d-inline-block text-white bg-success">
            <i className="fas fa-spinner fa-spin"></i>
          </span>
        ) : (
          <button type="submit" className="btn btn-success">
            Send
          </button>
        )}
      </form>
    </>
  );
}
