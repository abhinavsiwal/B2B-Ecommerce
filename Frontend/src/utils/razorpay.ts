import axios from "axios";
import { sendRequest } from "../hooks/request";

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
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  let reqData = {
    orderItems: cartItems,
    shippingInfo,
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
    alert("Server error. Are you online?");
    return;
  }

  // Getting the order details back
  const { amount, id: order_id, currency } = data.orderDetail;
  const { dbOrderId } = data;

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
        paymentInfo,
        dbOrderId: dbOrderId,
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


      alert(result.data.message);
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

export default displayRazorpay;
