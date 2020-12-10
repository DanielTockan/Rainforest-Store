import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/auth'

const MyOrders = () => {

  const [orderData, setOrderData] = useState([])

  const token = localStorage.getItem('token')
  const userId = getUserId(token)

  useEffect(() => {
    axios.get(`/api/customers/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((resp) => {
        setOrderData(resp.data.orders)
      })
  }, [])

  console.log(token)

  console.log(typeof (orderData))
  console.log(orderData)

  return <div>
    <section className="list">
      <div className="list-container">
        <div>{
          orderData.map((orderData, index) => (
            <div className="tracker" key={index}>
              <Link to={`/products/${orderData.id}`}><div className="list-row" >
                <div className="order">
                  <div className="order-details">
                    <div className="volume-3 list-text" >Order ID: {orderData.id}</div>
                    <div className="volume-3 list-text" >Status: {orderData.order_status}</div>
                    <div className="list-price list-text">£ {orderData.total_amount}</div>
                  </div>
                </div>
              </div></Link>
            </div>
          ))
        }</div>
      </div>
    </section>
  </div >
}

export default MyOrders