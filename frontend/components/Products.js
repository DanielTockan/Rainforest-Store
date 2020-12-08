import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getUserId } from '../lib/auth'

const Products = () => {
  const [products, updateProduct] = useState([])
  const [cart, updateCart] = useState([])
  const [categorySearch, updateCategorySearch] = useState('')
  const [burgerIsActive, setBurgerIsActive] = useState(false)

  const token = localStorage.getItem('token')
  const userId = getUserId(token)

  useEffect(() => {
    axios.get("/api/products")
      .then(resp => {
        updateProduct(resp.data)
      })
  }, [])

  function addToCart(id) {
    axios.put(`/api/products/${id}/add-to-cart`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateCart(resp.data)
      })
  }

  function filterCategories() {
    const newList = []
    for (let i = 0; i < products.length; i++) {
      newList.push(products[i].category)
    }
    const newSet = new Set(newList)
    return Array.from(newSet)
  }

  return <div className="section">
    <nav className='navbar ml-5 is-transparent padding' role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a onClick={() => {
          setBurgerIsActive(!burgerIsActive)
        }}
          role="button"
          className={`navbar-burger burger ${burgerIsActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="burgerNav"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="burgerNav" className={`navbar-menu ${burgerIsActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          <div className="columns is-multiline is-mobile">
            {filterCategories().map((category, index) => {
              return <div key={index} className="column is-multiline is-one-eigth-desktop">
                <div className="card">
                  <div className="card-content has-text-centered is-centered">
                    <p>{category}</p>
                  </div>
                </div>
              </div>
              })}
          </div>
        </div>
      </div>
    </nav>
    <div className="section">
      <div className="container">
        <div className="columns is-multiline is-mobile">
          {products.map((product, index) => {
            return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
              <div className="card">
                <Link to={`/products/${product.id}`} className="card-image">
                  <figure className="image is-4by3">
                    <img className="is-vcentered" src={product.image} alt={product.title} />
                  </figure>
                </Link>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content has-text-centered">
                      <p>{product.title}</p>
                      <div className="columns mt-2">
                        <div className="column">
                          <p>{product.symbol}{product.price}</p>
                        </div>
                        <div className="column">
                          <p>{product.rating}</p>
                        </div>
                      </div>
                      {userId && <button value={product.id}
                        onClick={event => addToCart(event.target.value)}
                        className="button is-primary">Add to Cart
                       </button>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>

  </div>
}

export default Products