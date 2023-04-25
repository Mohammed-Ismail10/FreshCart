import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import Helmet from "react-helmet";
import { cartContext } from "../../Context/CartContext.js";

export default function Checkout() {
  let { onlinePayment, cartId } = useContext(cartContext);
  const [loading, setLoading] = useState(false);

  async function submit(shippingAddress) {
    setLoading(true);
    let response = await onlinePayment(cartId, shippingAddress);
    console.log(response);
    if (response?.data?.status == "success") {
      window.location.href = response.data.session.url;
    }
    setLoading(false);
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: submit,
  });

  return (
    <>
    <Helmet>
      <title>FreshCart online payment</title>
    </Helmet>
      <div className="w-50 mx-auto py-5">
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="details">Details :</label>
          <input
            className="form-control mb-3"
            type="text"
            name="details"
            id="details"
            value={formik.values.details}
            onChange={formik.handleChange}
          />

          <label htmlFor="phone">Phone :</label>
          <input
            className="form-control mb-3"
            type="tel"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />

          <label htmlFor="city">City :</label>
          <input
            className="form-control mb-3"
            type="text"
            name="city"
            id="city"
            value={formik.values.city}
            onChange={formik.handleChange}
          />

          {loading ? (
            <span className="p-2 px-3 m-2 rounded d-inline-block bg-main text-white">
              <i className="fas fa-spinner fa-spin"></i>
            </span>
          ) : (
            <button type="submit" className=" w-100 btn border-success">
              Pay
            </button>
          )}
        </form>
      </div>
    </>
  );
}
