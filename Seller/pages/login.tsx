import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import { useAppDispatch, useAppSelector } from "../src/hooks/redux-hooks";
import {
  setToken,
  setIsLoggedIn,
  setSellerDetails,
} from "../src/store/Reducers/seller";

const Login = () => {
  const router = useRouter();
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState<any>();
  const [phoneError, setPhoneError] = useState<boolean>(false);
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

  const getOtpHandler = async (e: any) => {
    e.preventDefault();
    console.log(process.env.NEXT_PUBLIC_API_URL);

    let formData = {
      phone,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/seller/login`,
        formData,
        config
      );
      console.log(data);
      alert.success(data.message);
      setOtpSent(true);
      setSellerId(data.sellerId);
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
      alert.success("User Created Successfully");
      dispatch(setToken(data.token));
      dispatch(setSellerDetails(data.sellerDetails));
      dispatch(setIsLoggedIn(true));
      router.push("/");
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      alert.error(err.message);
      setLoading(false);
    }
  };

  return (
    <div
      className="card shadow mx-auto"
      style={{ maxWidth: "380px", marginTop: "100px" }}
    >
      <div className="card-body">
        <h4 className="card-title mb-4">Sign in</h4>
        <form>
          <div className="mb-3">
            {/* <label htmlFor="">Phone no</label> */}
            <input
              className={
                !phoneError ? "form-control" : "form-control is-invalid"
              }
              placeholder="+91"
              type="number"
              onBlur={phoneBlurHandler}
              onChange={(e) => setPhone(e.target.value)}
            />
            <div className="invalid-feedback">
              Please enter valid phone number!
            </div>
          </div>
          {/* <!-- form-group// --> */}
          <div className="mb-3" style={{ display: otpSent ? "block" : "none" }}>
            <input
              className="form-control"
              placeholder="OTP"
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          {/* <!-- form-group// --> */}

          {/* <!-- form-group form-check .// --> */}
          <div className="mb-4" style={{ display: !otpSent ? "block" : "none" }}>
            <button
              className="btn btn-primary w-100"
              type="submit"
              
              onClick={getOtpHandler}
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
                      <React.Fragment>
                        Get Otp
                      </React.Fragment>
                    )}
            </button>
          </div>
          <div className="mb-4"  style={{ display: otpSent ? "block" : "none" }} >
            <button type="submit" className="btn btn-primary w-100" onClick={signupHandler} >
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
                      <React.Fragment>
                        <i className="ci-user me-2 ms-n1"></i>
                        Login
                      </React.Fragment>
                    )}
            </button>
          </div>
          {/* <!-- form-group// --> */}
        </form>

        <p className="text-center mb-4">
          Don't have account? <a href="#">Sign up</a>
        </p>

        {/* <!-- social buttons   --> */}
      </div>
    </div>
  );
};

export default Login;
