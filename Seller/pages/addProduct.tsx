import React from 'react'

const AddProduct = () => {
  return (
    <section className="content-main" style={{maxWidth:"1200px"}}>

    <div className="content-header">
        <h2 className="content-title">Add product</h2>
        <div>
            <a href="#" className="btn btn-light">Save to draft</a>
            <a href="#" className="btn btn-primary">Publish now</a>
        </div>
    </div>

    <div className="row mb-4">
        <div className="col-xl-8 col-lg-8">
            <div className="card mb-4">
                <div className="card-body">
                        <div className="mb-4">
                            <label htmlFor="product_title" className="form-label">Product title</label>
                            <input type="text" placeholder="Type here" className="form-control" id="product_title" />
                        </div>
                        <div className="row gx-3">
                            <div className="col-md-4  mb-3">
                                <label htmlFor="product_sku" className="form-label">SKU</label>
                                <input type="text" placeholder="Type here" className="form-control" id="product_sku" />
                            </div>
                            <div className="col-md-4  mb-3">
                                <label htmlFor="product_color" className="form-label">Color</label>
                                <input type="text" placeholder="Type here" className="form-control" id="product_color" />
                            </div>
                            <div className="col-md-4  mb-3">
                                <label htmlFor="product_size" className="form-label">Size</label>
                                <input type="text" placeholder="Type here" className="form-control" id="product_size" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="product_brand" className="form-label">Brand</label>
                            <input type="text" placeholder="Type here" className="form-control" id="product_brand" />
                        </div>
                </div>
            </div> 
            {/* <!-- card end// --> */}
            <div className="card mb-4">
                <div className="card-body">
                    <div>
                        <label className="form-label">Description</label>
                        <textarea placeholder="Type here" className="form-control" rows={4}></textarea>
                    </div>
                </div>
            </div> 
            {/* <!-- card end// --> */}
            <div className="card mb-4">
                <div className="card-body">
                    <div>
                        <label className="form-label">Images</label>
                        <input className="form-control" type="file" />
                    </div>
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
                            <input type="text" placeholder="Type here" className="form-control" />
                        </div>
                        <div className="mb-4">
                            <label className="form-label">Status</label>
                            <select className="form-select">
                                <option>Published</option>
                                <option>Draft</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="form-label">Tags</label>
                            <input type="text" placeholder="Type here" className="form-control" />
                        </div>

                        <a href="#" className="btn btn-sm btn-light mb-1">Woman 
                            <i className="material-icons md-close"></i></a>
                        <a href="#" className="btn btn-sm btn-light mb-1">Summer 
                            <i className="material-icons md-close"></i></a>
                        <a href="#" className="btn btn-sm btn-light mb-1">Clothes 
                            <i className="material-icons md-close"></i></a>
                        <hr />
                        <h5 className="mb-3">Categories</h5>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="product-cat" />
                            <label className="form-check-label" htmlFor="product-cat"> Shirt  </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="product-cat-1" />
                            <label className="form-check-label" htmlFor="product-cat-1">  T-Shirt </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="product-cat-2" />
                            <label className="form-check-label" htmlFor="product-cat-2"> Sneakers </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="product-cat-3" />
                            <label className="form-check-label" htmlFor="product-cat-3">  Joggers </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="product-cat-4" />
                            <label className="form-check-label" htmlFor="product-cat-4">  Vests </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="product-cat-5" />
                            <label className="form-check-label" htmlFor="product-cat-5"> Knitwear </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="product-cat-8" />
                            <label className="form-check-label" htmlFor="product-cat-8">  Shorts </label>
                        </div>
                </div>
            </div> 
            {/* <!-- card end// --> */}
        </aside>
         {/* <!-- col end// --> */}
    </div>
     {/* <!-- row end// --> */}


</section>
  )
}

export default AddProduct