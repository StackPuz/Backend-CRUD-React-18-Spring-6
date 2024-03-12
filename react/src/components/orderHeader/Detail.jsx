import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Service from './Service'
import Util from '../../util'

export default function OrderHeaderDetail(props) {
  
  const [ orderHeader, setOrderHeader ] = useState({})
  const [ orderHeaderOrderDetails, setOrderHeaderOrderDetails ] = useState([])
  
  useEffect(() => {
    get().finally(() => {
      Util.initView(true)
    })
  }, [ props.match.params.id ])
  
  function get() {
    return Service.get(props.match.params.id).then(response => {
      setOrderHeader(response.data.orderHeader)
      setOrderHeaderOrderDetails(response.data.orderHeaderOrderDetails)
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form method="post">
            <div className="row">
              <div className="form-group col-md-6 col-lg-4">
                <label htmlFor="order_header_id">Id</label>
                <input readOnly id="order_header_id" name="id" className="form-control form-control-sm" value={orderHeader.id || '' } type="number" required />
              </div>
              <div className="form-group col-md-6 col-lg-4">
                <label htmlFor="customer_name">Customer</label>
                <input readOnly id="customer_name" name="customer_name" className="form-control form-control-sm" value={(orderHeader.customer && orderHeader.customer.name) || '' } maxLength="50" />
              </div>
              <div className="form-group col-md-6 col-lg-4">
                <label htmlFor="order_header_order_date">Order Date</label>
                <input readOnly id="order_header_order_date" name="orderDate" className="form-control form-control-sm" value={orderHeader.orderDate || '' } data-type="date" autoComplete="off" required />
              </div>
              <div className="col-12">
                <table className="table table-sm table-striped table-hover">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderHeaderOrderDetails.map((orderHeaderOrderDetail, index) =>
                    <tr key={index}>
                      <td className="text-center">{orderHeaderOrderDetail.id && orderHeaderOrderDetail.id.no}</td>
                      <td>{orderHeaderOrderDetail.product && orderHeaderOrderDetail.product.name}</td>
                      <td className="text-right">{orderHeaderOrderDetail.qty}</td>
                      <td className="text-center">
                        <Link className="btn btn-sm btn-primary" to={`/orderDetail/edit/${orderHeaderOrderDetail.id.orderId}/${orderHeaderOrderDetail.id.no}`} title="Edit"><i className="fa fa-pencil"></i></Link>
                        <Link className="btn btn-sm btn-danger" to={`/orderDetail/delete/${orderHeaderOrderDetail.id.orderId}/${orderHeaderOrderDetail.id.no}`} title="Delete"><i className="fa fa-times"></i></Link>
                      </td>
                    </tr>
                    )}
                  </tbody>
                </table>
                <Link className="btn btn-sm btn-primary" to={`/orderDetail/create?order_detail_order_id=${orderHeader.id}`}>Add</Link>
                <hr />
              </div>
              <div className="col-12">
                <Link className="btn btn-sm btn-secondary" to={Util.getRef('/orderHeader')}>Back</Link>
                <Link className="btn btn-sm btn-primary" to={`/orderHeader/edit/${orderHeader.id}?ref=${encodeURIComponent(Util.getRef('/orderHeader'))}`}>Edit</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}