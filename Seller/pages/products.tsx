import React from "react";

const Products = () => {
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Products list </h2>
        <div>
          <a href="#" className="btn btn-primary">
            <i className="material-icons md-plus"></i> Create new
          </a>
        </div>
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row align-items-center">
            <div className="col col-check flex-grow-0">
              <div className="form-check ms-2">
                <input className="form-check-input" type="checkbox" value="" />
              </div>
            </div>
            <div className="col-md-3 col-12 me-auto mb-md-0 mb-3">
              <select className="form-select">
                <option>All category</option>
                <option>Electronics</option>
                <option>Clothes</option>
                <option>Automobile</option>
              </select>
            </div>
            <div className="col-md-2 col-6">
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-2 col-6">
              <select className="form-select">
                <option>Status</option>
                <option>Active</option>
                <option>Disabled</option>
                <option>Show all</option>
              </select>
            </div>
          </div>
        </header>
        {/* <!-- card-header end// --> */}

        <div className="card-body">
          <article className="itemlist">
            <div className="row align-items-center">
              <div className="col col-check flex-grow-0">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>
              <div className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
                <a className="itemside" href="#">
                  <div className="left">
                    <img
                      src="images/items/1.jpg"
                      className="img-sm img-thumbnail"
                      alt="Item"
                    />
                  </div>
                  <div className="info">
                    <h6 className="mb-0">T-shirt for men medium size</h6>
                  </div>
                </a>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-price">
                {" "}
                <span>$34.50</span>{" "}
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-status">
                <span className="badge rounded-pill alert-success">Active</span>
              </div>
              <div className="col-lg-2 col-sm-2 col-4 col-date">
                <span>04.12.2020</span>
              </div>
              <div className="col-lg-1 col-sm-2 col-4 col-action">
                <div className="dropdown float-end">
                  <a
                    href="#"
                    data-bs-toggle="dropdown"
                    className="btn btn-light"
                  >
                    {" "}
                    <i className="material-icons md-more_horiz"></i>{" "}
                  </a>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">
                      View detail
                    </a>
                    <a className="dropdown-item" href="#">
                      Edit info
                    </a>
                    <a className="dropdown-item text-danger" href="#">
                      Delete
                    </a>
                  </div>
                </div>

                {/* <!-- dropdown // --> */}
              </div>
            </div>
            {/* <!-- row .// --> */}
          </article>
          {/* <!-- itemlist  .// --> */}

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* <!-- card-body end// --> */}
      </div>

      {/* <!-- card end// --> */}
    </section>
  );
};

export default Products;
