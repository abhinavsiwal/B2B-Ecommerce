import React, { useEffect, useState } from "react";
import Spinner from "../../src/components/Layout/Spinner";
import axios from "axios";
import { useRouter } from "next/router";
import { useAlert } from "react-alert";
import { useAppSelector, useAppDispatch } from "../../src/hooks/redux-hooks";
import { addItemsToCart } from "../../src/store/Reducers/cart";
import Link from "next/link";
const Category = () => {
  const router = useRouter();
  const alert = useAlert();
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  let category: any;
  useEffect(() => {
    category = router.query.category;
    getProducts(category);
  }, []);

  const getProducts = async (category: any) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/category/${category}`
      );
      console.log(data);
      setProducts(data.products);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert.error("Error Getting Products");
    }
  };

  const addToCart = (product: any) => {
    interface itemState {
      id: string;
      name: string;
      price: number;
      image: string;
      stock: number;
      quantity: number;
      inStock: boolean;
      seller: string;
      product: string;
    }
    let item: itemState = {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0].url,
      stock: product.stock,
      inStock: true,
      quantity: 1,
      seller: product.seller,
      product: product._id,
    };
    dispatch(addItemsToCart(item));
    alert.success(`${item.name} successfully added to cart`);
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
                  <a href="#">Shop</a>
                </li>
                <li
                  className="breadcrumb-item text-nowrap active"
                  aria-current="page"
                >
                  Category
                </li>
              </ol>
            </nav>
          </div>
          <div className="order-lg-1 pe-lg-4 text-center text-lg-start">
            <h1 className="h3 text-light mb-0">Category</h1>
          </div>
        </div>
      </div>
      <div className="container pb-5 mb-2 mb-md-4">
        <div className="d-flex justify-content-center justify-content-sm-between align-items-center pt-2 pb-4 pb-sm-5">
          <div className="d-flex flex-wrap">
            <div className="d-flex align-items-center flex-nowrap me-3 me-sm-4 pb-3">
              <label
                className="text-light opacity-75 text-nowrap fs-sm me-2 d-none d-sm-block"
                htmlFor="sorting"
              >
                Sort by:
              </label>
              <select className="form-select" id="sorting">
                <option>Popularity</option>
                <option>Low - Hight Price</option>
                <option>High - Low Price</option>
                <option>Average Rating</option>
                <option>A - Z Order</option>
                <option>Z - A Order</option>
              </select>
              <span className="fs-sm text-light opacity-75 text-nowrap ms-2 d-none d-md-block">
                of {products.length} products
              </span>
            </div>
          </div>
        </div>
        {/* <!-- Products grid--> */}
        <div className="row mx-n2">
          {/* <!-- Product--> */}
          {loading ? (
            <div className="spinner-container">
              <Spinner />
            </div>
          ) : (
            <React.Fragment>
              {products &&
                products.map((product: any) => {
                  return (
                    <div className="col-md-4 col-sm-6 px-2 mb-4">
                      <div className="card product-card">
                        <button
                          className="btn-wishlist btn-sm"
                          type="button"
                          data-bs-toggle="tooltip"
                          data-bs-placement="left"
                          title="Add to wishlist"
                        >
                          <i className="ci-heart"></i>
                        </button>
                        <Link href={`/productDetail/${product._id}`}>
                        <a
                          className="card-img-top d-block overflow-hidden"
                          href="shop-single-v1.html"
                          >
                          <img src={product.images[0].url} alt="Product" />
                        </a>
                          </Link>
                        <div className="card-body py-2">
                          <a
                            className="product-meta d-block fs-xs pb-1"
                            href="#"
                          >
                            {category}
                          </a>
                          <h3 className="product-title fs-sm">
                            <a href="shop-single-v1.html">{product.name}</a>
                          </h3>
                          <div className="d-flex justify-content-between">
                            <div className="product-price">
                              <span className="text-accent">
                                ₹{product.price}
                              </span>
                            </div>
                            <div className="star-rating">
                              <i className="star-rating-icon ci-star-filled active"></i>
                              <i className="star-rating-icon ci-star-filled active"></i>
                              <i className="star-rating-icon ci-star-filled active"></i>
                              <i className="star-rating-icon ci-star-filled active"></i>
                              <i className="star-rating-icon ci-star"></i>
                            </div>
                          </div>
                        </div>
                        <div className="card-body card-body-hidden">
                          <div className="text-center pb-2">
                            <div className="form-check form-option form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="size1"
                                id="s-75"
                              />
                              <label
                                className="form-option-label"
                                htmlFor="s-75"
                              >
                                {product.size}
                              </label>
                            </div>
                            <div className="form-check form-option form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="size1"
                                id="s-80"
                                
                              />
                              <label
                                className="form-option-label"
                                htmlFor="s-80"
                              >
                                8
                              </label>
                            </div>
                            <div className="form-check form-option form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="size1"
                                id="s-85"
                              />
                              <label
                                className="form-option-label"
                                htmlFor="s-85"
                              >
                                8.5
                              </label>
                            </div>
                            <div className="form-check form-option form-check-inline mb-2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="size1"
                                id="s-90"
                              />
                              <label
                                className="form-option-label"
                                htmlFor="s-90"
                              >
                                9
                              </label>
                            </div>
                          </div>
                          <button
                            className="btn btn-primary btn-sm d-block w-100 mb-2"
                            type="button"
                            onClick={()=>addToCart(product)}
                          >
                            <i className="ci-cart fs-sm me-1"></i>Add to Cart
                          </button>
                          <div className="text-center">
                          <Link href={`/productDetail/${product._id}`}>
                            <a
                              className="nav-link-style fs-ms"
                              href="#quick-view"
                              data-bs-toggle="modal"
                            >
                              <i className="ci-eye align-middle me-1"></i>Quick
                              view
                            </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <hr className="d-sm-none" />
                    </div>
                  );
                })}
            </React.Fragment>
          )}
        </div>
        <hr className="my-3" />
        {/* <!-- Pagination--> */}
        <nav
          className="d-flex justify-content-between pt-2"
          aria-label="Page navigation"
        >
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#">
                <i className="ci-arrow-left me-2"></i>Prev
              </a>
            </li>
          </ul>
          <ul className="pagination">
            <li className="page-item d-sm-none">
              <span className="page-link page-link-static">1 / 5</span>
            </li>
            <li
              className="page-item active d-none d-sm-block"
              aria-current="page"
            >
              <span className="page-link">
                1<span className="visually-hidden">(current)</span>
              </span>
            </li>
            <li className="page-item d-none d-sm-block">
              <a className="page-link" href="#">
                2
              </a>
            </li>
            <li className="page-item d-none d-sm-block">
              <a className="page-link" href="#">
                3
              </a>
            </li>
            <li className="page-item d-none d-sm-block">
              <a className="page-link" href="#">
                4
              </a>
            </li>
            <li className="page-item d-none d-sm-block">
              <a className="page-link" href="#">
                5
              </a>
            </li>
          </ul>
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                Next<i className="ci-arrow-right ms-2"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
};

export default Category;
