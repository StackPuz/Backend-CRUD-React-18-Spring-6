import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Service from './Service'
import Util from '../../util'

export default function OrderDetailDelete(props) {
  
  const [ orderDetail, setOrderDetail ] = useState({id:{}})
  
  useEffect(() => {
    get().finally(() => {
      Util.initView(true)
    })
  }, [ props.match.params.orderId, props.match.params.no ])
  
  function get() {
    return Service.delete(props.match.params.orderId, props.match.params.no).then(response => {
      setOrderDetail(response.data.orderDetail)
    })
  }

  function remove(e) {
    e.preventDefault()
    Service.delete(props.match.params.orderId, props.match.params.no, orderDetail).then(() => {
      props.history.push(Util.getRef('/orderDetail'))
    }).catch((e) => {
      alert(e.response.data.message)
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form method="post" onSubmit={remove}>
            <div className="row">
              <div className="form-group col-md-6 col-lg-4">
                <label htmlFor="order_detail_order_id">Order Id</label>
                <input readOnly id="order_detail_order_id" name="id.orderId" className="form-control form-control-sm" value={(orderDetail.id && orderDetail.id.orderId) || '' } type="number" required />
              </div>
              <div className="form-group col-md-6 col-lg-4">
                <label htmlFor="order_detail_no">No</label>
                <input readOnly id="order_detail_no" name="id.no" className="form-control form-control-sm" value={(orderDetail.id && orderDetail.id.no) || '' } type="number" required />
              </div>
              <div className="form-group col-md-6 col-lg-4">
                <label htmlFor="product_name">Product</label>
                <input readOnly id="product_name" name="product_name" className="form-control form-control-sm" value={(orderDetail.product && orderDetail.product.name) || '' } maxLength="50" />
              </div>
              <div className="form-group col-md-6 col-lg-4">
                <label htmlFor="order_detail_qty">Qty</label>
                <input readOnly id="order_detail_qty" name="qty" className="form-control form-control-sm" value={orderDetail.qty || '' } type="number" required />
              </div>
              <div className="col-12">
                <Link className="btn btn-sm btn-secondary" to={Util.getRef('/orderDetail')}>Cancel</Link>
                <button className="btn btn-sm btn-danger">Delete</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}