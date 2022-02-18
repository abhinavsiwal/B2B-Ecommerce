import React, { useEffect, useState } from "react";
import { sendRequest } from "../../src/hooks/request";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import Link from "next/link";
const SellerDetails = () => {
  const router = useRouter();
  const alert = useAlert();
  const [seller, setSeller] = useState<any>({});

  let sellerId;

  useEffect(() => {
    sellerId = router.query.sellerId;
    getSeller(sellerId);
  }, [sellerId]);

  const getSeller = async (sellerId: any) => {
    try {
      const { data } = await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/seller/seller/${sellerId}`
      );
      console.log(data);
      setSeller(data.seller);
    } catch (err) {
      console.log(err);
      alert.error("Something went wrong");
    }
  };

  return (
    <section className="content-main">
      <div className="content-header">
        <Link href="/adminSellers" >
        <a href="javascript:history.back()" className="btn btn-light">
          <i className="material-icons md-arrow_back"></i> Go back
        </a>
        </Link>
      </div>

      <div className="card mb-4">
        <div
          className="card-header bg-warning"
          style={{ height: "150px" }}
        ></div>
        <div className="card-body">
          <div className="row">
            <div
              className="col-xl col-lg flex-grow-0"
              style={{ flexBasis: "230px" }}
            ></div>
            {/* <!--  col.// --> */}
            <div className="col-xl col-lg">
              <h3>{seller.name}</h3>
              <p>{seller.storeName}</p>
            </div>
            {/* <!--  col.// --> */}
            <div className="col-xl-4 text-md-end">
              <select className="form-select w-auto d-inline-block">
                <option>Actions</option>
                <option>Disable shop</option>
                <option>Analyze</option>
                <option>Something</option>
              </select>
              <a href="#" className="btn btn-outline-primary">
                {" "}
                View live <i className="material-icons md-launch"></i>{" "}
              </a>
            </div>
            {/* <!--  col.// --> */}
          </div>
          {/* <!-- card-body.// --> */}
          <hr className="my-4" />
          <div className="row g-4">
            <div className="col-md-12 col-lg-4 col-xl-2">
              <article className="box">
                <p className="mb-0 text-muted">Total sales:</p>
                <h5 className="text-success">238</h5>
                <p className="mb-0 text-muted">Revenue:</p>
                <h5 className="text-success mb-0">$2380</h5>
              </article>
            </div>
            {/* <!--  col.// --> */}
            <div className="col-sm-6 col-lg-4 col-xl-3">
              <h6>Contact</h6>
              <p>{seller.phone},</p>
            </div>
            {/* <!--  col.// --> */}
            <div className="col-sm-6 col-lg-4 col-xl-3">
              <h6>Address</h6>
              <p>
                Country: California <br />
                Address: Ranchview Dr. Richardson <br />
                Postal code: 62639
              </p>
            </div>
            {/* <!--  col.// --> */}

            {/* <!--  col.// --> */}
          </div>
          {/* <!--  row.// --> */}
        </div>
        {/* <!--  card-body.// --> */}
      </div>
      {/* <!--  card.// --> */}

      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Products by seller</h5>
          <div className="row">
            {seller.products &&
              seller.products.map((product: any) => {
                return (
                  <div className="col-xl-3 col-lg-4 col-md-6" key={seller._id} >
                    <div className="card card-product-grid">
                      <a href="#" className="img-wrap">
                        {" "}
                        <img src={product.images[0].url} alt="Product" />{" "}
                      </a>
                      <div className="info-wrap">
                        <a href="#" className="title">
                          {product.name}
                        </a>
                        <div className="price mt-1">₹{product.price}</div>
                        {/* <!-- price-wrap.// --> */}
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* <!-- card-product  end// --> */}
            {/* <!-- col.// --> */}
            {/* <!-- col.// --> */}
          </div>
          {/* <!-- row.// --> */}

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link" href="#">
                  Previous
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {/* <!--  card-body.// --> */}
      </div>
      {/* <!--  card.// --> */}
    </section>
  );
};

export default SellerDetails;
