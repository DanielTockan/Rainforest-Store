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
    return <div id="empty-cart-page" className="section">
      <div class="card">
        <img class="card-img-top" src="https://www.clipartmax.com/png/middle/221-2218547_empty-shopping-cart-icon.png" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
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
                    onClick={handleRemoveItem(product.id)}>
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
      <h1 className="text-white font-weight-bold" >--   TOTAL ORDER    --</h1>
      <h1 className="text-success font-weight-bold sub-total">£{cart[0].total_amount.toFixed(2)}</h1>
      <button className="button is-dark top-space"
        onClick={handleFinalize}>
        Finalize Order
      </button>
    </div>
  </div>
}

export default MyCart

