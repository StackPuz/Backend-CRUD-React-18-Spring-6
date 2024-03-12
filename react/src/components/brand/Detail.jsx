import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Service from './Service'
import Util from '../../util'

export default function BrandDetail(props) {
  
  const [ brand, setBrand ] = useState({})
  const [ brandProducts, setBrandProducts ] = useState([])
  
  useEffect(() => {
    get().finally(() => {
      Util.initView(true)
    })
  }, [ props.match.params.id ])
  
  function get() {
    return Service.get(props.match.params.id).then(response => {
      setBrand(response.data.brand)
      setBrandProducts(response.data.brandProducts)
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form method="post">
            <div className="row">
              <div className="form-group col-md-6 col-lg-4">
                <label htmlFor="brand_id">Id</label>
                <input readOnly id="brand_id" name="id" className="form-control form-control-sm" value={brand.id || '' } type="number" required />
              </div>
              <div className="form-group col-md-6 col-lg-4">
                <label htmlFor="brand_name">Name</label>
                <input readOnly id="brand_name" name="name" className="form-control form-control-sm" value={brand.name || '' } required maxLength="50" />
              </div>
              <div className="col-12">
                <h6>Brand's products</h6>
                <table className="table table-sm table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      <th>Product Price</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brandProducts.map((brandProduct, index) =>
                    <tr key={index}>
                      <td>{brandProduct.name}</td>
                      <td className="text-right">{brandProduct.price}</td>
                      <td className="text-center">
                        <Link className="btn btn-sm btn-secondary" to={`/product/${brandProduct.id}`} title="View"><i className="fa fa-eye"></i></Link>
                        <Link className="btn btn-sm btn-primary" to={`/product/edit/${brandProduct.id}`} title="Edit"><i className="fa fa-pencil"></i></Link>
                        <Link className="btn btn-sm btn-danger" to={`/product/delete/${brandProduct.id}`} title="Delete"><i className="fa fa-times"></i></Link>
                      </td>
                    </tr>
                    )}
                  </tbody>
                </table>
                <Link className="btn btn-sm btn-primary" to={`/product/create?product_brand_id=${brand.id}`}>Add</Link>
                <hr />
              </div>
              <div className="col-12">
                <Link className="btn btn-sm btn-secondary" to={Util.getRef('/brand')}>Back</Link>
                <Link className="btn btn-sm btn-primary" to={`/brand/edit/${brand.id}?ref=${encodeURIComponent(Util.getRef('/brand'))}`}>Edit</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}