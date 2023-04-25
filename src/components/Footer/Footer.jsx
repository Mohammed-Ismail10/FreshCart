import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="bg-main-light py-5">
        <div className="container">
          <h4>Get the FreshCart app</h4>
          <p className="text-muted">
            We will send you a link, open it on your phone to download the app.
          </p>
          <form className="pb-5 border-bottom">
            <div className="row">
              <div className="col-md-9">
                <input
                  className="form-control"
                  placeholder="Email .."
                  type="email"
                />
              </div>
              <div className="col-md-3">
                <button className="btn bg-main text-white">
                  Share App Link
                </button>
              </div>
            </div>
          </form>
          <div className="d-flex justify-content-between border-bottom py-3">
            <p>Payment Partners</p>
            <p>Get deliveries with FreshCart </p>
          </div>
        </div>
      </footer>
    </>
  );
}
