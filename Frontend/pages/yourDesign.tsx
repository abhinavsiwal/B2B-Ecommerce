import React from "react";
import categories from "../src/utils/categories";

const YourDesign = () => {
  return (
    <React.Fragment>
      <div className="container mb-5 pb-3 mt-4">
        <div className="bg-light shadow-lg rounded-3 overflow-hidden">
          <div className="row justify-content-center">
            {/* <!-- Content--> */}
            <section className="col-lg-8 pt-lg-4 pb-4 mb-3 ms-4 mt-4">
              <div className="pt-2 px-4 ps-lg-0 pe-xl-5">
                {/* <!-- Title--> */}
                <div className="d-sm-flex flex-wrap justify-content-between align-items-center pb-2">
                  <h2 className="h3 py-2 me-2 text-center text-sm-start">
                    Make your Design
                  </h2>
                  <div className="py-2">
                    <select className="form-select me-2" id="unp-category">
                        <option value="">Select Category</option>
                        {categories.map(category=>{
                            return(
                                <option key={category.name} value={category.name} >{category.name}</option>

                            )
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
                    <input className="file-drop-input" type="file" />
                    <button
                      className="file-drop-btn btn btn-primary btn-sm mb-2"
                      type="button"
                    >
                      Or select file
                    </button>
                    <div className="form-text">
                      1000 x 800px ideal size for hi-res displays
                    </div>
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
                    ></textarea>
               
                  </div>
               
                  <button
                    className="btn btn-primary d-block w-100"
                    type="submit"
                  >
                    <i className="ci-cloud-upload fs-lg me-2"></i>Upload Detail
                  </button>
                </form>
              </div>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default YourDesign;
