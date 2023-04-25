import React, { useContext, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { categoryContext } from "../../Context/CategoryContext.js";

export default function SubCategories() {
  let { getAllSubCategories } = useContext(categoryContext);
const [subCategory, setSubCategory] = useState([]);
const [loading, setLoading] = useState(false);
  async function getSubCategories() {
    setLoading(true);
    let { data } = await getAllSubCategories();
    setSubCategory(data?.data);
    setLoading(false);
  }

  useEffect(() => {
    getSubCategories();
  }, []);

  return ( 
  <>
<Helmet>
  <title>FreshCart sub categories</title>
</Helmet>
  {loading?<div className="row my-5 justify-content-center position-relative">
          <div className="position-absolute start-0 end-0 top-0 bottom-0 text-center">
            <i className="fas fa-2x fa-spinner fa-spin text-main"></i>
          </div>
        </div>:<div className="row py-5 g-4">
        {subCategory.map((subCategory) => (
          <div key={subCategory._id} className="col-md-3 product">
            <div className="card h-100">
              <div className="card-footer h-100 d-flex align-items-center justify-content-center">
                <h3>{subCategory.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>}
  
  
  
  </>
  );
}
