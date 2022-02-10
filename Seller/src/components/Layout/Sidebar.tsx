import React from "react";
import Link from "next/link";
const Sidebar = () => {
  return (
    <React.Fragment>
      <aside className="navbar-aside" id="offcanvas_aside">
        <div className="aside-top">
            <Link href="/">
          <a href="#" className="brand-wrap">
            <img
              src="/images/logo.svg"
              height="46"
              className="logo"
              alt="Ecommerce dashboard template"
              />
          </a>
              </Link>
          <div>
            <button className="btn btn-icon btn-aside-minimize" onClick={()=>console.log("Clicked")}>
              {" "}
              <i className="text-muted material-icons md-menu_open"></i>
            </button>
          </div>
        </div>
        {/* <!-- aside-top.// --> */}

        <nav>
          <ul className="menu-aside">
            <li className="menu-item active">
              <Link href="/">
                <a className="menu-link" href="#">
                  {" "}
                  <i className="icon material-icons md-home"></i>
                  <span className="text">Dashboard</span>
                </a>
              </Link>
            </li>
            <li className="menu-item has-submenu">
              <a className="menu-link" href="page-products-list.html">
                {" "}
                <i className="icon material-icons md-shopping_bag"></i>
                <span className="text">Products</span>
              </a>
              <div className="submenu">
                <a href="page-products-list.html">Product list view</a>
                <a href="page-products-table.html">Product table view</a>
                <a href="page-products-grid.html">Product grid</a>
                <a href="page-products-grid-2.html">Product grid 2</a>
                <a href="page-categories.html">Categories</a>
              </div>
            </li>
            <li className="menu-item has-submenu">
              <a className="menu-link" href="page-orders-1.html">
                {" "}
                <i className="icon material-icons md-shopping_cart"></i>
                <span className="text">Orders</span>
              </a>
              <div className="submenu">
                <a href="page-orders-1.html">Order list 1</a>
                <a href="page-orders-2.html">Order list 2</a>
                <a href="page-orders-detail.html">Order detail</a>
              </div>
            </li>
            <li className="menu-item has-submenu">
              <a className="menu-link" href="page-sellers-cards.html">
                {" "}
                <i className="icon material-icons md-store"></i>
                <span className="text">Sellers</span>
              </a>
              <div className="submenu">
                <a href="page-sellers-cards.html">Sellers cards</a>
                <a href="page-sellers-list.html">Sellers list</a>
                <a href="page-seller-detail.html">Seller profile</a>
              </div>
            </li>
            <li className="menu-item has-submenu">
              <a className="menu-link" href="page-form-product-1.html">
                {" "}
                <i className="icon material-icons md-add_box"></i>
                <span className="text">Add product</span>
              </a>
              <div className="submenu">
                <a href="page-form-product-1.html">Add product 1</a>
                <a href="page-form-product-2.html">Add product 2</a>
                <a href="page-form-product-3.html">Add product 3</a>
                <a href="page-form-product-4.html">Add product 4</a>
              </div>
            </li>
            <li className="menu-item has-submenu">
              <a className="menu-link" href="page-transactions-A.html">
                {" "}
                <i className="icon material-icons md-monetization_on"></i>
                <span className="text">Transactions</span>
              </a>
              <div className="submenu">
                <a href="page-transactions-A.html">Transaction 1</a>
                <a href="page-transactions-B.html">Transaction 2</a>
              </div>
            </li>
            <li className="menu-item has-submenu">
              <a className="menu-link" href="#">
                {" "}
                <i className="icon material-icons md-person"></i>
                <span className="text">Account</span>
              </a>
              <div className="submenu">
                <a href="page-account-login.html">User login</a>
                <a href="page-account-register.html">User registration</a>
                <a href="page-error-404.html">Error 404</a>
              </div>
            </li>
            <li className="menu-item">
              <a className="menu-link" href="page-reviews.html">
                {" "}
                <i className="icon material-icons md-comment"></i>
                <span className="text">Reviews</span>
              </a>
            </li>
            <li className="menu-item">
              <a className="menu-link" href="page-brands.html">
                {" "}
                <i className="icon material-icons md-stars"></i>
                <span className="text">Brands</span>{" "}
              </a>
            </li>
            <li className="menu-item">
              <a className="menu-link" href="#">
                {" "}
                <i className="icon material-icons md-pie_chart"></i>
                <span className="text">Statistics</span>
              </a>
            </li>
          </ul>
          <hr />
          <ul className="menu-aside">
            <li className="menu-item has-submenu">
              <a className="menu-link" href="#">
                {" "}
                <i className="icon material-icons md-settings"></i>
                <span className="text">Settings</span>
              </a>
              <div className="submenu">
                <a href="page-settings-1.html">Setting sample 1</a>
                <a href="page-settings-2.html">Setting sample 2</a>
              </div>
            </li>
            <li className="menu-item">
              <a className="menu-link" href="page-0-blank.html">
                {" "}
                <i className="icon material-icons md-local_offer"></i>
                <span className="text"> Starter page </span>
              </a>
            </li>
          </ul>
          <br />
          <br />
        </nav>
      </aside>
      {/* ----Header---- */}
      <header className="main-header navbar">
        <div className="col-search">
          <form className="searchform">
            <div className="input-group">
              <input
                list="search_terms"
                type="text"
                className="form-control"
                placeholder="Search term"
              />
              <button className="btn btn-light bg" type="button">
                {" "}
                <i className="material-icons md-search"></i>
              </button>
            </div>
            <datalist id="search_terms">
              <option value="Products" />
              <option value="New orders" />
              <option value="Apple iphone" />
              <option value="Ahmed Hassan" />
            </datalist>
          </form>
        </div>
        <div className="col-nav">
          <button
            className="btn btn-icon btn-mobile me-auto"
            data-trigger="#offcanvas_aside"
          >
            {" "}
            <i className="md-28 material-icons md-menu"></i>{" "}
          </button>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link btn-icon" title="Dark mode" href="#">
                {" "}
                <i className="material-icons md-nights_stay"></i>{" "}
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link btn-icon" href="#">
                {" "}
                <i className="material-icons md-notifications_active"></i>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                {" "}
                English{" "}
              </a>
            </li>
            <li className="dropdown nav-item">
              <a className="dropdown-toggle" data-bs-toggle="dropdown" href="#">
                {" "}
                <img
                  className="img-xs rounded-circle"
                  src="images/people/avatar1.jpg"
                  alt="User"
                />
              </a>
              <div className="dropdown-menu dropdown-menu-end">
                <a className="dropdown-item" href="#">
                  My profile
                </a>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
                <a className="dropdown-item text-danger" href="#">
                  Exit
                </a>
              </div>
            </li>
          </ul>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Sidebar;
