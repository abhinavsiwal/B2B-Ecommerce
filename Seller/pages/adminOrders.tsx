import React, { useEffect, useState } from "react";
import { sendRequest } from "../src/hooks/request";
import { useAppDispatch, useAppSelector } from "../src/hooks/redux-hooks";
import { setOrders } from "../src/store/Reducers/orders";
import { useAlert } from "react-alert";
import { Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import getFormattedDate from "../src/utils/formattedDate";

const AdminOrders = () => {
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { orders } = useAppSelector((state) => state.ordersReducer);

  useEffect(() => {
      console.log("Inside Useeffect");
      
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      setLoading(true);
      const { data } = await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/order/orders`
      );
      console.log(data);
      dispatch(setOrders(data.orders));
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert.error("Something went wrong");
      setLoading(false);
    }
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
                <option>Processing</option>
                <option>Delivered</option>
                <option>Cancelled</option>
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
                {loading ? (
                  <Spinner
                    animation="border"
                    role="status"
                    variant="info"
                    style={{ marginTop: "2rem", margin: "auto" }}
                  >
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  <React.Fragment>
                    {orders &&
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

                        let date = getFormattedDate(order.createdAt)

                        return (
                          <tr>
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
                      })}
                  </React.Fragment>
                )}
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

export default AdminOrders;
