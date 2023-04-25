import axios from "axios";
import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

export default function ProductDetails() {
  const [loading, setLoading] = useState(false)
  const [productDetails, setProductDetails] = useState(null);
  let params = useParams();

  async function getProductDetails(id) {
    setLoading(true)
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products/${id}`
    );
    setProductDetails(data.data);
    setLoading(false)
  }

  useEffect(() => {
    getProductDetails(params.id);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
    <Helmet>
      <title>{productDetails?.title}</title>
    </Helmet>
    {loading? <div className="row my-5 justify-content-center position-relative">
    <div className="position-absolute start-0 end-0 top-0 bottom-0 text-center">
      <i className="fas fa-2x fa-spinner fa-spin text-main"></i>
    </div>
    </div>:     <div className="row align-items-center py-3">
        <div className="col-md-4">
          <Slider {...settings}>
            {productDetails?.images.map((img) => (
              <img key={img._id} className="w-100" src={img} alt={productDetails.title} />
            ))}
          </Slider>
        </div>
        <div className="col-md-8">
          <h3>{productDetails?.title}</h3>
          <p className="text-muted">{productDetails?.description}</p>
          <div className="d-flex justify-content-between font-sm">
            <span className="text-muted">{productDetails?.price} EGP</span>
            <span>
              <i class="fa-solid fa-star rating-color"></i>
              {productDetails?.ratingsAverage}
            </span>
          </div>
          <button className="btn bg-main text-white w-100 mt-3"> + Add</button>
        </div>
      </div>}
 
    </>
  );
}
