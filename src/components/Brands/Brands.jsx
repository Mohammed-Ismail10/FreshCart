import React, { useContext, useEffect, useState } from 'react'
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { brandsContext } from '../../Context/BrandsContext.js';

export default function Brands() {


  let {getBrands} = useContext(brandsContext);
const [brands, setBrands] = useState([]);
const [loading, setLoading] = useState(false);
  async function getBrandsFun(){
    setLoading(true);
    let {data} = await getBrands();
    setBrands(data?.data);
    setLoading(false);
  }

useEffect(()=>{
getBrandsFun();
},[])


  return (
    <>
    <Helmet>
      <title>FreshCart Brands</title>
    </Helmet>
    {loading?<div className="row my-5 justify-content-center position-relative">
          <div className="position-absolute start-0 end-0 top-0 bottom-0 text-center">
            <i className="fas fa-2x fa-spinner fa-spin text-main"></i>
          </div>
        </div>:<div className="row py-5 g-4">
        {brands.map((brand)=><div key={brand._id} className='col-md-3'>
          <Link to={`/specificbrand/${brand._id}`}>
          <div className="card">
            <div className="crad-body">
              <img className='w-100' src={brand.image} alt="" />
            </div>
            <div className="card-footer text-center">
              <h3>{brand.name}</h3>
            </div>
          </div>
          </Link>
        </div>)}
      </div>}
      
    </>
  )
}
