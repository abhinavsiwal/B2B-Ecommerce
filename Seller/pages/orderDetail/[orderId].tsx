import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAlert } from "react-alert";
import { sendRequest, sendRequestWithJson } from "../../src/hooks/request";
import getFormattedDate from "../../src/utils/formattedDate";

const OrderDetail = () => {
  const router = useRouter();
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>({});
  const [date, setDate] = useState<any>()
  let orderId: string | string[] | undefined;
  useEffect(() => {
    orderId = router.query.orderId;

    getOrder(orderId);
  }, [orderId]);

  const getOrder = async (orderId: any) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/order/orderDetail/${orderId}`
      );
      console.log(data);
      setOrder(data.order);
      let date = getFormattedDate(data.order.createdAt)
      setDate(date);
    } catch (err) {
      console.log(err);

      alert.error("Something went wrong.");
    }
  };

  const orderStatusHandler = async (statusValue: string) => {
    try {
      console.log(orderId);

      setLoading(true);
      const { data } = await sendRequestWithJson(
        `${process.env.NEXT_PUBLIC_API_URL}/order/updateOrder/${order._id}`,
        {status:statusValue},
        "PUT"
      );
      console.log(data);
      alert.success(data.message);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert.error("Something went wrong in Updating order status");
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <section className="content-main">
        <React.Fragment>
          <div className="content-header">
            <h2 className="content-title">Order detail</h2>
          </div>

          <div className="card">
            <header className="card-header">
              <div className="row align-items-center">
                <div className="col-lg-6 col-md-6">
                  <span>
                    <i className="material-icons md-calendar_today"></i>{" "}
                    <b>{date}</b>
                  </span>{" "}
                  <br />
                  <small className="text-muted">Order ID: {order._id}</small>
                </div>
                <div className="col-lg-6 col-md-6 ms-auto text-md-end">
                  <select
                    className="form-select d-inline-block"
                    style={{ maxWidth: "200px" }}
                    onChange={(e) => orderStatusHandler(e.target.value)}
                  >
                    <option value="">Change status</option>
                    <option value="processing">Processing</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                    {/* <option>Delivered</option> */}
                  </select>
                  <a className="btn btn-light" href="#">
                    Save
                  </a>
                  <a className="btn btn-secondary ms-2" href="#">
                    <i className="icon material-icons md-print"></i>
                  </a>
                </div>
              </div>
            </header>
            {/* <!-- card-header end// --> */}

            <div className="card-body">
              <div className="row mb-5 order-info-wrap">
                <div className="col-md-4">
                  <article className="icontext align-items-start">
                    <React.Fragment>
                      <span className="icon icon-sm rounded-circle bg-primary-light">
                        <i className="text-primary material-icons md-person"></i>
                      </span>
                      <div className="text">
                        <React.Fragment>
                          <h6 className="mb-1">Customer</h6>
                          <p className="mb-1">
                            {order.user && order.user.name} <br />{" "}
                            {order.user && order.user.phone}
                          </p>
                          <a href="#">View profile</a>
                        </React.Fragment>
                      </div>
                    </React.Fragment>
                  </article>
                </div>
                {/* <!-- col// --> */}
                <div className="col-md-4">
                  <article className="icontext align-items-start">
                    <span className="icon icon-sm rounded-circle bg-primary-light">
                      <i className="text-primary material-icons md-local_shipping"></i>
                    </span>
                    <div className="text">
                      <h6 className="mb-1">Order info</h6>
                      <p className="mb-1">
                        Shipping: Fargo express <br /> Pay method: card <br />{" "}
                        Status: new
                      </p>
                      <a href="#">Download info</a>
                    </div>
                  </article>
                </div>
                {/* <!-- col// --> */}
                <div className="col-md-4">
                  <article className="icontext align-items-start">
                    <span className="icon icon-sm rounded-circle bg-primary-light">
                      <i className="text-primary material-icons md-place"></i>
                    </span>
                    <div className="text">
                      <h6 className="mb-1">Deliver to</h6>
                      <p className="mb-1">
                        City: {order.shippingInfo && order.shippingInfo.city}{" "}
                        <br />
                        {order.shippingInfo && order.shippingInfo.address}{" "}
                        <br />{" "}
                        {order.shippingInfo && order.shippingInfo.pincode}
                      </p>
                      <a href="#">View profile</a>
                    </div>
                  </article>
                </div>
                {/* <!-- col// --> */}
              </div>
              {/* <!-- row // --> */}

              <div className="row">
                <div className="col-lg-8">
                  <div className="table-responsive">
                    <table className="table border table-hover table-lg">
                      <thead>
                        <tr>
                          <th width="40%">Product</th>
                          <th width="20%">Unit Price</th>
                          <th width="20%">Quantity</th>
                          <th width="20%" className="text-end">
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.orderItems &&
                          order.orderItems.map((item: any) => {
                            return (
                              <tr>
                                <td key={item._id}>
                                  <a className="itemside" href="#">
                                    <div className="left">
                                      <img
                                        src={item.image}
                                        width="40"
                                        height="40"
                                        className="img-xs"
                                        alt="Item"
                                      />
                                    </div>
                                    <div className="info"> {item.name} </div>
                                  </a>
                                </td>
                                <td> ₹{item.price} </td>
                                <td> {item.quantity} </td>
                                <td className="text-end">
                                  {item.price * item.quantity}{" "}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                  {/* <!-- table-responsive// --> */}
                </div>
                {/* <!-- col// --> */}
                <div className="col-lg-4">
                  <div className="box shadow-sm bg-light">
                    <h6>Payment info</h6>
                    <p>
                      Payment Id :{" "}
                      {order.paymentInfo && order.paymentInfo.razorpayPaymentId}{" "}
                      <br />
                    </p>
                  </div>
                </div>
                {/* <!-- col// --> */}
              </div>
            </div>
            {/* <!-- card-body end// --> */}
          </div>
          {/* <!-- card end// --> */}
        </React.Fragment>
      </section>
    </React.Fragment>
  );
};

export default OrderDetail;
