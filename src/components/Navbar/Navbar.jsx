import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext.js";
import { wishlistContext } from "../../Context/WishlistContext.js";
import logo from "../../img/freshcart-logo.svg";

export default function Navbar({ userData, logout }) {
  let { numOfCartItems } = useContext(cartContext);
  let { countWishlist } = useContext(wishlistContext);

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Fresh Cart logo" />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>

              {/* <li className="nav-item">
              <Link className="nav-link" to="products">Products</Link>
            </li> */}
              <li className="nav-item">
                <Link className="nav-link" to="categories">
                  Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="brands">
                  Brands
                </Link>
              </li>
              {userData ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link position-relative" to="cart">
                      <i className="fas fa-shopping-cart fa-lg"></i>
                      <span className="badge bg-main text-white position-absolute top-0 end-0">
                        {numOfCartItems}
                      </span>
                    </Link>
                  </li>
                  <li className="nav-item ms-3">
                    <Link
                      title="wishlist"
                      className="nav-link position-relative"
                      to="wishlist"
                    >
                      <i class="fa-solid fa-heart"></i>
                      <span className="badge p-1 bg-main text-white position-absolute top-0 end-0">
                        {countWishlist}
                      </span>
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              <li className="nav-item d-flex align-items-center">
                <i className="fab fa-instagram mx-2"></i>
                <i className="fab fa-facebook mx-2"></i>
                <i className="fab fa-tiktok mx-2"></i>
                <i className="fab fa-twitter mx-2"></i>
                <i className="fab fa-linkedin mx-2"></i>
                <i className="fab fa-youtube mx-2"></i>
              </li>

              {userData ? (
                <>
                  <li className="nav-item">
                    <span onClick={logout} className="cursor-pointer nav-link">
                      Logout
                    </span>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={`myaccount`}>
                      My Account
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
