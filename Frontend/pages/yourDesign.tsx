import React, { useState } from "react";
import categories from "../src/utils/categories";
import { useAlert } from "react-alert";
import { useRouter } from "next/router";
import { sendRequest } from "../src/hooks/request";
import Spinner from "../src/components/Layout/Spinner";

const YourDesign = () => {
  const alert = useAlert();
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<any>([]);
  const [imagesPreview, setImagesPreview] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const imageChangeHandler = (e: any) => {
    const files = Array.from(e.target.files);
    setImagesPreview([]);
    setImages([]);

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

  const submitHandler = async (e:any) => {
    e.preventDefault();
    let formData = new FormData();
    formData.set("name", name);
    formData.set("description", description);
    images.forEach((image: any) => {
      formData.append("images", image);
    });

    try {
      setLoading(true);
      const { data } = await sendRequest(
        `${process.env.NEXT_PUBLIC_API_URL}/design/newDesign`,
        formData,
        "POST"
      );
      console.log(data);
      alert.success(data.message);
      setName("");
      setDescription("");
      setImagesPreview([]);
      setImages([]);
      setLoading(false);
      router.push("/");
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
    <React.Fragment>
      <div className="container mb-5 pb-3 mt-4">
        <div className="bg-light shadow-lg rounded-3 overflow-hidden">
          <div className="row justify-content-center">
            {/* <!-- Content--> */}
            {loading ? (
              <div className="spinner-container">
                <Spinner />
              </div>
            ) : (
              <section className="col-lg-8 pt-lg-4 pb-4 mb-3 ms-4 mt-4">
                <div className="pt-2 px-4 ps-lg-0 pe-xl-5">
                  {/* <!-- Title--> */}
                  <div className="d-sm-flex flex-wrap justify-content-between align-items-center pb-2">
                    <h2 className="h3 py-2 me-2 text-center text-sm-start">
                      Make your Design
                    </h2>
                    <div className="py-2">
                      <select
                        className="form-select me-2"
                        id="unp-category"
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Select Category</option>
                        {categories.map((category) => {
                          return (
                            <option key={category.name} value={category.name}>
                              {category.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <form>
                    <div className="mb-3 pb-2">
                      <label className="form-label" htmlFor="unp-product-name">
                        Product name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="unp-product-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <div className="form-text">
                        Maximum 100 characters. No HTML or emoji allowed.
                      </div>
                    </div>
                    <div className="file-drop-area mb-3">
                      <div className="file-drop-icon ci-cloud-upload"></div>
                      <span className="file-drop-message">
                        Drag and drop here to upload product screenshot
                      </span>
                      <input
                        className="file-drop-input"
                        type="file"
                        onChange={imageChangeHandler}
                        multiple
                      />
                      <div className="form-text">
                        1000 x 800px ideal size for hi-res displays
                      </div>
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
                      s
                    </div>
                    <div className="mb-3 py-2">
                      <label
                        className="form-label"
                        htmlFor="unp-product-description"
                      >
                        Product description
                      </label>
                      <textarea
                        className="form-control"
                        rows={6}
                        id="unp-product-description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>

                    <button
                      className="btn btn-primary d-block w-100"
                      onClick={submitHandler}
                    >
                      <i className="ci-cloud-upload fs-lg me-2"></i>Upload
                      Detail
                    </button>
                  </form>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default YourDesign;
