import React, { useState } from "react";

const Signup = () => {
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [shopName, setShopName] = useState<string>("");
  const [referralCode, setReferralCode] = useState<string>("");
  const [phone, setPhone] = useState<any>();
  const [phoneError, setPhoneError] = useState<boolean>(false);

  const phoneBlurHandler = () => {
    console.log("here");
    let regex = /^[5-9]{2}[0-9]{8}$/;
    if (regex.test(phone)) {
      setPhoneError(false);
      console.log("true");
    } else {
      setPhoneError(true);
      console.log("false");
    }
  };

  const nameBlurHandler = () => {
    if (name.trim().length === 0) {
      setNameError(true);
    } else {
      setNameError(false);
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
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Please enter your Shop name!
                  </div>
                </div>

                <div className="col-sm-6">
                  <label className="form-label" htmlFor="referralCode">
                    referral Code
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={phoneBlurHandler}
                  />
                  <div className="invalid-feedback">
                    Please enter valid phone number!
                  </div>
                </div>

                <div className="col-sm-6">
                  <label className="form-label" htmlFor="reg-password-confirm">
                    Confirm Password
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    required
                    id="reg-password-confirm"
                  />
                  <div className="invalid-feedback">
                    Passwords do not match!
                  </div>
                </div>
                <div className="col-12 text-end">
                  <button className="btn btn-primary" type="submit">
                    <i className="ci-user me-2 ms-n1"></i>Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signup;
