import React, { useState, useEffect, useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Products = () => {
  const [products, updateProduct] = useState([])
  const [addToCartButton, updateAddToCartButton] = useState(0)

  useEffect(() => {
    axios.get("/api/products")
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
      // }
      .then(resp => {
        updateProduct(resp.data)
      })
  }, [])

  function addToCart(id) {
    axios.put(`/api/products/${id}/add-to-cart`)
    .then(resp => {
      console.log(resp.data)
    })
  }

  return <div className="section">
    <div className="container">
      <div className="columns is-multiline is-mobile">
        {products.map((product, index) => {
          return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
            {/* <Link to={`/products/${product.id}`}> */}
              <div className="card">
                <div className="card-image">
                  <figure className="image is-4by3">
                    <img className="is-vcentered" src={product.image} alt={product.title} />
                  </figure>
                </div>
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
                      <button value={product.id}
                       onClick={event => addToCart(event.target.value)}
                       className="button is-primary">Add to Cart
                       </button>
                    </div>
                  </div>
                </div>
              </div>
            {/* </Link> */}
          </div>
        })}
      </div>
    </div>
  </div>
}

export default Products