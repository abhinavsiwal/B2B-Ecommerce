import React, { useEffect, useState } from "react";

import { sendRequest } from "../src/hooks/request";

import { useAlert } from "react-alert";
import Link from "next/link";
import getFormattedDate from "../src/utils/formattedDate";

const AdminUsers = () => {
  const alert = useAlert();
  const [users, setUsers] = useState<any>([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const { data } = await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/user/users`
      );
      console.log(data);
      setUsers(data.users);
    } catch (err) {
      console.log(err);
      alert.error("Something went wrong");
    }
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Users list</h2>
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
                  <th>User</th>
                  <th>Phone</th>
                  <th>Registered</th>
                  <th className="text-end"> Action </th>
                </tr>
              </thead>
              <tbody>
                {users &&
                  users.map((user: any) => {
                    let date = getFormattedDate(user.createdAt);
                    return (
                      <tr key={user._id}>
                        <td width="40%">
                          <a href="#" className="itemside">
                            <div className="info pl-3">
                              <h6 className="mb-0 title">{user.name}</h6>
                              <small className="text-muted">
                                Seller ID: {user._id}
                              </small>
                            </div>
                          </a>
                        </td>
                        <td>{user.phone}</td>

                        <td>{date}</td>
                        <td className="text-end">
                          <Link href={`/userDetails/${user._id}`}>
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

export default AdminUsers;