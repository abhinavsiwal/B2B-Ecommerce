import axios from "axios";

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
async function displayRazorpay(totalAmount: Number,shippingInfo:any,userDetails:any) {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    alert("Razorpay SDK failed to load. Are you online?");
    return;
  }

  // creating a new order
  const {data} = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/order/createOrder`,
    {totalAmount:totalAmount}
  );

  if (!data) {
    alert("Server error. Are you online?");
    return;
  }

  // Getting the order details back
  const { amount, id: order_id, currency } = data.order;

  const options = {
    key: "rzp_test_vfKqDSJFUHzSxG", // Enter the Key ID generated from the Dashboard
    amount: amount.toString(),
    currency: currency,
    name: "Soumya Corp.",
    description: "Test Transaction",
    image: "/img/logo.jpg",
    order_id: order_id,
    handler: async function (response: any) {
      const data = {
        orderCreationId: order_id,
        razorpayPaymentId: response.razorpay_payment_id,
        razorpayOrderId: response.razorpay_order_id,
        razorpaySignature: response.razorpay_signature,
      };
      console.log(data);
      
      const result = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/order/success`,
        data
      );

      alert(result.data.msg);
    },
    prefill: {
      name: shippingInfo.name,
      email: "",
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
