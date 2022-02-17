import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAlert } from "react-alert";
import Spinner from "../../src/components/Layout/Spinner";

const OrderDetail = () => {
  const router = useRouter();
  const alert = useAlert();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>({});

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
      setLoading(false);
    } catch (err) {
      console.log(err);

      alert.error("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <div className="spinner-container" style={{ height: "40vh" }}>
          <Spinner />
        </div>
      ) : (
        <div className="container my-4" id="order-details">
          <div className="">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order No - {order._id}</h5>
              </div>
              <div className="modal-body pb-0">
                {/* <!-- Item--> */}
                {order.orderItems && order.orderItems.map((item:any)=>{
                    return(
                        <div className="d-sm-flex justify-content-between mb-4 pb-3 pb-sm-2 border-bottom"  key={item._id}>
                        <div className="d-sm-flex text-center text-sm-start">
                          <a
                            className="d-inline-block flex-shrink-0 mx-auto"
                            href="shop-single-v1.html"
                            style={{ width: "10rem" }}
                          >
                            <img src={item.image} alt={item.name} />
                          </a>
                          <div className="ps-sm-4 pt-2">
                            <h3 className="product-title fs-base mb-2">
                              <a href="shop-single-v1.html">
                                {item.name}
                              </a>
                            </h3>
                                {/* <div className="fs-sm">
                                <span className="text-muted me-2">Size:</span>8.5
                                </div>
                                <div className="fs-sm">
                                <span className="text-muted me-2">Color:</span>White
                                &amp; Blue
                                </div> */}
                            <div className="fs-lg text-accent pt-2">
                            ₹{item.price}
                            </div>
                          </div>
                        </div>
                        <div className="pt-2 ps-sm-3 mx-auto mx-sm-0 text-center">
                          <div className="text-muted mb-2">Quantity:</div>{item.quantity}
                        </div>
                        <div className="pt-2 ps-sm-3 mx-auto mx-sm-0 text-center">
                          <div className="text-muted mb-2">Subtotal</div>₹{item.quantity*item.price}
                          
                        </div>
                      </div>
                    );
                })}
              
              </div>
              {/* <!-- Footer--> */}
              <div className="modal-footer flex-wrap justify-content-between bg-secondary fs-md">
                <div className="px-2 py-1">
                  <span className="text-muted">Subtotal:&nbsp;</span>
                  <span>
                  ₹{order.totalPrice}
                  </span>
                </div>
                <div className="px-2 py-1">
                  <span className="text-muted">Shipping:&nbsp;</span>
                  <span>
                  ₹100
                  </span>
                </div>
                <div className="px-2 py-1">
                  <span className="text-muted">Tax:&nbsp;</span>
                  <span>
                  ₹50
                  </span>
                </div>
                <div className="px-2 py-1">
                  <span className="text-muted">Total:&nbsp;</span>
                  <span className="fs-lg">
                  ₹{order.totalPrice}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default OrderDetail;
