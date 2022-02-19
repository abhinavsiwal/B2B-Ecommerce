import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Dropdown, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../src/hooks/redux-hooks";
import { setProducts } from "../src/store/Reducers/products";
import { useAlert } from "react-alert";
import { sendRequest } from "../src/hooks/request";
import getFormattedDate from "../src/utils/formattedDate";

const Products = () => {
  const alert = useAlert();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.productsReducer);
  const { sellerToken } = useAppSelector((state) => state.sellerReducer);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/products/seller`
      );
      console.log(data);
      console.log(data.products);

      dispatch(setProducts(data.products));
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const deleteProductHandler = async (productId: any) => {
    const config = {
      headers: {
        Authorization: `Bearer ${sellerToken}`,
      },
    };
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/products/product/${productId}`,
        config
      );
      console.log(data);
      if (data.success) {
        getProducts();
        alert.success(data.message);
      }
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      if (err.response.data.message) {
        alert.error(err.response.data.message);
      } else {
        alert.error("Something went wrong. Please try again");
      }
      setLoading(false);
    }
  };

  const updateProductHandler = (productId: any) => {
    router.push(`/updateProduct/${productId}`);
  };

  return (
    <React.Fragment>
      <section className="content-main">
        <div className="content-header">
          <h2 className="content-title">Products list </h2>
          <div>
            <a href="#" className="btn btn-primary">
              <i className="material-icons md-plus"></i> Create new
            </a>
          </div>
        </div>

        <div className="card mb-4">
          <header className="card-header">
            <div className="row align-items-center">
              <div className="col col-check flex-grow-0">
                <div className="form-check ms-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                  />
                </div>
              </div>
              <div className="col-md-3 col-12 me-auto mb-md-0 mb-3">
                <select className="form-select">
                  <option>All category</option>
                  <option>Electronics</option>
                  <option>Clothes</option>
                  <option>Automobile</option>
                </select>
              </div>
              <div className="col-md-2 col-6">
                <input type="date" className="form-control" />
              </div>
              <div className="col-md-2 col-6">
                <select className="form-select">
                  <option>Status</option>
                  <option>Active</option>
                  <option>Disabled</option>
                  <option>Show all</option>
                </select>
              </div>
            </div>
          </header>
          {/* <!-- card-header end// --> */}
          {loading ? (
            <Spinner
              animation="border"
              role="status"
              variant="info"
              style={{ marginTop: "2rem", margin: "auto" }}
            >
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            <div className="card-body">
              {products &&
                products.map((product: any) => {
                  let date = getFormattedDate(product.createdAt);

                  return (
                    <article className="itemlist" key={product._id}>
                      <div className="row align-items-center" key={product._id}>
                        <div className="col col-check flex-grow-0">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-4 col-8 flex-grow-1 col-name">
                          <a className="itemside" href="#">
                            <div className="left">
                              <img
                                src={
                                  product.images && product.images[0]
                                    ? product.images[0].url
                                    : ""
                                }
                                className="img-sm img-thumbnail"
                                alt="Item"
                              />
                            </div>
                            <div className="info">
                              <h6 className="mb-0">{product.name}</h6>
                            </div>
                          </a>
                        </div>
                        <div className="col-lg-2 col-sm-2 col-4 col-price">
                          {" "}
                          <span>₹{product.price}</span>{" "}
                        </div>
                        <div className="col-lg-2 col-sm-2 col-4 col-status">
                          <span className="badge rounded-pill alert-success">
                            {product.stock === 0 ? "Out of Stock" : "In Stock"}
                          </span>
                        </div>
                        <div className="col-lg-2 col-sm-2 col-4 col-date">
                          <span>{date}</span>
                        </div>
                        <div className="col-lg-1 col-sm-2 col-4 col-action">
                          <div className="dropdown float-end">
                            <Dropdown>
                              <Dropdown.Toggle
                                className="btn btn-light"
                                id="dropdown-basic"
                              >
                                <i className="material-icons md-more_horiz"></i>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu">
                                <Dropdown.Item
                                  href="#"
                                  className="dropdown-item"
                                >
                                  View Detail
                                </Dropdown.Item>
                                <Dropdown.Item
                                  className="dropdown-item"
                                  href="#"
                                  onClick={() =>
                                    updateProductHandler(product._id)
                                  }
                                >
                                  Edit info
                                </Dropdown.Item>
                                <Dropdown.Item
                                  href="#"
                                  className="dropdown-item"
                                  style={{ color: "red" }}
                                  onClick={() =>
                                    deleteProductHandler(product._id)
                                  }
                                >
                                  Delete
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>

                          {/* <!-- dropdown // --> */}
                        </div>
                      </div>
                      {/* <!-- row .// --> */}
                    </article>
                  );
                })}

              {/* <!-- itemlist  .// --> */}

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
          )}

          {/* <!-- card-body end// --> */}
        </div>

        {/* <!-- card end// --> */}
      </section>
    </React.Fragment>
  );
};

export default Products;
