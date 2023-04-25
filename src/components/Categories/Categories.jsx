import React, { useContext, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import { categoryContext } from "../../Context/CategoryContext.js";

export default function Categories() {
  let { getAllCategories } = useContext(categoryContext);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getCategories() {
    setLoading(true);
    let { data } = await getAllCategories();
    setCategory(data?.data);
    setLoading(false);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
    <Helmet>
      <title>FreshCart Categories</title>
    </Helmet>
    {loading?<div className="row my-5 justify-content-center position-relative">
          <div className="position-absolute start-0 end-0 top-0 bottom-0 text-center">
            <i className="fas fa-2x fa-spinner fa-spin text-main"></i>
          </div>
        </div>:<div className="row py-5 g-4">
        {category.map((category) => (
          <div key={category._id} className="col-md-3 product">
            <Link to={`/specificcategory/${category?._id}`}>
            <div className="card h-100">
              <img className="w-100" src={category.image} alt="" />
              <div className="card-footer h-100 d-flex align-items-center justify-content-center">
                <h3>{category.name}</h3>
              </div>
            </div>
          </Link>
          </div>
        ))}
      </div>}
      
      <button className="btn btn-success mb-5">
        <Link className="text-white" to={`/subcategories`}>
          Show all sub categories
        </Link>
      </button>
    </>
  );
}
