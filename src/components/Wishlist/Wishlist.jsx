import React, { useContext, useEffect, useState } from 'react'
import { wishlistContext } from '../../Context/WishlistContext.js'
import Helmet from 'react-helmet';
import toast from 'react-hot-toast';

export default function Wishlist() {


let {getLoggedWishlist,setCountWishlist,deleteWish} = useContext(wishlistContext);
const [wish, setWish] = useState([]);

async function getWishlist(){
  let {data} = await getLoggedWishlist();
  setWish(data?.data);
}

async function deleteWishFun(id){
let {data} = await deleteWish(id);
setCountWishlist(data?.data?.length);
getWishlist();
toast.success(data.message);
}




useEffect(()=>{
  getWishlist();
},[])





  return (
    <>
      <Helmet>
        <title>FreshCart wishlist</title>
      </Helmet>
      {wish ? (
        <div className="bg-main-light p-4 my-4">
          {wish.map((wish) => (
            <div
              key={wish._id}
              className="row align-items-center py-3 my-2 border-bottom"
            >
              <div className="col-md-1">
                <img
                  src={wish.imageCover}
                  className="w-100"
                  alt={wish.title}
                />
              </div>

              <div className="col-md-11 d-flex justify-content-between">
                <div>
                  <h6>{wish.title}</h6>
                  <h6 className="text-main">Price : {wish.price}</h6>
                  <button
                    onClick={() => deleteWishFun(wish._id)}
                    className="btn p-0"
                  >
                    <i className="text-main fa-regular fa-trash-can"></i> Delete
                  </button>
                </div>

                
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="row my-5 justify-content-center position-relative">
          <div className="position-absolute start-0 end-0 top-0 bottom-0 text-center">
            <i className="fas fa-2x fa-spinner fa-spin text-main"></i>
          </div>
        </div>
      )}
    </>
  )
}
