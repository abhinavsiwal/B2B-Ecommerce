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
              <div className="input-group mb-4">
                <i className="ci-locked position-absolute top-50 translate-middle-y text-muted fs-base ms-3"></i>
                <div className="password-toggle w-100">
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    required
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
              <div className="text-end pt-4">
                <button className="btn btn-primary" type="submit">
                  <i className="ci-sign-in me-2 ms-n21"></i>Sign In
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
