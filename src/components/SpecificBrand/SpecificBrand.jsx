import React, { useContext, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useParams } from "react-router-dom";
import { brandsContext } from "../../Context/BrandsContext.js";

export default function SpecificBrand() {
  let { getSpecificBrands } = useContext(brandsContext);
  let param = useParams();
  const [specBrand, setSpecBrand] = useState(null);
const [loading, setLoading] = useState(false);
  async function getSpecificBrandFun(id) {
    setLoading(true);
    let { data } = await getSpecificBrands(id);
    setSpecBrand(data?.data);
    setLoading(false);
  }

  useEffect(() => {
    getSpecificBrandFun(param.id);
  }, []);

  return (
    <>
    <Helmet>
      <title>{specBrand?.name}</title>
    </Helmet>
    {loading?<div className="row my-5 justify-content-center position-relative">
          <div className="position-absolute start-0 end-0 top-0 bottom-0 text-center">
            <i className="fas fa-2x fa-spinner fa-spin text-main"></i>
          </div>
        </div>:<div className="row py-5 g-4">
        <div className="col-md-3">
          <div className="card p-0">
            <div className="crad-body">
              <img
                className="w-100"
                src={specBrand?.image}
                alt={specBrand?.name}
              />
            </div>
            <div className="card-footer text-center">
              <h3>{specBrand?.name}</h3>
            </div>
          </div>
        </div>
      </div>}
      
    </>
  );
}
