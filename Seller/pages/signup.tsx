import React, { useState } from "react";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import { useAppDispatch, useAppSelector } from "../src/hooks/redux-hooks";
import {
  setToken,
  setIsLoggedIn,
  setSellerDetails,
} from "../src/store/Reducers/seller";
import axios from "axios";
const Signup = () => {
  const router = useRouter();
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [storeName, setStoreName] = useState<string>("");
  const [referralCode, setReferralCode] = useState<string>("");
  const [phone, setPhone] = useState<any>();
  const [phoneError, setPhoneError] = useState<boolean>(false);
  const [pincode, setPincode] = useState<any>("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sellerId, setSellerId] = useState<any>();
  const [otp, setOtp] = useState<any>();
  const phoneBlurHandler = () => {
    let regex = /^[5-9]{2}[0-9]{8}$/;
    if (regex.test(phone)) {
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  };

  const nameBlurHandler = () => {
    if (name.trim().length === 0) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  const getOtpHandler = async (e: any) => {
    e.preventDefault();
    console.log(process.env.NEXT_PUBLIC_API_URL);

    let formData = {
      name,
      phone,
      storeName,
      pincode,
      referralCode,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/seller/signup`,
        formData,
        config
      );
      console.log(data);

      alert.success(data.message);
      setOtpSent(true);
      setSellerId(data.userId);
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      alert.error(err.message);
      setOtpSent(false);
      setLoading(false);
    }
  };

  const signupHandler = async (e: any) => {
    e.preventDefault();
    const formData = {
      otp,
      sellerId,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/seller/verifyOtp`,
        formData,
        config
      );
      console.log(data);
      dispatch(setToken(data.token));
      dispatch(setSellerDetails(data.sellerDetails));
      dispatch(setIsLoggedIn(true));
      alert.success("User Created Successfully");
      router.push("/");
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      alert.error(err.message);
      setLoading(false);
    }
  };

  return (

      <section className="content-main">
        {/* <!-- ============================ COMPONENT LOGIN   ================================= --> */}
        <div
          className="card shadow mx-auto"
          style={{ maxWidth: "480px", marginTop: "30px" }}
        >
          <div className="card-body">
            <h4 className="card-title mb-4">Register</h4>
            <form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  className={
                    !nameError ? "form-control" : "form-control is-invalid"
                  }
                  placeholder="Enter your name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={nameBlurHandler}
                />
                <div className="invalid-feedback">Please enter your name!</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Phone no</label>
                <input
                  className={
                    !phoneError ? "form-control" : "form-control is-invalid"
                  }
                  placeholder="+91"
                  type="number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onBlur={phoneBlurHandler}
                />
                <div className="invalid-feedback">
                  Please enter valid phone number!
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Store Name</label>
                <input
                  className="form-control"
                  placeholder="Enter your store name"
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Referral Code</label>
                <input
                  className="form-control"
                  placeholder="Enter your referral code"
                  type="text"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Pincode</label>
                <input
                  className="form-control"
                  placeholder="Enter your pincode"
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
              {/* <!-- form-group// --> */}
              <div
                className="mb-3"
                style={{ display: otpSent ? "block" : "none" }}
              >
                <label className="form-label">OTP</label>
                <div className="row gx-2">
                  <div className="col-4">
                    {" "}
                    <input
                      className="form-control"
                      type="number"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />{" "}
                  </div>
                </div>
              </div>
              {/* <!-- form-group// --> */}
              <div className="mb-3">
                <p className="small text-center text-muted">
                  By signing up, you confirm that you’ve read and accepted our
                  User Notice and Privacy Policy.
                </p>
              </div>
              {/* <!-- form-group  .// --> */}
              <div
                className="mb-4"
                style={{ display: !otpSent ? "block" : "none" }}
              >
                <button
                  onClick={getOtpHandler}
                  className="btn btn-primary w-100"
                >
                  {loading ? (
                    <React.Fragment>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Loading...</span>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>Get Otp</React.Fragment>
                  )}
                </button>
              </div>
              <div
                className="mb-4"
                style={{ display: otpSent ? "block" : "none" }}
              >
                <button
                  onClick={signupHandler}
                  className="btn btn-primary w-100"
                >
                  {loading ? (
                    <React.Fragment>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Loading...</span>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>Signup</React.Fragment>
                  )}
                </button>
              </div>
              {/* <!-- form-group// --> */}
            </form>
            {/* For future ==> Social media login */}
            {/* <!-- social buttons   --> */}

            {/* <!-- social buttons //end  --> */}

            <p className="text-center mb-2">
              Don't have account? <a href="#">Sign up</a>
            </p>
          </div>
          {/* <!-- card-body.// --> */}
        </div>
        {/* <!-- card .// --> */}

        {/* <!-- ============================ COMPONENT LOGIN  END.// ================================= --> */}
      </section>
  );
};

export default Signup;
