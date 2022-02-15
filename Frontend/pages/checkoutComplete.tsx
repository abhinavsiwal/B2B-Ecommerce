import Link from "next/link";
import React from "react";

const CheckoutComplete = () => {
  return (
    <React.Fragment>
      <div className="page-title-overlap bg-dark pt-4">
        <div className="container d-lg-flex justify-content-between py-2 py-lg-3">
          <div className="order-lg-2 mb-3 mb-lg-0 pt-lg-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-light flex-lg-nowrap justify-content-center justify-content-lg-start">
                <li className="breadcrumb-item">
                  <a className="text-nowrap" href="index-2.html">
                    <i className="ci-home"></i>Home
                  </a>
                </li>
                <li className="breadcrumb-item text-nowrap">
                  <a href="shop-grid-ls.html">Shop</a>
                </li>
                <li
                  className="breadcrumb-item text-nowrap active"
                  aria-current="page"
                >
                  Checkout
                </li>
              </ol>
            </nav>
          </div>
          <div className="order-lg-1 pe-lg-4 text-center text-lg-start">
            <h1 className="h3 text-light mb-0">Checkout</h1>
          </div>
        </div>
      </div>
      <div className="container pb-5 mb-2 mb-md-4">
        <div className="row">
          <section className="col-lg-8">
            {/* <!-- Steps--> */}
            <div className="steps steps-light pt-2 pb-3 mb-5">
              <a className="step-item active" href="shop-cart.html">
                <div className="step-progress">
                  <span className="step-count">1</span>
                </div>
                <div className="step-label">
                  <i className="ci-cart"></i>Cart
                </div>
              </a>
              <a className="step-item active" href="checkout-details.html">
                <div className="step-progress">
                  <span className="step-count">2</span>
                </div>
                <div className="step-label">
                  <i className="ci-user-circle"></i>Details
                </div>
              </a>

              <a className="step-item active" href="checkout-payment.html">
                <div className="step-progress">
                  <span className="step-count">3</span>
                </div>
                <div className="step-label">
                  <i className="ci-card"></i>Payment
                </div>
              </a>
              <a
                className="step-item active current"
                href="checkout-review.html"
              >
                <div className="step-progress">
                  <span className="step-count">4</span>
                </div>
                <div className="step-label">
                  <i className="ci-check-circle">Confirmation</i>
                </div>
              </a>
            </div>
          </section>
          <div className="container pb-5 mb-sm-4">
            <div className="pt-5">
              <div className="card py-3 mt-sm-3">
                <div className="card-body text-center">
                  <h2 className="h4 pb-3">Thank you for your order!</h2>
                  <p className="fs-sm mb-2">
                    Your order has been placed and will be processed as soon as
                    possible.
                  </p>
                  <p className="fs-sm mb-2">
                    Make sure you make note of your order number, which is{" "}
                    <span className="fw-medium">34VB5540K83.</span>
                  </p>
                  <p className="fs-sm">
                    You will be receiving an sms shortly with confirmation of
                    your order. <u>You can now:</u>
                  </p>
                  <Link href="/">
                  <a
                    className="btn btn-secondary mt-3 me-3"
                    href="shop-grid-ls.html"
                    >
                    Go back shopping
                  </a>
                      </Link>
                  <a
                    className="btn btn-primary mt-3"
                    href="order-tracking.html"
                  >
                    <i className="ci-location"></i>&nbsp;Track order
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CheckoutComplete;
