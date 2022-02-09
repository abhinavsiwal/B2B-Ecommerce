import React,{useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import { useAlert } from "react-alert";
import { useAppDispatch,useAppSelector } from "../src/hooks/redux-hooks";
import { setToken,setIsLoggedIn,setUserDetails } from "../src/store/Reducers/user";

const Login = () => {
  const router = useRouter();
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const [phone, setPhone] = useState<any>();
  const [phoneError, setPhoneError] = useState<boolean>(false);
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
        `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
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
      alert.success("User Created Successfully");
      dispatch(setToken(data.token))
      dispatch(setUserDetails(data.userDetails))
      dispatch(setIsLoggedIn(true));
      router.push('/');
      setLoading(false);
    } catch (err:any) {
      console.log(err);
      alert.error(err.message);
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <div className="authContainer"> 
        <div className="card border-0 shadow">
          <div className="card-body">
            <h2 className="h4 mb-4">Login</h2>
            
            <form className="needs-validation" noValidate>
              <div className="input-group mb-4">
                <i className="ci-phone position-absolute top-50 translate-middle-y text-muted fs-base ms-3"></i>
                <input
                  className={
                      !phoneError ? "form-control rounded-start" : "form-control rounded-start is-invalid"
                    }
                  type="number"
                  placeholder="Phone no"
                  required
                  value={phone}
                  onChange={e=>setPhone(e.target.value)}
                  onBlur={phoneBlurHandler}
                />
                 <div className="invalid-feedback">
                    Please enter valid phone number!
                  </div>
              </div>
              <div className="input-group mb-4"   style={{ display: otpSent ? "block" : "none" }} >
                <i className="ci-locked position-absolute top-50 translate-middle-y text-muted fs-base ms-3"></i>
                <div className="password-toggle w-100" >
                  <input
                    className="form-control"
                    type="number"
                    placeholder="OTP"
                    required
                    value={otp}
                    onChange={e=>setOtp(e.target.value)}
                  />
                  <label
                    className="password-toggle-btn"
                    aria-label="Show/hide password"
                  >
                    <input className="password-toggle-check" type="checkbox" />
                    <span className="password-toggle-indicator"></span>
                  </label>
                </div>
              </div>
             
              <hr className="mt-4" />
              <div className="text-end pt-4"  >
              <button
                    className="btn btn-primary"
                    type="submit"style={{ display: !otpSent ? "block" : "none" }}
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
              <div className="text-end pt-4" style={{ display: otpSent ? "block" : "none" }}>
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
                        Login
                      </React.Fragment>
                    )}
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
