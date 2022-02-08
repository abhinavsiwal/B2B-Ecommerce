import React from "react";

const Navbar = () => {
  return (
    <React.Fragment>
      <header className="bg-light shadow-sm navbar-sticky">
        <div className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <a
              className="navbar-brand d-none d-sm-block me-4 order-lg-1"
              href="index-2.html"
            >
              <img src="img/logo-dark.png" width="142" alt="Cartzilla" />
            </a>
            <a
              className="navbar-brand d-sm-none me-2 order-lg-1"
              href="index-2.html"
            >
              <img src="img/logo-icon.png" width="74" alt="Cartzilla" />
            </a>
            <div className="navbar-toolbar d-flex align-items-center order-lg-3">
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <a
                className="btn btn-primary btn-shadow"
                href="https://themes.getbootstrap.com/product/cartzilla-bootstrap-e-commerce-template-ui-kit/"
                target="_blank"
                rel="noopener"
              >
                <i className="ci-cart me-2"></i>Buy now
              </a>
            </div>
            <div
              className="collapse navbar-collapse me-auto order-lg-2"
              id="navbarCollapse"
            >
              <hr className="my-3" />
              {/* <!-- Primary menu--> */}
              <ul className="navbar-nav">
                <li className="nav-item dropdown active">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    Home
                  </a>
                  <ul className="dropdown-menu">
                    <li className="dropdown position-static mb-0">
                      <a
                        className="dropdown-item border-bottom py-2"
                        href="home-nft.html"
                      >
                        <span className="d-block text-heading">
                          NFT Marketplace
                          <span className="badge bg-danger ms-1">NEW</span>
                        </span>
                        <small className="d-block text-muted">
                          NFTs, Multi-vendor, Auctions
                        </small>
                      </a>
                      <div className="dropdown-menu h-100 animation-none mt-0 p-3">
                        <a
                          className="d-block"
                          href="home-nft.html"
                          style={{ width: "250px" }}
                        >
                          <img
                            src="img/home/preview/th08.jpg"
                            alt="NFT Marketplace"
                          />
                        </a>
                      </div>
                    </li>
                    <li className="dropdown position-static mb-0">
                      <a
                        className="dropdown-item py-2 border-bottom"
                        href="home-fashion-store-v1.html"
                      >
                        <span className="d-block text-heading">
                          Fashion Store v.1
                        </span>
                        <small className="d-block text-muted">
                          classNameic shop layout
                        </small>
                      </a>
                      <div className="dropdown-menu h-100 animation-none mt-0 p-3">
                        <a
                          className="d-block"
                          href="home-fashion-store-v1.html"
                          style={{ width: "250px" }}
                        >
                          <img
                            src="img/home/preview/th01.jpg"
                            alt="Fashion Store v.1"
                          />
                        </a>
                      </div>
                    </li>
                    <li className="dropdown position-static mb-0">
                      <a
                        className="dropdown-item py-2 border-bottom"
                        href="home-electronics-store.html"
                      >
                        <span className="d-block text-heading">
                          Electronics Store
                        </span>
                        <small className="d-block text-muted">
                          Slider + Promo banners
                        </small>
                      </a>
                      <div className="dropdown-menu h-100 animation-none mt-0 p-3">
                        <a
                          className="d-block"
                          href="home-electronics-store.html"
                          style={{ width: "250px" }}
                        >
                          <img
                            src="img/home/preview/th03.jpg"
                            alt="Electronics Store"
                          />
                        </a>
                      </div>
                    </li>
                    <li className="dropdown position-static mb-0">
                      <a
                        className="dropdown-item py-2 border-bottom"
                        href="home-marketplace.html"
                      >
                        <span className="d-block text-heading">
                          Marketplace
                        </span>
                        <small className="d-block text-muted">
                          Multi-vendor, digital goods
                        </small>
                      </a>
                      <div className="dropdown-menu h-100 animation-none mt-0 p-3">
                        <a
                          className="d-block"
                          href="home-marketplace.html"
                          style={{ width: "250px" }}
                        >
                          <img
                            src="img/home/preview/th04.jpg"
                            alt="Marketplace"
                          />
                        </a>
                      </div>
                    </li>
                    <li className="dropdown position-static mb-0">
                      <a
                        className="dropdown-item py-2 border-bottom"
                        href="home-grocery-store.html"
                      >
                        <span className="d-block text-heading">
                          Grocery Store
                        </span>
                        <small className="d-block text-muted">
                          Full width + Side menu
                        </small>
                      </a>
                      <div className="dropdown-menu h-100 animation-none mt-0 p-3">
                        <a
                          className="d-block"
                          href="home-grocery-store.html"
                          style={{ width: "250px" }}
                        >
                          <img
                            src="img/home/preview/th06.jpg"
                            alt="Grocery Store"
                          />
                        </a>
                      </div>
                    </li>
                    <li className="dropdown position-static mb-0">
                      <a
                        className="dropdown-item py-2 border-bottom"
                        href="home-food-delivery.html"
                      >
                        <span className="d-block text-heading">
                          Food Delivery Service
                        </span>
                        <small className="d-block text-muted">
                          Food &amp; Beverages delivery
                        </small>
                      </a>
                      <div className="dropdown-menu h-100 animation-none mt-0 p-3">
                        <a
                          className="d-block"
                          href="home-food-delivery.html"
                          style={{ width: "250px" }}
                        >
                          <img
                            src="img/home/preview/th07.jpg"
                            alt="Food Delivery Service"
                          />
                        </a>
                      </div>
                    </li>
                    <li className="dropdown position-static mb-0">
                      <a
                        className="dropdown-item py-2 border-bottom"
                        href="home-fashion-store-v2.html"
                      >
                        <span className="d-block text-heading">
                          Fashion Store v.2
                        </span>
                        <small className="d-block text-muted">
                          Slider + Featured categories
                        </small>
                      </a>
                      <div className="dropdown-menu h-100 animation-none mt-0 p-3">
                        <a
                          className="d-block"
                          href="home-fashion-store-v2.html"
                          style={{ width: "250px" }}
                        >
                          <img
                            src="img/home/preview/th02.jpg"
                            alt="Fashion Store v.2"
                          />
                        </a>
                      </div>
                    </li>
                    <li className="dropdown position-static mb-0">
                      <a
                        className="dropdown-item py-2"
                        href="home-single-store.html"
                      >
                        <span className="d-block text-heading">
                          Single Product Store
                        </span>
                        <small className="d-block text-muted">
                          Single product / mono brand
                        </small>
                      </a>
                      <div className="dropdown-menu h-100 animation-none mt-0 p-3">
                        <a
                          className="d-block"
                          href="home-single-store.html"
                          style={{ width: "250px" }}
                        >
                          <img
                            src="img/home/preview/th05.jpg"
                            alt="Single Product / Brand Store"
                          />
                        </a>
                      </div>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    Shop
                  </a>
                  <div className="dropdown-menu p-0">
                    <div className="d-flex flex-wrap flex-sm-nowrap px-2">
                      <div className="mega-dropdown-column pt-1 pt-lg-4 pb-4 px-2 px-lg-3">
                        <div className="widget widget-links mb-4">
                          <h6 className="fs-base mb-3">Shop layouts</h6>
                          <ul className="widget-list">
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="shop-grid-ls.html"
                              >
                                Shop Grid - Left Sidebar
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="shop-grid-rs.html"
                              >
                                Shop Grid - Right Sidebar
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="shop-grid-ft.html"
                              >
                                Shop Grid - Filters on Top
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="shop-list-ls.html"
                              >
                                Shop List - Left Sidebar
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="shop-list-rs.html"
                              >
                                Shop List - Right Sidebar
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="shop-list-ft.html"
                              >
                                Shop List - Filters on Top
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="widget widget-links mb-4">
                          <h6 className="fs-base mb-3">Marketplace</h6>
                          <ul className="widget-list">
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="marketplace-category.html"
                              >
                                Category Page
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="marketplace-single.html"
                              >
                                Single Item Page
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="marketplace-vendor.html"
                              >
                                Vendor Page
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="marketplace-cart.html"
                              >
                                Cart
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="marketplace-checkout.html"
                              >
                                Checkout
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="widget widget-links">
                          <h6 className="fs-base mb-3">Grocery store</h6>
                          <ul className="widget-list">
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="grocery-catalog.html"
                              >
                                Product Catalog
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="grocery-single.html"
                              >
                                Single Product Page
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="grocery-checkout.html"
                              >
                                Checkout
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="mega-dropdown-column pt-1 pt-lg-4 pb-4 px-2 px-lg-3">
                        <div className="widget widget-links mb-4">
                          <h6 className="fs-base mb-3">Food Delivery</h6>
                          <ul className="widget-list">
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="food-delivery-category.html"
                              >
                                Category Page
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="food-delivery-single.html"
                              >
                                Single Item (Restaurant)
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="food-delivery-cart.html"
                              >
                                Cart (Your Order)
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="food-delivery-checkout.html"
                              >
                                Checkout (Address &amp; Payment)
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="widget widget-links">
                          <h6 className="fs-base mb-3">
                            NFT Marketplace
                            <span className="badge bg-danger ms-1">NEW</span>
                          </h6>
                          <ul className="widget-list">
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="nft-catalog-v1.html"
                              >
                                Catalog v.1
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="nft-catalog-v2.html"
                              >
                                Catalog v.2
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="nft-single-auction-live.html"
                              >
                                Single Item - Auction Live
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="nft-single-auction-ended.html"
                              >
                                Single Item - Auction Ended
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="nft-single-buy.html"
                              >
                                Single Item - Buy Now
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="nft-vendor.html"
                              >
                                Vendor Page
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="nft-connect-wallet.html"
                              >
                                Connect Wallet
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="nft-create-item.html"
                              >
                                Create New Item
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="mega-dropdown-column pt-1 pt-lg-4 px-2 px-lg-3">
                        <div className="widget widget-links mb-4">
                          <h6 className="fs-base mb-3">Shop pages</h6>
                          <ul className="widget-list">
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="shop-categories.html"
                              >
                                Shop Categories
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="shop-single-v1.html"
                              >
                                Product Page v.1
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="shop-single-v2.html"
                              >
                                Product Page v.2
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="shop-cart.html"
                              >
                                Cart
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="checkout-details.html"
                              >
                                Checkout - Details
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="checkout-shipping.html"
                              >
                                Checkout - Shipping
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="checkout-payment.html"
                              >
                                Checkout - Payment
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="checkout-review.html"
                              >
                                Checkout - Review
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="checkout-complete.html"
                              >
                                Checkout - Complete
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="order-tracking.html"
                              >
                                Order Tracking
                              </a>
                            </li>
                            <li className="widget-list-item">
                              <a
                                className="widget-list-link"
                                href="comparison.html"
                              >
                                Product Comparison
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    Account
                  </a>
                  <ul className="dropdown-menu">
                    <li className="dropdown">
                      <a
                        className="dropdown-item dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        Shop User Account
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="account-orders.html"
                          >
                            Orders History
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="account-profile.html"
                          >
                            Profile Settings
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="account-address.html"
                          >
                            Account Addresses
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="account-payment.html"
                          >
                            Payment Methods
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="account-wishlist.html"
                          >
                            Wishlist
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="account-tickets.html"
                          >
                            My Tickets
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="account-single-ticket.html"
                          >
                            Single Ticket
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a
                        className="dropdown-item dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        Vendor Dashboard
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="dashboard-settings.html"
                          >
                            Settings
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="dashboard-purchases.html"
                          >
                            Purchases
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="dashboard-favorites.html"
                          >
                            Favorites
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="dashboard-sales.html"
                          >
                            Sales
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="dashboard-products.html"
                          >
                            Products
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="dashboard-add-new-product.html"
                          >
                            Add New Product
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="dashboard-payouts.html"
                          >
                            Payouts
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a
                        className="dropdown-item dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        NFT Marketplace
                        <span className="badge bg-danger ms-1">NEW</span>
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="nft-account-settings.html"
                          >
                            Profile Settings
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="nft-account-payouts.html"
                          >
                            Wallet &amp; Payouts
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="nft-account-my-items.html"
                          >
                            My Items
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="nft-account-my-collections.html"
                          >
                            My Collections
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="nft-account-favorites.html"
                          >
                            Favorites
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="nft-account-notifications.html"
                          >
                            Notifications
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a className="dropdown-item" href="account-signin.html">
                        Sign In / Sign Up
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="account-password-recovery.html"
                      >
                        Password Recovery
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    Pages
                  </a>
                  <ul className="dropdown-menu">
                    <li className="dropdown">
                      <a
                        className="dropdown-item dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        Navbar Variants
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="navbar-1-level-light.html"
                          >
                            1 Level Light
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="navbar-1-level-dark.html"
                          >
                            1 Level Dark
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="navbar-2-level-light.html"
                          >
                            2 Level Light
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="navbar-2-level-dark.html"
                          >
                            2 Level Dark
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="navbar-3-level-light.html"
                          >
                            3 Level Light
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="navbar-3-level-dark.html"
                          >
                            3 Level Dark
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="home-electronics-store.html"
                          >
                            Electronics Store
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="home-marketplace.html"
                          >
                            Marketplace
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="home-grocery-store.html"
                          >
                            Side Menu (Grocery)
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown-divider"></li>
                    <li>
                      <a className="dropdown-item" href="about.html">
                        About Us
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="contacts.html">
                        Contacts
                      </a>
                    </li>
                    <li className="dropdown">
                      <a
                        className="dropdown-item dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        Help Center
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="help-topics.html">
                            Help Topics
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="help-single-topic.html"
                          >
                            Single Topic
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="help-submit-request.html"
                          >
                            Submit a Request
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a
                        className="dropdown-item dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        404 Not Found
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="404-simple.html">
                            404 - Simple Text
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item"
                            href="404-illustration.html"
                          >
                            404 - Illustration
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown-divider"></li>
                    <li>
                      <a className="dropdown-item" href="sticky-footer.html">
                        Sticky Footer Demo
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                  >
                    Blog
                  </a>
                  <ul className="dropdown-menu">
                    <li className="dropdown">
                      <a
                        className="dropdown-item dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        Blog List Layouts
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="blog-list-sidebar.html"
                          >
                            List with Sidebar
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="blog-list.html">
                            List no Sidebar
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a
                        className="dropdown-item dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        Blog Grid Layouts
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="blog-grid-sidebar.html"
                          >
                            Grid with Sidebar
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="blog-grid.html">
                            Grid no Sidebar
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="dropdown">
                      <a
                        className="dropdown-item dropdown-toggle"
                        href="#"
                        data-bs-toggle="dropdown"
                      >
                        Single Post Layouts
                      </a>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            className="dropdown-item"
                            href="blog-single-sidebar.html"
                          >
                            Article with Sidebar
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="blog-single.html">
                            Article no Sidebar
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    Docs / Components
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="docs/dev-setup.html">
                        <div className="d-flex">
                          <div className="lead text-muted pt-1">
                            <i className="ci-book"></i>
                          </div>
                          <div className="ms-2">
                            <span className="d-block text-heading">
                              Documentation
                            </span>
                            <small className="d-block text-muted">
                              Kick-start customization
                            </small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="dropdown-divider"></li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="components/typography.html"
                      >
                        <div className="d-flex">
                          <div className="lead text-muted pt-1">
                            <i className="ci-server"></i>
                          </div>
                          <div className="ms-2">
                            <span className="d-block text-heading">
                              Components
                              <span className="badge bg-info ms-2">40+</span>
                            </span>
                            <small className="d-block text-muted">
                              Faster page building
                            </small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="dropdown-divider"></li>
                    <li>
                      <a className="dropdown-item" href="docs/changelog.html">
                        <div className="d-flex">
                          <div className="lead text-muted pt-1">
                            <i className="ci-edit"></i>
                          </div>
                          <div className="ms-2">
                            <span className="d-block text-heading">
                              Changelog
                              <span className="badge bg-success ms-2">
                                v2.4.0
                              </span>
                            </span>
                            <small className="d-block text-muted">
                              Regular updates
                            </small>
                          </div>
                        </div>
                      </a>
                    </li>
                    <li className="dropdown-divider"></li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="mailto:support@createx.studio"
                      >
                        <div className="d-flex">
                          <div className="lead text-muted pt-1">
                            <i className="ci-help"></i>
                          </div>
                          <div className="ms-2">
                            <span className="d-block text-heading">
                              Support
                            </span>
                            <small className="d-block text-muted">
                              support@createx.studio
                            </small>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Navbar;
