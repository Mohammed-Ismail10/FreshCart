import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategorySlider() {
  const [categories, setCategories] = useState(null);
const [loading, setLoading] = useState(false)
  async function getCategories() {
    setLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setCategories(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
  };

  return (
    <>
    {loading? <div className="row my-5 justify-content-center position-relative">
    <div className="position-absolute start-0 end-0 top-0 bottom-0 text-center">
      <i className="fas fa-2x fa-spinner fa-spin text-main"></i>
    </div>
      
    </div>:<>
    <h2 className="mt-5">Shop Popular Categories</h2>
      <Slider {...settings}>
        {categories?.map((category) => (
          
          <div className="text-center mb-5" key={category._id}>
            <img height={200} className="w-100" src={category?.image} alt={category?.name} />
            <h2 className="h6 pt-2">{category?.name}</h2>
          </div>
          
        ))}
      </Slider></>}
  
    </>
  );
}
