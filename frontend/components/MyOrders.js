import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/auth'

const MyOrders = () => {

  const [formData, setFormData] = useState({})

  const token = localStorage.getItem('token')
  const userId = getUserId(token)

  useEffect(() => {
    axios.get(`/api/customers/${userId}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
      .then((resp) => {
        setFormData(resp.data)
      })
  }, [])

  console.log(token)
  console.log(formData)

  return <h1>My Orders Page</h1>
}

export default MyOrders