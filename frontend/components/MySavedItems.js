import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/auth'

const MySavedItems = () => {

  const [formData, setFormData] = useState({})
  const [productData, setProductData] = useState([])

  const token = localStorage.getItem('token')
  const userId = getUserId(token)

  useEffect(() => {
    axios.get(`/api/customers/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((resp) => {
        setProductData(resp.data.products)
        setFormData(resp.data)
      })
  }, [])

  console.log(token)

  console.log(typeof (productData))
  console.log(productData)

  return <div>
    <div>{
      productData.map((product, index) => (
        <div className="here" key={index}>
          <img src={product.image} />
          <div>1 {product.title}</div>
          <div>2 {product.category}</div>
          <div>3 {product.symbol} {product.price}</div>
          <div>4 {product.rating}</div>
        </div>
      ))
    }</div>
  </div>
}

export default MySavedItems