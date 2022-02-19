import React, { useEffect, useState } from "react";

import { sendRequest } from "../src/hooks/request";

import { useAlert } from "react-alert";
import Link from "next/link";
import getFormattedDate from "../src/utils/formattedDate";

const AdminSellers = () => {
  const alert = useAlert();
  const [sellers, setSellers] = useState<any>([]);
  useEffect(() => {
    getSellers();
  }, []);

  const getSellers = async () => {
    try {
      const { data } = await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/seller/sellers`
      );
      console.log(data);
      setSellers(data.sellers);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Sellers list</h2>
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
            <div className="col-lg-2 col-md-3 col-6">
              <select className="form-select">
                <option>Status</option>
                <option>Active</option>
                <option>Disabled</option>
                <option>Show all</option>
              </select>
            </div>
            <div className="col-lg-2 col-md-3 col-6">
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
                  <th>Seller</th>
                  <th>Phone</th>
                  <th>Registered</th>
                  <th className="text-end"> Action </th>
                </tr>
              </thead>
              <tbody>
                {sellers &&
                  sellers.map((seller: any) => {
                    let date = getFormattedDate(seller.createdAt)
                    return (
                      <tr>
                        <td width="40%">
                          <a href="#" className="itemside">
                            <div className="info pl-3">
                              <h6 className="mb-0 title">{seller.name}</h6>
                              <small className="text-muted">
                                Seller ID: {seller._id}
                              </small>
                            </div>
                          </a>
                        </td>
                        <td>{seller.phone}</td>

                        <td>{date}</td>
                        <td className="text-end">
                          <Link href={`/sellerDetails/${seller._id}`}>
                            <a href="#" className="btn btn-light">
                              View
                            </a>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {/* <!-- table-responsive.// --> */}
          </div>
        </div>
        {/* <!-- card-body end// --> */}
      </div>
      {/* <!-- card end// --> */}
    </section>
  );
};

export default AdminSellers;
