import React from "react";

const AdminDashboard = () => {
  return (
    <React.Fragment>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title"> Dashboard </h2>
          <div>
            <a href="#" className="btn btn-primary">
              Create report
            </a>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="card card-body mb-4">
              <article className="icontext">
                <span className="icon icon-sm rounded-circle bg-primary-light">
                  <i className="text-primary material-icons md-monetization_on"></i>
                </span>
                <div className="text">
                  <h6 className="mb-1">Total Sales</h6>{" "}
                  <span>$19,626,058.20</span>
                </div>
              </article>
            </div>
            {/* <!-- card  end// --> */}
          </div>
          {/* <!-- col end// --> */}
          <div className="col-lg-4">
            <div className="card card-body mb-4">
              <article className="icontext">
                <span className="icon icon-sm rounded-circle bg-success-light">
                  <i className="text-success material-icons md-local_shipping"></i>
                </span>
                <div className="text">
                  <h6 className="mb-1">Total Orders</h6> <span>87790</span>
                </div>
              </article>
            </div>
            {/* <!-- card end// --> */}
          </div>
          {/* <!-- col end// --> */}
          <div className="col-lg-4">
            <div className="card card-body mb-4">
              <article className="icontext">
                <span className="icon icon-sm rounded-circle bg-warning-light">
                  <i className="text-warning material-icons md-shopping_basket"></i>
                </span>
                <div className="text">
                  <h6 className="mb-1">Total Products</h6> <span>5678</span>
                </div>
              </article>
            </div>
            {/* <!--  end// --> */}
          </div>
          {/* <!-- col end// --> */}
        </div>
        {/* <!-- row end// --> */}
        {/* Chart and all here */}

        {/* <!-- row end// --> */}

        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Latest orders</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <tr>
                  <td>2323</td>
                  <td>
                    <b>Devon Lane</b>
                  </td>
                  <td>devon@example.com</td>
                  <td>$778.35</td>
                  <td>
                    <span className="badge rounded-pill alert-success">
                      Delivered
                    </span>
                  </td>
                  <td>07.05.2020</td>
                  <td className="text-end">
                    <a href="#" className="btn btn-light">
                      Detail
                    </a>
                    <div className="dropdown">
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
                    {/* <!-- dropdown //end --> */}
                  </td>
                </tr>
                <tr>
                  <td>2323</td>
                  <td>
                    <b>Darrell Steward</b>
                  </td>
                  <td>stew123@mysite.com</td>
                  <td>$980.90</td>
                  <td>
                    <span className="badge rounded-pill alert-warning">
                      Pending
                    </span>
                  </td>
                  <td>12.02.2020</td>
                  <td className="text-end">
                    <a href="#" className="btn btn-light">
                      Detail
                    </a>
                    <div className="dropdown">
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
                    {/* <!-- dropdown //end --> */}
                  </td>
                </tr>
                <tr>
                  <td>9053</td>
                  <td>
                    <b>Mike Jonatan</b>
                  </td>
                  <td>mike@somename.com</td>
                  <td>$778.35</td>
                  <td>
                    <span className="badge rounded-pill alert-warning">
                      Pending
                    </span>
                  </td>
                  <td>07.05.2020</td>
                  <td className="text-end">
                    <a href="#" className="btn btn-light">
                      Detail
                    </a>
                    <div className="dropdown">
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
                    {/* <!-- dropdown //end --> */}
                  </td>
                </tr>
                <tr>
                  <td>1234</td>
                  <td>
                    <b>Ahmed Hassan</b>
                  </td>
                  <td>devon@example.com</td>
                  <td>$75.30</td>
                  <td>
                    <span className="badge rounded-pill alert-danger">
                      Cancelled
                    </span>
                  </td>
                  <td>02.01.2020</td>
                  <td className="text-end">
                    <a href="#" className="btn btn-light">
                      Detail
                    </a>
                    <div className="dropdown">
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
                    {/* <!-- dropdown //end --> */}
                  </td>
                </tr>
                <tr>
                  <td>7532</td>
                  <td>
                    <b>Abdul Mohammad</b>
                  </td>
                  <td>abdu@example.com</td>
                  <td>$190.15</td>
                  <td>
                    <span className="badge rounded-pill alert-success">
                      Delivered
                    </span>
                  </td>
                  <td>17.02.2020</td>
                  <td className="text-end">
                    <a href="#" className="btn btn-light">
                      Detail
                    </a>
                    <div className="dropdown">
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
                    {/* <!-- dropdown //end --> */}
                  </td>
                </tr>
                <tr>
                  <td>2323</td>
                  <td>
                    <b>Devon Lane</b>
                  </td>
                  <td>devon@example.com</td>
                  <td>$778.35</td>
                  <td>
                    <span className="badge rounded-pill alert-success">
                      Delivered
                    </span>
                  </td>
                  <td>07.05.2020</td>
                  <td className="text-end">
                    <a href="#" className="btn btn-light">
                      Detail
                    </a>
                    <div className="dropdown">
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
                    {/* <!-- dropdown //end --> */}
                  </td>
                </tr>
                <tr>
                  <td>4521</td>
                  <td>
                    <b>Alex Pushkin</b>
                  </td>
                  <td>myphkin@company.com</td>
                  <td>$708.35</td>
                  <td>
                    <span className="badge rounded-pill alert-success">
                      Delivered
                    </span>
                  </td>
                  <td>01.05.2019</td>
                  <td className="text-end">
                    <a href="#" className="btn btn-light">
                      Detail
                    </a>
                    <div className="dropdown">
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
                    {/* <!-- dropdown //end --> */}
                  </td>
                </tr>
              </table>
            </div>
            {/* <!-- table-responsive end// --> */}
          </div>
          {/* <!-- card-body end// --> */}
        </div>
        {/* <!-- card end// --> */}
      </section>
    </React.Fragment>
  );
};

export default AdminDashboard;
