import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Service from './Service'
import Util from '../../util'

export default function OrderHeaderCreate(props) {
  
  const [ orderHeader, setOrderHeader ] = useState({customer:{}})
  const [ customers, setCustomers ] = useState([])
  const [ errors, setErrors ] = useState({})
  
  useEffect(() => {
    get().finally(() => {
      Util.initView(true)
    })
  }, [])
  
  function get() {
    return Service.create().then(response => {
      setCustomers(response.data.customers)
    })
  }

  function create(e) {
    e.preventDefault()
    Service.create(orderHeader).then(() => {
      props.history.push(Util.getRef('/orderHeader'))
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
    let data = { ...orderHeader }
    Util.setPropertyValue(data, e.target.name, e.target.value)
    setOrderHeader(data)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <form method="post" onSubmit={create}>
            <div className="row">
              <div className="form-group col-md-6 col-lg-4">
                <label htmlFor="order_header_customer_id">Customer</label>
                <select id="order_header_customer_id" name="customer.id" className="form-control form-control-sm" onChange={onChange} value={orderHeader.customer.id || '' } required>
                  <option></option>
                  {customers.map((customer, index) =>
                  <option key={index} value={customer.id}>{customer.name}</option>
                  )}
                </select>
                {errors.customer && <span className="text-danger">{errors.customer}</span>}
              </div>
              <div className="form-group col-md-6 col-lg-4">
                <label htmlFor="order_header_order_date">Order Date</label>
                <input id="order_header_order_date" name="orderDate" className="form-control form-control-sm" onChange={onChange} value={orderHeader.orderDate || '' } data-type="date" autoComplete="off" required />
                {errors.orderDate && <span className="text-danger">{errors.orderDate}</span>}
              </div>
              <div className="col-12">
                <Link className="btn btn-sm btn-secondary" to={Util.getRef('/orderHeader')}>Cancel</Link>
                <button className="btn btn-sm btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}