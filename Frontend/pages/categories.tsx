import Link from "next/link";
import React from "react";
import categories from "../src/utils/categories";
const Categories = () => {
 

  return (
    <React.Fragment>
      <div className="bg-secondary py-4">
        <div className="container d-lg-flex justify-content-between py-2 py-lg-3">
          <div className="order-lg-2 mb-3 mb-lg-0 pt-lg-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb flex-lg-nowrap justify-content-center justify-content-lg-start">
                <li className="breadcrumb-item">
                  <a className="text-nowrap" href="index-2.html">
                    <i className="ci-home"></i>Home
                  </a>
                </li>
                <li className="breadcrumb-item text-nowrap">
                  <a href="#">Shop</a>
                </li>
                <li
                  className="breadcrumb-item text-nowrap active"
                  aria-current="page"
                >
                  Categories
                </li>
              </ol>
            </nav>
          </div>
          <div className="order-lg-1 pe-lg-4 text-center text-lg-start">
            <h1 className="h3 mb-0">Shop categories</h1>
          </div>
        </div>
      </div>
      <div className="container pb-4 pb-sm-5">
        <h2 className="h3 text-center py-4 mt-md-3">Categories</h2>

        {/* <!-- Categories grid--> */}
        <div className="row pt-5">
          {/* <!-- Catogory--> */}
          {categories.map((category: any) => {
            return (
              <div className="col-md-4 col-sm-6 mb-3" key={category.name}>
                <div className="card border-0">
                    <Link href={`/category/${category.name}`}>
                  <a className="d-block overflow-hidden rounded-3" href="#">
                    <img
                      className="d-block w-100"
                      src={category.image}
                      alt={category.name}
                      style={{ maxHeight: "300px" }}
                      />
                  </a>
                      </Link>
                  <div className="card-body">
                    <h2 className="h5">{category.name}</h2>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Categories;
