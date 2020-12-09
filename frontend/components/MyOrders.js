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
    <div>{
      orderData.map((orderData, index) => (
        <div className="here" key={index}>
          <div>Order ID: {orderData.id}</div>
          <div>Order Status: {orderData.order_status}</div>
          <div>Order Amount: {orderData.total_amount}</div>
        </div>
      ))
    }</div>
  </div>
}

export default MyOrders