import React from "react";
import CategorySlider from "../CategorySlider/CategorySlider.jsx";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts.jsx";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>FreshCart</title>
      </Helmet>
      {/* <CategorySlider /> */}
      <FeaturedProducts />
    </>
  );
}
