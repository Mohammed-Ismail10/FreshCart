import React, { useContext, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useParams } from "react-router-dom";
import { categoryContext } from "../../Context/CategoryContext.js";

export default function SubCategory() {
  const [subCategory, setSubCategory] = useState([]);
const [loading, setLoading] = useState(false);
  let { getSpecificSubCategories } = useContext(categoryContext);
  let param = useParams();
  async function getSpecificSubCategoriesFun(id) {
    setLoading(true);
    let { data } = await getSpecificSubCategories(id);
    setSubCategory(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getSpecificSubCategoriesFun(param.id);
  }, []);

  return (
    <>
    <Helmet>
      <title>FreshCart sub category</title>
    </Helmet>
    {loading?<div className="row my-5 justify-content-center position-relative">
          <div className="position-absolute start-0 end-0 top-0 bottom-0 text-center">
            <i className="fas fa-2x fa-spinner fa-spin text-main"></i>
          </div>
        </div>:<div className="row py-5 g-4">
        {subCategory.map((sub)=><div key={sub._id} className="col-md-3">
        <div className="card h-100">
              <div className="card-footer h-100 d-flex align-items-center justify-content-center">
                <h3>{sub.name}</h3>
              </div>
            </div>
        </div>)}
      </div>}
      
    </>
  );
}
