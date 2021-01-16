import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'
import { Link } from 'react-router-dom'

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
    axios.delete(`/api/products/${id}/delete-from-cart`)
      .then
    location.reload()
  }

  function handleFinalize() {
    axios.put(`/api/orders/finalize-order`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        props.history.push('/')
      })
  }

  if ((!cart[0]) || (cart[0].total_amount.toFixed(2) < 1)) {
    return <div className="section empty-cart-page">
      <div className="card">
        <img className="card-img-top" src="https://imgur.com/TvRgXnw.png" alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">Your basket is empty</h5>
          <p className="card-text">It doesn't appear like you've bought anything. Let's change that!</p>
          <Link to={`/`}>
            <a href="#" className="btn btn-primary">Return to the store</a>
          </Link>
        </div>
      </div>
    </div>
  }

  return <div className="cart-items">
    <div className="list-container">
      <h1 className="text-warning font-weight-bold">Your Cart</h1>
      <div>{
        cart[0].products.map((product, index) => (
          <div className="tracker" key={index}>
            <div className="list-row" >
              <div className="product">
                <div className="list-details">
                  <div className="volume-1 title-text">
                    <Link to={`/products/${product.id}`}>
                      <img src={product.image} alt="" />
                    </Link>
                  </div>
                </div>
                <div className="volume-2 title-text">{product.title}</div>

                <div className="volume-3 category-text" >{product.category}</div>
                <div className="list-text">{product.symbol} {product.price.toFixed(2)}</div>
                <div className="column">
                  <button className="button is-warning"
                    onClick={() => handleRemoveItem(product.id)}>
                    Remove Item
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      }</div>
    </div>
    <div>
      <h2 className="text-white font-weight-bold" >--   TOTAL ORDER    --</h2>
      <h2 className="text-success font-weight-bold sub-total">£{cart[0].total_amount.toFixed(2)}</h2>
      <button className="button is-dark top-space"
        onClick={handleFinalize}>
        Finalize Order
      </button>
    </div>
  </div>
}

export default MyCart

