import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import Helmet from "react-helmet";
import toast from "react-hot-toast";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { updateUserContext } from "../../Context/UpdateUserContext.js";

export default function VerifyCode() {
  let { VerifyFromCode, error } = useContext(updateUserContext);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function submit(values) {
    setLoading(true);
    let { data } = await VerifyFromCode(values);
    if (data.status == "Success") {
      navigate(`/resetpassword`);
      toast.success("code success");
    }
    setLoading(false);
  }

  let validationSchema = object({
    resetCode: string().required("code is required"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: submit,
  });

  return (
    <>
    <Helmet>
      <title>FreshCart verify code</title>
    </Helmet>
      <form className="py-5" onSubmit={formik.handleSubmit}>
        {error ? <div className="alert alert-danger p-2">{error}</div> : null}
        <label>Write code that sended to your email here:</label>
        <input
          className="form-control mb-2"
          name="resetCode"
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          type="text"
        />
        {formik.errors.resetCode && formik.touched.resetCode ? (
          <div className="alert alert-danger p-2">
            {formik.errors.resetCode}
          </div>
        ) : (
          ""
        )}
        {loading?<span className="p-2 px-3 m-2 rounded d-inline-block text-white bg-success">
            <i className="fas fa-spinner fa-spin"></i>
          </span>:<button className="btn btn-success" type="submit">
          Submit
        </button>}
        
      </form>
    </>
  );
}
