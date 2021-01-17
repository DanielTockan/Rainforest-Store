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

  return <div className="my-orders">
    <section className="list">
      <div className="list-container">
        <h1 className="text-warning">My order history</h1>
        <div>{
          orderData.map((orderData, index) => (
            <div className="tracker" key={index}>
              <Link to=""><div className="list-row" >
                <div className="order">
                  <div className="order-details">
                    <div className="volume-3 list-text" >Order ID: {orderData.id}</div>
                    <div className="volume-3 list-text" >Status: {orderData.order_status}</div>
                    <div className="list-text">Total amount: £ {orderData.total_amount.toFixed(2)}</div>
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