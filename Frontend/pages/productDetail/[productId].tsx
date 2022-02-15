import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAlert } from "react-alert";
import { useAppDispatch,useAppSelector } from "../../src/hooks/redux-hooks";
import Link from "next/link";
import Spinner from "../../src/components/Layout/Spinner";
import {addItemsToCart} from"../../src/store/Reducers/cart"

const ProductDetail = () => {
  const alert = useAlert();
  const router = useRouter();
  const [product, setProduct] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [productAvalability, setProductAvalability] = useState(true);
  const [qty, setQty] = useState(1);
  const dispatch = useAppDispatch();
  const {cartItems} = useAppSelector(state=>state.cartReducer);
  let productId;

  useEffect(() => {
    productId = router.query.productId;
    console.log(router.query); 
    
    console.log(productId);
    
    getProductById(productId);
    if (product.stock === 0) {
      setProductAvalability(false);
    } else {
      setProductAvalability(true);
    }
  }, []);


useEffect(() => {
  console.log(cartItems);  
  

}, [cartItems])


  const getProductById = async (productId: any) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/product/${productId}`
      );
      console.log(data);
      setProduct(data.product);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert.error("Something went wrong.");
      setLoading(false);
    }
  };

  const addItemsCart=(e:any)=>{
    e.preventDefault();
    interface itemState{
      id:string,
      name:string,
      price:number,
      image:string,
      stock:number,
      quantity:number,
      inStock:boolean,
      seller:string,
      product:string,

    }
    let item:itemState = {
      id:product._id,
      name:product.name,
      price:product.price,
      image:product.images[0].url,
      stock:product.stock,
      inStock:true,
      quantity:qty, 
      seller:product.seller,
      product:product._id,
    }
      
      
    dispatch(addItemsToCart(item))
  }

  return (
    <React.Fragment>
      {loading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <div className="container">
          {/* <!-- Gallery + details--> */}
          <div className="bg-light shadow-lg rounded-3 px-4 py-3 mb-5">
            <div className="px-lg-3">
              <div className="row">
                {/* <!-- Product gallery--> */}
                <div className="col-lg-7 pe-lg-0 pt-lg-4">
                  <div className="product-gallery">
                    <div className="product-gallery-preview order-sm-2">
                      <div
                        className="product-gallery-preview-item active"
                        id="first"
                      >
                        <img
                          className="image-zoom"
                          src={
                            product.images && product.images[0]
                              ? product.images[0].url
                              : ""
                          }
                          data-zoom="img/shop/single/gallery/01.jpg"
                          alt="Product image"
                        />
                        <div className="image-zoom-pane"></div>
                      </div>
                      <div className="product-gallery-preview-item" id="second">
                        <img
                          className="image-zoom"
                          src="img/shop/single/gallery/02.jpg"
                          data-zoom="img/shop/single/gallery/02.jpg"
                          alt="Product image"
                        />
                        <div className="image-zoom-pane"></div>
                      </div>
                      <div className="product-gallery-preview-item" id="third">
                        <img
                          className="image-zoom"
                          src="img/shop/single/gallery/03.jpg"
                          data-zoom="img/shop/single/gallery/03.jpg"
                          alt="Product image"
                        />
                        <div className="image-zoom-pane"></div>
                      </div>
                      <div className="product-gallery-preview-item" id="fourth">
                        <img
                          className="image-zoom"
                          src="img/shop/single/gallery/04.jpg"
                          data-zoom="img/shop/single/gallery/04.jpg"
                          alt="Product image"
                        />
                        <div className="image-zoom-pane"></div>
                      </div>{" "}
                      /
                    </div>
                    <div className="product-gallery-thumblist order-sm-1">
                      <a
                        className="product-gallery-thumblist-item active"
                        href="#first"
                      >
                        <img
                          src="img/shop/single/gallery/th01.jpg"
                          alt="Product thumb"
                        />
                      </a>
                      <a
                        className="product-gallery-thumblist-item"
                        href="#second"
                      >
                        <img
                          src="img/shop/single/gallery/th02.jpg"
                          alt="Product thumb"
                        />
                      </a>
                      <a
                        className="product-gallery-thumblist-item"
                        href="#third"
                      >
                        <img
                          src="img/shop/single/gallery/th03.jpg"
                          alt="Product thumb"
                        />
                      </a>
                      <a
                        className="product-gallery-thumblist-item"
                        href="#fourth"
                      >
                        <img
                          src="img/shop/single/gallery/th04.jpg"
                          alt="Product thumb"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                {/* <!-- Product details--> */}
                <div className="col-lg-5 pt-4 pt-lg-0">
                  <div className="product-details ms-auto pb-3">
                    {/* <div className="d-flex justify-content-between align-items-center mb-2">
                        <a href="#reviews" data-scroll>
                          <div className="star-rating">
                            <i className="star-rating-icon ci-star-filled active"></i>
                            <i className="star-rating-icon ci-star-filled active"></i>
                            <i className="star-rating-icon ci-star-filled active"></i>
                            <i className="star-rating-icon ci-star-filled active"></i>
                            <i className="star-rating-icon ci-star"></i>
                          </div>
                          <span className="d-inline-block fs-sm text-body align-middle mt-1 ms-1">
                            74 Reviews
                          </span>
                        </a>
                        <button
                          className="btn-wishlist me-0 me-lg-n3"
                          type="button"
                          data-bs-toggle="tooltip"
                          title="Add to wishlist"
                        >
                          <i className="ci-heart"></i>
                        </button>
                      </div> */}
                    <div className="mb-3">
                      <span className="h3 fw-normal text-accent me-1">
                        ₹{product.price}
                      </span>
                      <del className="text-muted fs-lg me-3">₹25</del>
                      <span className="badge bg-danger badge-shadow align-middle mt-n2">
                        Sale
                      </span>
                    </div>
                    <div className="fs-sm mb-4">
                      <span className="text-heading fw-medium me-1">
                        Color:
                      </span>
                      <span className="text-muted" id="colorOption">
                        {product.color}
                      </span>
                    </div>
                    <div className="position-relative me-n4 mb-3">
                      <div
                        className="product-badge product-available "
                        style={{
                          backgroundColor: productAvalability ? "" : "red",
                        }}
                      >
                        <i className="ci-security-check"></i>
                        {productAvalability
                          ? "Product Availabe"
                          : "Product Unavailable"}
                      </div>
                    </div>
                    <form className="mb-grid-gutter" method="post">
                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center pb-1">
                          <label className="form-label" htmlFor="product-size">
                            Size:
                          </label>
                          <a
                            className="nav-link-style fs-sm"
                            href="#size-chart"
                            data-bs-toggle="modal"
                          >
                            <i className="ci-ruler lead align-middle me-1 mt-n1"></i>
                          </a>
                        </div>
                        <select
                          className="form-select"
                          required
                          id="product-size"
                        >
                          <option value="">Select size</option>
                          <option value="xs">XS</option>
                          <option value="s">S</option>
                          <option value="m">M</option>
                          <option value="l">L</option>
                          <option value="xl">XL</option>
                        </select>
                      </div>
                      <div className="mb-3 d-flex align-items-center">
                        <select
                          className="form-select me-3"
                          style={{ width: "5rem" }}
                          onChange={e=>setQty(Number(e.target.value))}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        <button
                          className="btn btn-primary btn-shadow d-block w-100"
                          onClick={addItemsCart}
                        >
                          <i className="ci-cart fs-lg me-2"></i>Add to Cart
                        </button>
                      </div>
                    </form>
                    {/* <!-- Product panels--> */}
                    <div className="accordion mb-4" id="productPanels">
                      <div className="accordion-item">
                        <h3 className="accordion-header">
                          <a
                            className="accordion-button"
                            href="#productInfo"
                            role="button"
                            data-bs-toggle="collapse"
                            aria-expanded="true"
                            aria-controls="productInfo"
                          >
                            <i className="ci-announcement text-muted fs-lg align-middle mt-n1 me-2"></i>
                            Product info
                          </a>
                        </h3>
                        <div
                          className="accordion-collapse collapse show"
                          id="productInfo"
                          data-bs-parent="#productPanels"
                        >
                          <div className="accordion-body">
                            <h6 className="fs-sm mb-2">Fabric</h6>
                            <ul className="fs-sm ps-4">
                              <li>{product.fabric}</li>
                            </ul>
                            <h6 className="fs-sm mb-2">
                              Clothing Design/Style
                            </h6>
                            <ul className="fs-sm ps-4 mb-0">
                              <li>{product.design}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- Sharing--> */}
                    <label className="form-label d-inline-block align-middle my-2 me-3">
                      Share:
                    </label>
                    <a className="btn-share btn-twitter me-2 my-2" href="#">
                      <i className="ci-twitter"></i>Twitter
                    </a>
                    <a className="btn-share btn-instagram me-2 my-2" href="#">
                      <i className="ci-instagram"></i>Instagram
                    </a>
                    <a className="btn-share btn-facebook my-2" href="#">
                      <i className="ci-facebook"></i>Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Product description section 1--> */}
          <div className="row align-items-center py-md-3">
            <div className="col-lg-5 col-md-6 offset-lg-1 order-md-2">
              <img
                className="d-block rounded-3"
                src={
                  product.images && product.images[0]
                    ? product.images[0].url
                    : ""
                }
                alt="Image"
              />
            </div>
            <div className="col-lg-4 col-md-6 offset-lg-1 py-4 order-md-1">
              <h2 className="h3 mb-4 pb-2">{product.design}</h2>
              <h6 className="fs-base mb-3">{product.fabric}</h6>
              <p className="fs-sm text-muted pb-2">{product.description}</p>
              <h6 className="fs-base mb-3">Washing instructions</h6>
              <ul className="nav nav-tabs mb-3" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    href="#wash"
                    data-bs-toggle="tab"
                    role="tab"
                  >
                    <i className="ci-wash fs-xl"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#bleach"
                    data-bs-toggle="tab"
                    role="tab"
                  >
                    <i className="ci-bleach fs-xl"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#hand-wash"
                    data-bs-toggle="tab"
                    role="tab"
                  >
                    <i className="ci-hand-wash fs-xl"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#ironing"
                    data-bs-toggle="tab"
                    role="tab"
                  >
                    <i className="ci-ironing fs-xl"></i>
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#dry-clean"
                    data-bs-toggle="tab"
                    role="tab"
                  >
                    <i className="ci-dry-clean fs-xl"></i>
                  </a>
                </li>
              </ul>
              <div className="tab-content text-muted fs-sm">
                <div
                  className="tab-pane fade show active"
                  id="wash"
                  role="tabpanel"
                >
                  30° mild machine washing
                </div>
                <div className="tab-pane fade" id="bleach" role="tabpanel">
                  Do not use any bleach
                </div>
                <div className="tab-pane fade" id="hand-wash" role="tabpanel">
                  Hand wash normal (30°)
                </div>
                <div className="tab-pane fade" id="ironing" role="tabpanel">
                  Low temperature ironing
                </div>
                <div className="tab-pane fade" id="dry-clean" role="tabpanel">
                  Do not dry clean
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Product description section 2--> */}
        </div>
      )}
    </React.Fragment>
  );
};

export default ProductDetail;
