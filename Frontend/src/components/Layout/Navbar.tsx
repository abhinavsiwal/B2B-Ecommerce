import Link from "next/link";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { getTotal, removeFromCart } from "../../store/Reducers/cart";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { cartItems, cartTotalQuantity, cartTotalAmount } = useAppSelector(
    (state) => state.cartReducer
  );

  const { isLoggedIn,token, userDetails } = useAppSelector(
    (state) => state.userReducer
  );

  useEffect(() => {
    dispatch(getTotal());
  }, [dispatch, cartItems]);

  const removeItemFromCart = (product: any) => {
    dispatch(removeFromCart(product));
  };

  return (
    <React.Fragment>
      <header className="shadow-sm">
        {/* <!-- Topbar--> */}
        <div className="topbar topbar-dark bg-dark">
          <div className="container">
            <div className="topbar-text dropdown d-md-none">
              <a
                className="topbar-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
              >
                Useful links
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="tel:00331697720">
                    <i className="ci-support text-muted me-2"></i>(00) 33 169
                    7720
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="order-tracking.html">
                    <i className="ci-location text-muted me-2"></i>Order
                    tracking
                  </a>
                </li>
              </ul>
            </div>
            <div className="topbar-text text-nowrap d-none d-md-inline-block">
              <i className="ci-support"></i>
              <span className="text-muted me-1">Support</span>
              <a className="topbar-link" href="tel:00331697720">
                (00) 33 169 7720
              </a>
            </div>
            <div className="tns-carousel tns-controls-static d-none d-md-block">
              <div
                className="tns-carousel-inner"
                data-carousel-options='{"mode": "gallery", "nav": false}'
              >
                <div className="topbar-text">
                  Free shipping for order over $200
                </div>
                <div className="topbar-text">
                  We return money within 30 days
                </div>
                <div className="topbar-text">
                  Friendly 24/7 customer support
                </div>
              </div>
            </div>
            <div className="ms-3 text-nowrap">
              <a
                className="topbar-link me-4 d-none d-md-inline-block"
                href="order-tracking.html"
              >
                <i className="ci-location"></i>Order tracking
              </a>
            </div>
          </div>
        </div>
        {/* <!-- Remove "navbar-sticky" className to make navigation bar scrollable with the page.--> */}
        <div className="navbar-sticky bg-light">
          <div className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <Link href="/">
                <a
                  className="navbar-brand d-none d-sm-block flex-shrink-0"
                  href="#"
                >
                  <img
                    src="/img/logo.jpg"
                    width="142"
                    alt="Cartzilla"
                    className="navbarLogo"
                  />
                </a>
              </Link>
              <Link href="/">
                <a
                  className="navbar-brand d-sm-none flex-shrink-0 me-2"
                  href="#"
                >
                  <img src="/img/logo.jpg" width="74" alt="Cartzilla" />
                </a>
              </Link>
              <div className="input-group d-none d-lg-flex mx-4">
                <input
                  className="form-control rounded-end pe-5"
                  type="text"
                  placeholder="Search for products"
                />
                <i className="ci-search position-absolute top-50 end-0 translate-middle-y text-muted fs-base me-3"></i>
              </div>
              <div className="navbar-toolbar d-flex flex-shrink-0 align-items-center">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarCollapse"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-tool navbar-stuck-toggler" href="#">
                  <span className="navbar-tool-tooltip">Expand menu</span>
                </a>
                {token ? (
                  <Link href="/user">
                    <a
                      className="navbar-tool ms-1 ms-lg-0 me-n1 me-lg-2"
                      href="#"
                    >
                      <div className="navbar-tool-icon-box">
                        <i className="navbar-tool-icon ci-user"></i>
                      </div>
                      <div className="navbar-tool-text ms-n3">
                        <small>Hello, {userDetails.name}</small>My Account
                      </div>
                    </a>
                  </Link>
                ) : (
                  <Link href="/login">
                    <a
                      className="navbar-tool ms-1 ms-lg-0 me-n1 me-lg-2"
                      href="#"
                    >
                      <div className="navbar-tool-icon-box">
                        <i className="navbar-tool-icon ci-user"></i>
                      </div>
                      <div className="navbar-tool-text ms-n3">
                        <small>Hello, Sign in</small>My Account
                      </div>
                    </a>
                  </Link>
                )}

                <div className="navbar-tool dropdown ms-3">
                  <Link href="/cart">
                    <a
                      className="navbar-tool-icon-box bg-secondary dropdown-toggle"
                      href="#"
                    >
                      <span className="navbar-tool-label">
                        {cartTotalQuantity}
                      </span>
                      <i className="navbar-tool-icon ci-cart"></i>
                    </a>
                  </Link>
                  <Link href="/cart">
                    <a className="navbar-tool-text" href="shop-cart.html">
                      <small>My Cart</small>₹{cartTotalAmount}
                    </a>
                  </Link>
                  {/* <!-- Cart dropdown--> */}
                  <div className="dropdown-menu dropdown-menu-end">
                    <div
                      className="widget widget-cart px-3 pt-2 pb-3"
                      style={{ width: "20rem" }}
                    >
                      <div
                        style={{ height: "15rem" }}
                        data-simplebar
                        data-simplebar-auto-hide="false"
                      >
                        {cartItems &&
                          cartItems.map((cartItem: any) => {
                            return (
                              <div
                                className="widget-cart-item pb-2 border-bottom"
                                key={cartItem.id}
                              >
                                <button
                                  className="btn-close text-danger"
                                  type="button"
                                  aria-label="Remove"
                                  onClick={() => removeItemFromCart(cartItem)}
                                >
                                  <span aria-hidden="true">&times;</span>
                                </button>
                                <div className="d-flex align-items-center">
                                  <a
                                    className="flex-shrink-0"
                                    href="shop-single-v1.html"
                                  >
                                    <img
                                      src={cartItem.image}
                                      width="64"
                                      alt="Product"
                                    />
                                  </a>
                                  <div className="ps-2">
                                    <h6 className="widget-product-title">
                                      <a href="shop-single-v1.html">
                                        {cartItem.name}
                                      </a>
                                    </h6>
                                    <div className="widget-product-meta">
                                      <span className="text-accent me-2">
                                        ₹{cartItem.price}
                                      </span>
                                      <span className="text-muted">
                                        x {cartItem.quantity}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      <div className="d-flex flex-wrap justify-content-between align-items-center py-3">
                        <div className="fs-sm me-2 py-2">
                          <span className="text-muted">Subtotal:</span>
                          <span className="text-accent fs-base ms-1">
                            ₹{cartTotalAmount}
                          </span>
                        </div>
                        <Link href="/cart">
                          <a
                            className="btn btn-outline-secondary btn-sm"
                            href="shop-cart.html"
                          >
                            Expand cart
                            <i className="ci-arrow-right ms-1 me-n1"></i>
                          </a>
                        </Link>
                      </div>
                      <Link href="/checkoutDetails">
                        <a
                          className="btn btn-primary btn-sm d-block w-100"
                          href="checkout-details.html"
                        >
                          <i className="ci-card me-2 fs-base align-middle"></i>
                          Checkout
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="navbar navbar-expand-lg navbar-light navbar-stuck-menu mt-n2 pt-0 pb-2">
            <div className="container">
              <div className="collapse navbar-collapse" id="navbarCollapse">
                {/* <!-- Search--> */}
                <div className="input-group d-lg-none my-3">
                  <i className="ci-search position-absolute top-50 start-0 translate-middle-y text-muted fs-base ms-3"></i>
                  <input
                    className="form-control rounded-start"
                    type="text"
                    placeholder="Search for products"
                  />
                </div>
                {/* <!-- Departments menu--> */}

                {/* <!-- Primary menu--> */}
              </div>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Navbar;
