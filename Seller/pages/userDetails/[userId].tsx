import React, { useEffect, useState } from "react";
import { sendRequest } from "../../src/hooks/request";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import Link from "next/link";
import getFormattedDate from "../../src/utils/formattedDate";
const UserDetails = () => {
  const router = useRouter();
  const alert = useAlert();
  const [user, setUser] = useState<any>({});
  const [orders, setOrders] = useState<any>([])
  const [totalOrders, setTotalOrders] = useState<number>();
  const [totalRevenue, setTotalRevenue] = useState<number>()


  let userId;

  useEffect(() => {
    userId = router.query.userId;

    getUser(userId);
  }, [userId]);

  const getUser = async (userId: any) => {
    try {
      console.log(userId);

      const { data } = await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/user/user/${userId}`
      );
      console.log(data);
      setUser(data.user);
      setOrders(data.orders);
      setTotalOrders(data.totalOrders);
      setTotalRevenue(data.totalRevenue)
    } catch (err) {
      console.log(err);
      alert.error("Something went wrong");
    }
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <Link href="/adminUsers">
        <a href="javascript:history.back()" className="btn btn-light">
          <i className="material-icons md-arrow_back"></i> Go back
        </a>
        </Link>
      </div>

      <div className="card mb-4">
        <div
          className="card-header bg-warning"
          style={{ height: "150px" }}
        ></div>
        <div className="card-body">
          <div className="row">
            <div
              className="col-xl col-lg flex-grow-0"
              style={{ flexBasis: "230px" }}
            ></div>
            {/* <!--  col.// --> */}
            <div className="col-xl col-lg">
              <h3>{user.name}</h3>
              <p>{user.storeName}</p>
            </div>
            {/* <!--  col.// --> */}
            <div className="col-xl-4 text-md-end">
              <select className="form-select w-auto d-inline-block">
                <option>Actions</option>
                <option>Disable shop</option>
                <option>Analyze</option>
                <option>Something</option>
              </select>
            </div>
            {/* <!--  col.// --> */}
          </div>
          {/* <!-- card-body.// --> */}
          <hr className="my-4" />
          <div className="row g-4">
            <div className="col-md-12 col-lg-4 col-xl-2">
              <article className="box">
                <p className="mb-0 text-muted">Total orders:</p>
                <h5 className="text-success">{totalOrders}</h5>
                <p className="mb-0 text-muted">Revenue:</p>
                <h5 className="text-success mb-0">₹{totalRevenue}</h5>
              </article>
            </div>
            {/* <!--  col.// --> */}
            <div className="col-sm-6 col-lg-4 col-xl-3">
              <h6>Contact</h6>
              <p>{user.phone}</p>
            </div>
            {/* <!--  col.// --> */}
            <div className="col-sm-6 col-lg-4 col-xl-3">
              <h6>Address</h6>
              <p>
                Country: California <br />
                Address: Ranchview Dr. Richardson <br />
                Postal code: 62639
              </p>
            </div>
            {/* <!--  col.// --> */}

            {/* <!--  col.// --> */}
          </div>
          {/* <!--  row.// --> */}
        </div>
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
                
                    {orders ?(

                      orders.map((order: any) => {
                        let processing = order.orderStatus === "processing";
                        let delivered = order.orderStatus === "delivered";
                        let cancelled = order.orderStatus === "cancelled";

                        let pillClass;
                        if (processing) {
                          pillClass = "alert-warning";
                        }
                        if (delivered) {
                          pillClass = "alert-success";
                        }
                        if (cancelled) {
                          pillClass = "alert-danger";
                        }
3
                        let date = getFormattedDate(order.createdAt)

                        return (
                          <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>
                              <b>
                                { order.shippingInfo && order.shippingInfo.firstName +
                                  " " +
                                  order.shippingInfo.lastName}
                              </b>
                            </td>
                            <td>{ order.user && order.user.phone}</td>
                            <td>₹{order.totalPrice}</td>
                            <td>
                              <span
                                className={`badge rounded-pill ${pillClass}`}
                                >
                                {order.orderStatus}
                              </span>
                            </td>
                            <td>{date}</td>
                            <td className="text-end">
                              <Link href={`/orderDetail/${order._id}`}>
                                <a href="#" className="btn btn-light">
                                  Detail
                                </a>
                                  </Link>
  
                              {/* <!-- dropdown //end --> */}
                            </td>
                          </tr>
                        );
                      })
                      ):(
                        <p>No orders found.</p>
                      )
                    }
                  
                
              </tbody>
            </table>
          </div>
          {/* <!-- table-responsive //end --> */}
        </div>
        {/* <!--  card-body.// --> */}
      </div>
      {/* <!--  card.// --> */}

      {/* <!--  card.// --> */}
    </section>
  );
};

export default UserDetails;
