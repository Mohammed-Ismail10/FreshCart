import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext.js";
import { Helmet } from "react-helmet";

export default function Cart() {
  let { getLoggedCart, deleteItem, updateItem, clearAllItems,setNumOfCartItems } =
    useContext(cartContext);

  const [product, setProduct] = useState(null);

  async function getCart() {
    let {data} = await getLoggedCart();
    if(data.status == 'success'){
      setNumOfCartItems(data.numOfCartItems);
      setProduct(data?.data);
    }
  }
  async function deleteProduct(productId) {
    let {data} = await deleteItem(productId);
    setProduct(data.data);
    setNumOfCartItems(data.numOfCartItems);
    toast(`Item removed`);
  }
  async function updateProduct(productId, count) {
    let {data} = await updateItem(productId, count);
    if (count <= 0) {
      deleteProduct(productId);
    } else {
      setProduct(data.data);
      toast.success(`Item updated`);
    }
  }
  async function ClearCart() {
    let {data} = await clearAllItems();
    setProduct(data?.data);
    setNumOfCartItems(data.numOfCartItems);
    toast.success(`Cart cleared`);
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <Helmet>
        <title>Cart Details</title>
      </Helmet>
      {product ? (
        <div className="bg-main-light p-4 my-4">
          <div className="d-flex justify-content-between">
            <div>
              <h3>Shop Cart :</h3>
              <h6 className="text-main mb-4">
                Total cart price : {product?.totalCartPrice} EGP
              </h6>
            </div>
            <div>
              <button onClick={ClearCart} className="btn bg-main text-white">
                Clear Cart
              </button>
            </div>
          </div>
          {product.products.map((product) => (
            <div
              key={product.product._id}
              className="row align-items-center py-3 my-2 border-bottom"
            >
              <div className="col-md-1">
                <img
                  src={product.product.imageCover}
                  className="w-100"
                  alt={product.product.title}
                />
              </div>

              <div className="col-md-11 d-flex justify-content-between">
                <div>
                  <h6>{product.product.title}</h6>
                  <h6 className="text-main">Price : {product.price}</h6>
                  <button
                    onClick={() => deleteProduct(product.product._id)}
                    className="btn p-0"
                  >
                    <i className="text-main fa-regular fa-trash-can"></i> Delete
                  </button>
                </div>

                <div>
                  <button
                    onClick={() =>
                      updateProduct(product.product._id, product.count + 1)
                    }
                    className="btn border-success btn-sm"
                  >
                    +
                  </button>
                  <span className="mx-2">{product.count}</span>
                  <button
                    onClick={() =>
                      updateProduct(product.product._id, product.count - 1)
                    }
                    className="btn border-success btn-sm"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button className="btn bg-main">
            <Link className="text-white" to={`/checkout`}>
              {" "}
              Check out
            </Link>
          </button>
        </div>
      ) : (
        <>
        <div className="bg-main-light p-4 my-4">
          <div className="d-flex justify-content-between">
            <div>
              <h3>Shop Cart :</h3>
              <h6 className="text-main mb-4">
                Total cart price : {product?.totalCartPrice} EGP
              </h6>
            </div>
            <div>
              <button onClick={ClearCart} className="btn bg-main text-white">
                Clear Cart
              </button>
            </div>
          </div>
          
          <button className="btn bg-main">
            <Link className="text-white" to={`/checkout`}>
              {" "}
              Check out
            </Link>
          </button>
        </div>
        </>
      )}
    </>
  );
}
