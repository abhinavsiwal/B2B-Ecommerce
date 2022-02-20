import React, { useState } from "react";
import {useRouter} from "next/router";
import axios from "axios";
import { useAlert } from "react-alert";
import { useAppDispatch,useAppSelector } from "../src/hooks/redux-hooks";
import { setToken,setIsLoggedIn,setUserDetails } from "../src/store/Reducers/user";
import Link from "next/link";
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
  const [userId, setUserId] = useState<any>();
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
        `${process.env.NEXT_PUBLIC_API_URL}/user/signup`,
        formData,
        config
      );
      console.log(data);
     
      alert.success(data.message);
      setOtpSent(true);
      setUserId(data.userId);
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      alert.error(err.message);
      setOtpSent(false);
      setLoading(false);
    }
  };

  const signupHandler = async(e:any) => {
    e.preventDefault();
    const formData = {
      otp,
      userId,
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/verifyOtp`,
        formData,
        config
      );
      console.log(data);
      dispatch(setToken(data.token))
      dispatch(setUserDetails(data.userDetails))
      dispatch(setIsLoggedIn(true));
      alert.success("User Created Successfully");
      router.push('/');
      setLoading(false)
    } catch (err:any) {
      console.log(err);
      alert.error(err.message);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="authContainer">
        <div className="signupContainer">
          <div className="pt-4 mt-3 mt-md-0">
            <h2 className="h4 mb-3">No account? Sign up</h2>
            <p className="fs-sm text-muted mb-4">
              Registration takes less than a minute but gives you full control
              over your orders.
            </p>
            <form className="needs-validation" noValidate>
              <div className="row gx-4 gy-3">
                <div className="col-sm-6">
                  <label className="form-label" htmlFor="reg-fn">
                    Name*
                  </label>
                  <input
                    className={
                      !nameError ? "form-control" : "form-control is-invalid"
                    }
                    type="text"
                    required
                    id="reg-fn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={nameBlurHandler}
                  />
                  <div className="invalid-feedback">
                    Please enter your first name!
                  </div>
                </div>
                <div className="col-sm-6">
                  <label className="form-label" htmlFor="reg-ln">
                    Shop Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    id="reg-ln"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please enter your Shop name!
                  </div>
                </div>

                <div className="col-sm-6">
                  <label className="form-label" htmlFor="referralCode">
                    Referral Code
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    id="referralCode"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                  />
                  <div className="invalid-feedback">Please enter password!</div>
                </div>
                <div className="col-sm-6">
                  <label className="form-label" htmlFor="pincode">
                    Pincode
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    required
                    id="pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  <div className="invalid-feedback">Please enter Pincode</div>
                </div>
                <div className="col-sm-6">
                  <label className="form-label" htmlFor="reg-phone">
                    Phone Number*
                  </label>
                  <input
                    className={
                      !phoneError ? "form-control" : "form-control is-invalid"
                    }
                    type="number"
                    required
                    id="reg-phone"
    
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={phoneBlurHandler}
                  />
                  <div className="invalid-feedback">
                    Please enter valid phone number!
                  </div>
                </div>

                <div
                  className="col-sm-6"
                  style={{ display: otpSent ? "block" : "none" }}
                >
                  <label className="form-label" htmlFor="otp">
                    OTP
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    required
                    id="otp"
                    value={otp}
                    onChange={e=>setOtp(e.target.value)}
                  />
                  <div className="invalid-feedback">Otp do not match!</div>
                </div>
                <div
                  className="col-12 text-end"
                  style={{ display: !otpSent ? "block" : "none" }}
                >
                  <button
                    className="btn btn-primary"
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
                        <i className="ci-user me-2 ms-n1"></i>
                        Get Otp
                      </React.Fragment>
                    )}
                  </button>
                </div>
                <div
                  className="col-12 text-end"
                  style={{ display: otpSent ? "block" : "none" }}
                >
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={signupHandler}
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
                        <i className="ci-user me-2 ms-n1"></i>
                        Signup
                      </React.Fragment>
                    )}
                  </button>
                </div>
             
              </div>
              <p>Already have a account? {" "} <Link href="/login"><a href="#">Login </a></Link>  Instead</p>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signup;
