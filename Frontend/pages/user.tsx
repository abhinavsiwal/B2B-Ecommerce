import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { sendRequestWithJson } from "../src/hooks/request";
import { useAppDispatch, useAppSelector } from "../src/hooks/redux-hooks";
import { setUserDetails,setToken,setIsLoggedIn } from "../src/store/Reducers/user";
import { useRouter } from "next/router";
import Link from "next/link";

const User = () => {
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { userDetails, token } = useAppSelector((state) => state.userReducer);
  const { orders } = useAppSelector((state) => state.ordersReducer);

  const [name, setName] = useState<any>(userDetails.name);

  useEffect(() => {
    if (!token) {
      router.push("/login");
      alert.info("Login first");
    }
  }, []);

  const updateHandler = async () => {
    console.log("Inside");

    try {
      let updateData = {
        name: name,
      };

      const { data } = await sendRequestWithJson(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update`,
        updateData,
        "PUT"
      );
      console.log(data);
      dispatch(setUserDetails(data.user));
      alert.success(data.message);
      router.push("/");
    } catch (err: any) {
      console.log(err);
      alert.error("Something went wrong");
    }
  };

  const logoutHandler = () => {
    dispatch(setUserDetails({}));
    dispatch(setToken(""));
    dispatch(setIsLoggedIn(false));
    router.push("/");
  };

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
                  <a href="#">Account</a>
                </li>
                <li
                  className="breadcrumb-item text-nowrap active"
                  aria-current="page"
                >
                  Profile info
                </li>
              </ol>
            </nav>
          </div>
          <div className="order-lg-1 pe-lg-4 text-center text-lg-start">
            <h1 className="h3 text-light mb-0">Profile info</h1>
          </div>
        </div>
      </div>
      <div className="container pb-5 mb-2 mb-md-4">
        <div className="row">
          {/* <!-- Sidebar--> */}
          <aside className="col-lg-4 pt-4 pt-lg-0 pe-xl-5">
            <div className="bg-white rounded-3 shadow-lg pt-1 mb-5 mb-lg-0">
              <div className="d-md-flex justify-content-between align-items-center text-center text-md-start p-4">
                <div className="d-md-flex align-items-center">
                  <div className="ps-md-3">
                    <h3 className="fs-base mb-0">{userDetails.name}</h3>
                    <span className="text-accent fs-sm">
                      {userDetails.phone}
                    </span>
                  </div>
                </div>
                <a
                  className="btn btn-primary d-lg-none mb-2 mt-3 mt-md-0"
                  href="#account-menu"
                  data-bs-toggle="collapse"
                  aria-expanded="false"
                >
                  <i className="ci-menu me-2"></i>Account menu
                </a>
              </div>
              <div className="d-lg-block collapse" id="account-menu">
                <div className="bg-secondary px-4 py-3">
                  <h3 className="fs-sm mb-0 text-muted">Dashboard</h3>
                </div>
                <ul className="list-unstyled mb-0">
                  <li className="border-bottom mb-0">
                    <Link href="/orders">
                    <a
                      className="nav-link-style d-flex align-items-center px-4 py-3"
                      href="account-orders.html"
                    >
                      <i className="ci-bag opacity-60 me-2"></i>Orders
                      <span className="fs-sm text-muted ms-auto">
                        {orders.length}
                      </span>
                    </a>
                      </Link>
                  </li>
                  <li className="border-bottom mb-0">
                    <a
                      className="nav-link-style d-flex align-items-center px-4 py-3"
                      href="account-wishlist.html"
                    >
                      <i className="ci-heart opacity-60 me-2"></i>Wishlist
                      <span className="fs-sm text-muted ms-auto">3</span>
                    </a>
                  </li>
                  <li className="mb-0">
                    <a
                      className="nav-link-style d-flex align-items-center px-4 py-3"
                      href="account-tickets.html"
                    >
                      <i className="ci-help opacity-60 me-2"></i>Support tickets
                      <span className="fs-sm text-muted ms-auto">1</span>
                    </a>
                  </li>
                </ul>
                <div className="bg-secondary px-4 py-3">
                  <h3 className="fs-sm mb-0 text-muted">Account settings</h3>
                </div>
                <ul className="list-unstyled mb-0">
                  <li className="border-bottom mb-0">
                    <a
                      className="nav-link-style d-flex align-items-center px-4 py-3 active"
                      href="account-profile.html"
                    >
                      <i className="ci-user opacity-60 me-2"></i>Profile info
                    </a>
                  </li>
                  <li className="border-bottom mb-0">
                    <a
                      className="nav-link-style d-flex align-items-center px-4 py-3"
                      href="account-address.html"
                    >
                      <i className="ci-location opacity-60 me-2"></i>Addresses
                    </a>
                  </li>
                  <li className="mb-0">
                    <a
                      className="nav-link-style d-flex align-items-center px-4 py-3"
                      href="account-payment.html"
                    >
                      <i className="ci-card opacity-60 me-2"></i>Payment methods
                    </a>
                  </li>
                  <li className="d-lg-none border-top mb-0">
                    <a
                      className="nav-link-style d-flex align-items-center px-4 py-3"
                      href="#"
                      onClick={logoutHandler}
                    >
                      <i className="ci-sign-out opacity-60 me-2"></i>Sign out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
          {/* <!-- Content  --> */}
          <section className="col-lg-8">
            {/* <!-- Toolbar--> */}
            <div className="d-none d-lg-flex justify-content-between align-items-center pt-lg-3 pb-4 pb-lg-5 mb-lg-3">
              <h6 className="fs-base text-light mb-0">
                Update you profile details below:
              </h6>
              <a
                className="btn btn-primary btn-sm"
                href="#"
                onClick={logoutHandler}
              >
                <i className="ci-sign-out me-2"></i>Sign out
              </a>
            </div>
            {/* <!-- Profile form--> */}
            <form>
              <div className="row gx-4 gy-3">
                <div className="col-sm-6">
                  <label className="form-label" htmlFor="account-fn">
                    {" "}
                    Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="account-fn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="col-sm-6">
                  <label className="form-label" htmlFor="account-phone">
                    Phone Number
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="account-phone"
                    value={userDetails.phone}
                    required
                    disabled
                  />
                </div>

                <div className="col-12">
                  <hr className="mt-2 mb-3" />
                  <div className="d-flex flex-wrap justify-content-between align-items-center">
                    <button
                      className="btn btn-primary mt-3 mt-sm-0"
                      type="button"
                      onClick={updateHandler}
                    >
                      Update profile
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </React.Fragment>
  );
};

export default User;
