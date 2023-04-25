import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/CartContext.js";
import { wishlistContext } from "../../Context/WishlistContext.js";

export default function FeaturedProducts() {
  
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { addToCart,setNumOfCartItems} = useContext(cartContext);
  const {addToWishlist,setCountWishlist} = useContext(wishlistContext);
  let navigate = useNavigate();

  async function addProduct(productId) {
    if (localStorage.getItem(`userToken`) !== null) {
      let response = await addToCart(productId);
      toast.success(response.data.message);
      setNumOfCartItems(response.data.numOfCartItems);
    } else {
      navigate(`/login`);
    }
  }

async function addToWishlistFun(id){
  if(localStorage.getItem(`userToken`)!== null){
    let {data} = await addToWishlist(id);
  toast.success(data.message);
  setCountWishlist(data.data.length);
  }
  else{
    navigate(`/login`);
  }
}




  async function getFeaturedProducts() {
    setLoading(true);
    let { data } = await axios.get(
      `https://route-ecommerce.onrender.com/api/v1/products`
    );
    setProducts(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getFeaturedProducts();
  }, []);

  return (
    <>
      {loading ? (
        <div className="row my-5 justify-content-center position-relative">
          <div className="position-absolute start-0 end-0 top-0 bottom-0 text-center">
            <i className="fas fa-2x fa-spinner fa-spin text-main"></i>
          </div>
        </div>
      ) : (
        <div className="row my-5">
          {products?.map((product) => (
            <div key={product?._id} className="col-md-2">
              <div className="product cursor-pointer px-2 py-3">
                <Link to={`productdetails/${product?._id}`}>
                  <img className="w-100" src={product?.imageCover} alt="" />
                  <span className="text-main fw-bold font-sm">
                    {product?.category?.name}
                  </span>
                  <h3 className="h6 fw-bold">
                    {product?.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="d-flex justify-content-between font-sm">
                    <span className="text-muted">{product?.price} EGP</span>
                    <span>
                      <i class="fa-solid fa-star rating-color"></i>
                      {product?.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => addProduct(product?._id)}
                  className="btn bg-main font-sm text-white w-100 mt-3"
                >
                  + Add to cart
                </button>
                <button
                  onClick={()=>addToWishlistFun(product._id)}
                  className="btn bg-main font-sm text-white w-100 mt-3"
                >
                  + Add to wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
