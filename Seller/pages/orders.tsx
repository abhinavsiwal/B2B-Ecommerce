import React, { useEffect } from "react";
import { sendRequest } from "../src/hooks/request";
import { Dropdown } from "react-bootstrap";

const Orders = () => {
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const { data } = await sendRequest(`${process.env.NEXT_PUBLIC_API_URL}/order/seller`);
    console.log(data);
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Orders</h2>
      </div>

      <div className="card mb-4">
        <header className="card-header">
          <div className="row gx-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search..."
                className="form-control"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Status</option>
                <option>Active</option>
                <option>Disabled</option>
                <option>Show all</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select className="form-select">
                <option>Show 20</option>
                <option>Show 30</option>
                <option>Show 40</option>
              </select>
            </div>
          </div>
        </header>
        {/* <!-- card-header end// --> */}
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                  <th scope="col" className="text-end">
                    {" "}
                    Action{" "}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0901</td>
                  <td>
                    <b>Marvin McKinney</b>
                  </td>
                  <td>marvin@example.com</td>
                  <td>$9.00</td>
                  <td>
                    <span className="badge rounded-pill alert-warning">
                      Pending
                    </span>
                  </td>
                  <td>03.12.2020</td>
                  <td className="text-end">
                    <a href="#" className="btn btn-light">
                      Detail
                    </a>
                    <a href="#" className="btn btn-light">
                      Edit
                    </a>
                   
                    {/* <!-- dropdown //end --> */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* <!-- table-responsive //end --> */}
        </div>
        {/* <!-- card-body end// --> */}
      </div>
      {/* <!-- card end// --> */}
    </section>
  );
};

export default Orders;
