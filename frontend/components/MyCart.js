import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'

const MyCart = (props) => {


  const [cart, updateCart] = useState([])
  const token = localStorage.getItem('token')
  const userId = getUserId(token)

  useEffect(() => {
    axios.get(`/api/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        const filterOrders = resp.data.filter(order => {
          return order.current_order === true
        })
        updateCart(filterOrders)
      })
  }, [])

  function handleRemoveItem(id) {
    console.log(id)
    axios.delete(`/api/${id}/delete-from-cart`)
      .then(resp => {
        axios.get(`/api/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(resp => {
            updateCart(resp.data[0])
          })
      })
  }

  function handleFinalize() {
    axios.put(`/api/orders/finalize-order`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        props.history.push('/')
      })
  }

  if (!cart[0]) {
    return <h1>No open cart</h1>
  }

  return <div className="section">
    <div className="container">
      <div className="columns is-multiline is-mobile">
        <div className="column is-one-fifth">
          Order Number: {cart.id}
        </div>
        <div className="column is-two-fifths">
          {cart[0].products.map((product, index) => {
            return <div key={index}>
              <div className="columns">
                <div className="column">
                  <p>{product.title}</p>
                </div>
                <div className="column">
                  <button className="button is-warning"
                    onClick={handleRemoveItem(product.id)}>
                    Remove Item
              </button>
                </div>
              </div>
            </div>
          })}
        </div>
        <div className="column">
          <p>£{cart[0].total_amount}</p>
        </div>
        <div className="column">
          <button className="button is-primary"
            onClick={handleFinalize}>
            Finalize Order
          </button>
        </div>
      </div>
    </div>
  </div>
}

export default MyCart