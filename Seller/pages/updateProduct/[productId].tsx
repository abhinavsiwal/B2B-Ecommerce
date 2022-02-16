import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "../../src/hooks/redux-hooks";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAlert } from "react-alert";

const UpdateProduct = () => {
  const dispatch = useAppDispatch();
  const alert = useAlert();
  const router = useRouter();
  const [productName, setProductName] = useState<string>("");
  const [fabric, setFabric] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [design, setDesign] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<any>(0);
  const [stock, setStock] = useState<any>(0);
  const [category, setCategory] = useState<string>("");
  const [idealFor, setIdealFor] = useState<string>("");
  const [oldImages, setOldImages] = useState<any>([])
  const [images, setImages] = useState<any>([]);
  const [imagesPreview, setImagesPreview] = useState<any>([]);
    const [proId, setProId] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { sellerToken } = useAppSelector((state) => state.sellerReducer);

  const categories = [
    "Shirt",
    "T Shirt",
    "Joggers",
    "Vests",
    "Knitwear",
    "Shorts",
    "Winterwear",
    "Sportswear",
  ];

  const idealCategories = ["Both", "Men", "Women"];

  let productId;

  useEffect(() => {
      productId = router.query.productId;
      getProudctById(productId)
  }, []);

  const getProudctById = async (productId: any) => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/product/${productId}`
      );
      console.log(data);
      setBrand(data.product.brand);
      setCategory(data.product.category);
      setColor(data.product.color);
      setDescription(data.product.description);
      setDesign(data.product.design);
      setFabric(data.product.fabric);
      setIdealFor(data.product.idealFor);
      setOldImages(data.product.images)
      setProductName(data.product.name);
      setPrice(data.product.price);
      setSize(data.product.size);
      setStock(data.product.stock);
      setProId(data.product._id);
        setLoading(false)
    } catch (err) {
        console.log(err);
        alert.error("Something went wrong.")
        setLoading(false);
    }
  };

  const imageChangeHandler = (e: any) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);
    setOldImages([]);

    files.forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldArray: any) => [...oldArray, reader.result]);
          setImages((oldArray: any) => [...oldArray, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const updateProductHandler = async (productId:any) => {
    let formData = new FormData();
    formData.set("name", productName);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("idealFor", idealFor);
    formData.set("stock", stock);
    formData.set("fabric", fabric);
    formData.set("color", color);
    formData.set("size", size);
    formData.set("design", design);
    formData.set("brand", brand);

    images.forEach((image: any) => {
      formData.append("images", image);
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sellerToken}`,
      },
    };

    // console.log(productData);
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/products/product/${proId}`,
        formData,
        config
      );

      console.log(data);

      alert.success(data.message);
      setLoading(false);
      router.push('/products')
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

  return (
    <section className="content-main" style={{ maxWidth: "1200px" }}>
      <div className="content-header">
        <h2 className="content-title">Update Product</h2>
        <div>
          <button className="btn btn-primary" onClick={updateProductHandler}>
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
              <React.Fragment>Update</React.Fragment>
            )}
          </button>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-xl-8 col-lg-8">
          <div className="card mb-4">
            <div className="card-body">
              <div className="mb-4">
                <label htmlFor="product_name" className="form-label">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Tshirt Two Way Lycra U Neck Dry Fit T-Shirt / Sports T-Shirt / Gym T-Shirt for Men Set Of 12"
                  className="form-control"
                  id="product_name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="row gx-3">
                <div className="col-md-4  mb-3">
                  <label htmlFor="product_fabric" className="form-label">
                    Fabric
                  </label>
                  <input
                    type="text"
                    placeholder="Two Way Lycra"
                    className="form-control"
                    id="product_fabric"
                    value={fabric}
                    onChange={(e) => setFabric(e.target.value)}
                  />
                </div>
                <div className="col-md-4  mb-3">
                  <label htmlFor="product_color" className="form-label">
                    Color
                  </label>
                  <input
                    type="text"
                    placeholder="Multi Color"
                    className="form-control"
                    id="product_color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
                <div className="col-md-4  mb-3">
                  <label htmlFor="product_size" className="form-label">
                    Size
                  </label>
                  <input
                    type="text"
                    placeholder="M,L,XL"
                    className="form-control"
                    id="product_size"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="product_design" className="form-label">
                  Clothing Design / Style
                </label>
                <input
                  type="text"
                  placeholder="Dry Fit T-Shirt / Sports T-Shirt / Gym T-Shirt"
                  className="form-control"
                  id="product_design"
                  value={design}
                  onChange={(e) => setDesign(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="product_brand" className="form-label">
                  Brand
                </label>
                <input
                  type="text"
                  placeholder="Nike"
                  className="form-control"
                  id="product_brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* <!-- card end// --> */}
          <div className="card mb-4">
            <div className="card-body">
              <div>
                <label className="form-label">Description</label>
                <textarea
                  placeholder="Description"
                  className="form-control"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          {/* <!-- card end// --> */}
          <div className="card mb-4">
            <div className="card-body">
              <div>
                <label className="form-label">Images</label>
                <input
                  className="form-control"
                  type="file"
                  onChange={imageChangeHandler}
                  multiple
                />
              </div>
              {oldImages &&
                  oldImages.map((img:any) => (
                    <img
                      src={img.url}
                      alt="preview"
                      className="mt-3 me-2"
                      width="55"
                      height="52"
                      key={img._id}
                    />
                  ))}
              {imagesPreview.map((img: any) => (
                <img
                  src={img}
                  key={img}
                  alt="Preview"
                  className="mt-3 me-2"
                  width="55"
                  height="52"
                />
              ))}
            </div>
          </div>
          {/* <!-- card end// --> */}
        </div>
        {/* <!-- col end// --> */}
        <aside className="col-xl-4 col-lg-4">
          <div className="card mb-4">
            <div className="card-body">
              <div className="mb-4">
                <label className="form-label">Price</label>
                <input
                  type="Number"
                  placeholder="₹"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Stock</label>
                <input
                  type="number"
                  placeholder="Stock of Item"
                  className="form-control"
                  value={stock}
                  onChange={(e) => setStock(Number(e.target.value))}
                />
              </div>

              <hr />
              <h5 className="mb-3">Categories</h5>
              <div className="mb-4">
                <label className="form-label">Ideal For</label>
                <select
                  className="form-select"
                  value={idealFor}
                  onChange={(e) => setIdealFor(e.target.value)}
                >
                  {idealCategories.map((category) => (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="form-label">Category</label>
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option value={category} key={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* <!-- card end// --> */}
        </aside>
        {/* <!-- col end// --> */}
      </div>
      {/* <!-- row end// --> */}
    </section>
  );
};

export default UpdateProduct;
