import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Service from './Service'
import Util from '../../util'

export default function OrderDetailCreate(props) {
  
  const [ orderDetail, setOrderDetail ] = useState({product:{},id:{}})
  const [ products, setProducts ] = useState([])
  const [ errors, setErrors ] = useState({})
  
  useEffect(() => {
    get().finally(() => {
      Util.initView(true)
    })
  }, [])
  
  function get() {
    return Service.create().then(response => {
      setProducts(response.data.products)
    })
  }

  function create(e) {
    e.preventDefault()
    Service.create(orderDetail).then(() => {
      props.history.push(Util.getRef('/orderDetail'))
    }).catch((e) => {
      if (e.response.data.errors) {
        setErrors(e.response.data.errors)
      }
      else {
        alert(e.response.data.message)
      }
    })
  }

  function onChange(e) {
    let data = { ...orderDetail }
    Util.setPropertyValue(data, e.target.name, e.target.value)
    setOrderDetail(data)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form method="post" onSubmit={create}>
            <div className="row">
              <div className="form-group col-md-6 col-lg-4">
                <label htmlFor="order_detail_order_id">Order Id</label>
                <input id="order_detail_order_id" name="id.orderId" className="form-control form-control-sm" onChange={onChange} value={orderDetail.id.orderId || '' } type="number" required />
                {errors.id && <span className="text-danger">{errors.id}</span>}
              </div>
              <div className="form-group col-md-6 col-lg-4">
                <label htmlFor="order_detail_no">No</label>
                <input id="order_detail_no" name="id.no" className="form-control form-control-sm" onChange={onChange} value={orderDetail.id.no || '' } type="number" required />
                {errors.id && <span className="text-danger">{errors.id}</span>}
              </div>
              <div className="form-group col-md-6 col-lg-4">
                <label htmlFor="order_detail_product_id">Product</label>
                <select id="order_detail_product_id" name="product.id" className="form-control form-control-sm" onChange={onChange} value={orderDetail.product.id || '' } required>
                  <option></option>
                  {products.map((product, index) =>
                  <option key={index} value={product.id}>{product.name}</option>
                  )}
                </select>
                {errors.product && <span className="text-danger">{errors.product}</span>}
              </div>
              <div className="form-group col-md-6 col-lg-4">
                <label htmlFor="order_detail_qty">Qty</label>
                <input id="order_detail_qty" name="qty" className="form-control form-control-sm" onChange={onChange} value={orderDetail.qty || '' } type="number" required />
                {errors.qty && <span className="text-danger">{errors.qty}</span>}
              </div>
              <div className="col-12">
                <Link className="btn btn-sm btn-secondary" to={Util.getRef('/orderDetail')}>Cancel</Link>
                <button className="btn btn-sm btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}