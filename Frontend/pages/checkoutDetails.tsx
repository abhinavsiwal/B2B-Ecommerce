import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../src/hooks/redux-hooks";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";
import axios from "axios";
import country_state_district from "country_state_district";
import Link from "next/link";
import { setShippingInfo } from "../src/store/Reducers/cart";
import { clearCart } from "../src/store/Reducers/cart";

const CheckoutDetails = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const alert = useAlert();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [stateId, setStateId] = useState<any>();
  const [state, setState] = useState("");
  const [districts, setDistricts] = useState([{}]);
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState<number>();
  const [address, setAddress] = useState("");

  let states = country_state_district.getAllStates();

  const {token}  = useAppSelector(state=>state.userReducer) 

  useEffect(() => {
    if(!token){
      router.push("/login")
      alert.error("Login First to Checkout.")
    }
  }, []);

  useEffect(() => {
    setStateId(states[0]);
    setState(states[0].name);
  }, []);

  useEffect(() => {
    let selectedState = states.find((state: any) => stateId <= state.id);
    console.log(selectedState);
    
    setState(selectedState && selectedState.name);
    
    setDistricts(country_state_district.getDistrictsByStateId(stateId));
  }, [stateId, setDistricts]);

  const { cartItems, cartTotalAmount, cartTotalQuantity } = useAppSelector(
    (state) => state.cartReducer
  );
  const {userDetails} = useAppSelector(
    state=>state.userReducer
  )

  const shippingInfoHandler = () => { 
    
    let shippingInfo = {
      firstName,
      lastName,
      state,
      district,
      city,
      pincode,
      address,
    };
    console.log(shippingInfo); 

    dispatch(setShippingInfo(shippingInfo));
    displayRazorpay(cartTotalAmount,shippingInfo,userDetails,cartItems)
  };



  function loadScript(src: any) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  // Then I'll add the function displayRazorpay that will first load the script, then make a post request to our back-end route and finally show the popup.
  async function displayRazorpay(
    totalAmount: Number,
    shippingInfo: any,
    userDetails: any,
    cartItems: any
    ) {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  
    if (!res) {
      alert.error("Razorpay SDK failed to load. Are you online?");
      return;
    }
  
    if(!district && !state){
      return alert.error("Please select district and state first")
    }

    let reqData = {
      totalPrice: totalAmount,
    };
    let token = JSON.parse(
      JSON.parse(localStorage.getItem("persist:root") as any).userReducer
    ).token;
    console.log(token);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/order/createOrder`,
      reqData,
      config 
    );
    // creating a new order
    // const {data} = await sendRequest(
    //   `${process.env.NEXT_PUBLIC_API_URL}/order/createOrder`,
    //   payload,
    //   "POST",
    // );
      console.log(data); 
      
    if (!data) {
      alert.error("Server error. Are you online?");
      return;
    }
  
    // Getting the order details back
    const { amount, id: order_id, currency } = data.orderDetail;

  
    const options = {
      key: "rzp_test_vfKqDSJFUHzSxG", // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "QUDE Corp.",
      description: "Test Transaction",
      image: "/img/logo.jpg",
      order_id: order_id,
      handler: async function (response: any) {
        const paymentInfo = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
     
        const data = {
          orderItems: cartItems,
          shippingInfo,
          totalPrice: totalAmount,
          paymentInfo,
        };
        console.log(data);
  
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const result = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/order/payment/status`,
          data,
          config
        );
  
        router.push('/checkoutComplete') 
        alert.success(result.data.message);
        dispatch(clearCart());
      },
      prefill: {
        name: shippingInfo.name,
        email: "example@test.com",
        contact: userDetails.phone,
      },
      notes: {
        address: "QUDE Pvt Ltd.",
      },
      theme: {
        color: "#61dafb",
      },
    };
  
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  
  


  return (
    <React.Fragment>
      <div className="page-title-overlap bg-dark pt-4">
        <div className="container d-lg-flex justify-content-between py-2 py-lg-3">
          <div className="order-lg-2 mb-3 mb-lg-0 pt-lg-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb breadcrumb-light flex-lg-nowrap justify-content-center justify-content-lg-start">
                <li className="breadcrumb-item">
                  <a className="text-nowrap" href="index-2.html">
                    <i className="ci-home"></i>Home
                  </a>
                </li>
                <li className="breadcrumb-item text-nowrap">
                  <a href="shop-grid-ls.html">Shop</a>
                </li>
                <li
                  className="breadcrumb-item text-nowrap active"
                  aria-current="page"
                >
                  Checkout
                </li>
              </ol>
            </nav>
          </div>
          <div className="order-lg-1 pe-lg-4 text-center text-lg-start">
            <h1 className="h3 text-light mb-0">Checkout</h1>
          </div>
        </div>
      </div>
        <div className="container pb-5 mb-2 mb-md-4">
          <div className="row">
            <section className="col-lg-8">
              {/* <!-- Steps--> */}
              <div className="steps steps-light pt-2 pb-3 mb-5">
                <a className="step-item active" href="shop-cart.html">
                  <div className="step-progress">
                    <span className="step-count">1</span>
                  </div>
                  <div className="step-label">
                    <i className="ci-cart"></i>Cart
                  </div>
                </a>
                <a
                  className="step-item active current"
                  href="checkout-details.html"
                >
                  <div className="step-progress">
                    <span className="step-count">2</span>
                  </div>
                  <div className="step-label">
                    <i className="ci-user-circle"></i>Details
                  </div>
                </a>

                <a className="step-item" href="checkout-payment.html">
                  <div className="step-progress">
                    <span className="step-count">3</span>
                  </div>
                  <div className="step-label">
                    <i className="ci-card"></i>Payment
                  </div>
                </a>
                <a className="step-item" href="checkout-review.html">
                  <div className="step-progress">
                    <span className="step-count">4</span>
                  </div>
                  <div className="step-label">
                    <i className="ci-check-circle"></i>Review
                  </div>
                </a>
              </div>
              {/* <!-- Autor info--> */}
              <div className="d-sm-flex justify-content-between align-items-center bg-secondary p-4 rounded-3 mb-grid-gutter">
                <div className="d-flex align-items-center">
                  <div className="img-thumbnail rounded-circle position-relative flex-shrink-0">
                    <span
                      className="badge bg-warning position-absolute end-0 mt-n2"
                      data-bs-toggle="tooltip"
                      title="Reward points"
                    >
                      384
                    </span>
                    <img
                      className="rounded-circle"
                      src="img/shop/account/avatar.jpg"
                      width="90"
                      alt="Susan Gardner"
                    />
                  </div>
                  <div className="ps-3">
                    <h3 className="fs-base mb-0">Susan Gardner</h3>
                    <span className="text-accent fs-sm">
                      s.gardner@example.com
                    </span>
                  </div>
                </div>
                <a
                  className="btn btn-light btn-sm btn-shadow mt-3 mt-sm-0"
                  href="account-profile.html"
                >
                  <i className="ci-edit me-2"></i>Edit profile
                </a>
              </div>
              {/* <!-- Shipping address--> */}
              <h2 className="h6 pt-1 pb-3 mb-3 border-bottom">
                Shipping address
              </h2>
              <div className="row">
                <div className="col-sm-6">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="checkout-fn">
                      First Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="checkout-fn"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="checkout-ln">
                      Last Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="checkout-ln"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-sm-6">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="checkout-country">
                      State
                    </label>
                    <select
                      className="form-select"
                      id="checkout-country"
                      onChange={(e) => setStateId(e.target.value)}
                      required
                    >
                      {states.map((state: any) => {
                        return (
                          <option key={state.id} value={state.id}>
                            {state.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="checkout-city">
                      District
                    </label>
                    <select
                      className="form-select"
                      id="checkout-city"
                      onChange={(e) => setDistrict(e.target.value)}
                    >
                      {districts &&
                        districts.map((district: any) => {
                          return (
                            <option value={district.name} key={district.id}>
                              {district.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="checkout-zip">
                      City
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="checkout-zip"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="checkout-zip">
                      Pincode
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      id="checkout-zip"
        
                      onChange={(e) => setPincode(Number(e.target.value))}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12">
                  <div className="mb-3">
                    <label className="form-label" htmlFor="checkout-address-1">
                      Address*
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="checkout-address-1"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
          
              {/* <!-- Navigation (desktop)--> */}
              <div className="d-none d-lg-flex pt-4 mt-3">
                <div className="w-50 pe-3">
                  <Link href="/cart">
                    <a
                      className="btn btn-secondary d-block w-100"
                      href="shop-cart.html"
                    >
                      <i className="ci-arrow-left mt-sm-0 me-1"></i>
                      <span className="d-none d-sm-inline">Back to Cart</span>
                      <span className="d-inline d-sm-none">Back</span>
                    </a>
                  </Link>
                </div>
                <div className="w-50 ps-2">
                  <a
                    className="btn btn-primary d-block w-100"
                    href="#"
                    onClick={shippingInfoHandler}
                  >
                    <span className="d-none d-sm-inline">
                      Proceed to Payment
                    </span>
                    <span className="d-inline d-sm-none">Next</span>
                    <i className="ci-arrow-right mt-sm-0 ms-1"></i>
                  </a>
                </div>
              </div>
            </section>
            {/* <!-- Sidebar--> */}
            <aside className="col-lg-4 pt-4 pt-lg-0 ps-xl-5">
              <div className="bg-white rounded-3 shadow-lg p-4 ms-lg-auto">
                <div className="py-2 px-xl-2">
                  <div className="widget mb-3">
                    <h2 className="widget-title text-center">Order summary</h2>
                    {cartItems &&
                      cartItems.map((cartItem: any) => {
                        return (
                          <div className="d-flex align-items-center pb-2 border-bottom">
                            <a
                              className="d-block flex-shrink-0"
                              href="shop-single-v1.html"
                            >
                              <img
                                src={cartItem.image}
                                width="64"
                                alt="Product"
                              />
                            </a>
                            <div className="ps-2">
                              <h6 className="widget-product-title">
                                <a href="shop-single-v1.html">{cartItem.name}</a>
                              </h6>
                              <div className="widget-product-meta">
                                <span className="text-accent me-2">
                                  ₹{cartItem.price}
                                </span>
                                <span className="text-muted">
                                  x {cartItem.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                  <ul className="list-unstyled fs-sm pb-2 border-bottom">
                    <li className="d-flex justify-content-between align-items-center">
                      <span className="me-2">Subtotal:</span>
                      <span className="text-end">{cartTotalAmount}</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span className="me-2">Shipping:</span>
                      <span className="text-end">₹50</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span className="me-2">Taxes:</span>
                      <span className="text-end">₹20</span>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span className="me-2">Discount:</span>
                      <span className="text-end">—</span>
                    </li>
                  </ul>
                  <h3 className="fw-normal text-center my-4">
                    ₹{cartTotalAmount}
                  </h3>
                  <form className="needs-validation" method="post" noValidate>
                    <div className="mb-3">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Promo code"
                        required
                      />
                      <div className="invalid-feedback">
                        Please provide promo code.
                      </div>
                    </div>
                    <button
                      className="btn btn-outline-primary d-block w-100"
                      type="submit"
                    >
                      Apply promo code
                    </button>
                  </form>
                </div>
              </div>
            </aside>
          </div>
          {/* <!-- Navigation (mobile)--> */}
          <div className="row d-lg-none">
            <div className="col-lg-8">
              <div className="d-flex pt-4 mt-3">
                <div className="w-50 pe-3">
                  <Link href="/cart">
                    <a
                      className="btn btn-secondary d-block w-100"
                      href="shop-cart.html"
                    >
                      <i className="ci-arrow-left mt-sm-0 me-1"></i>
                      <span className="d-none d-sm-inline">Back to Cart</span>
                      <span className="d-inline d-sm-none">Back</span>
                    </a>
                  </Link>
                </div>
                <div className="w-50 ps-2">
                  <a
                    className="btn btn-primary d-block w-100"
                    href="#"
                    onClick={shippingInfoHandler}
                  >
                    <span className="d-none d-sm-inline">Proceed to Payment</span>
                    <span className="d-inline d-sm-none">Next</span>
                    <i className="ci-arrow-right mt-sm-0 ms-1"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
    </React.Fragment>
  );
};

export default CheckoutDetails;
