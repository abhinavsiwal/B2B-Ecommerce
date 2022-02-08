import React from "react";

const Login = () => {
  return (
    <React.Fragment>
      <div className="authContainer"> 
        <div className="card border-0 shadow">
          <div className="card-body">
            <h2 className="h4 mb-4">Sign in</h2>
            
            <form className="needs-validation" noValidate>
              <div className="input-group mb-4">
                <i className="ci-phone position-absolute top-50 translate-middle-y text-muted fs-base ms-3"></i>
                <input
                  className="form-control rounded-start"
                  type="number"
                  placeholder="Phone no"
                  required
                />
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
