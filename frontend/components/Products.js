import React, { useState, useEffect, Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getUserId } from '../lib/auth'
import Rating from '@material-ui/lab/Rating'

const Products = (props) => {
  const [products, updateProduct] = useState([])
  const [cart, updateCart] = useState([])
  const [categories, updateCategories] = useState([])
  const [dropdownIsActive, setDropdownIsActive] = useState(false)
  const [search, updateSearch] = useState({
    'searchbar': '',
    'category': ''
  })


  const token = localStorage.getItem('token')
  const userId = getUserId(token)

  useEffect(() => {
    axios.get("/api/products")
      .then(resp => {
        updateProduct(resp.data)
        return resp.data
      })
      .then(resp => {
        filterCategories()
      })
  }, [])

  function addToCart(id) {
    if (!token) {
      props.history.push('/login')
    }
    axios.put(`/api/products/${id}/add-to-cart`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateCart(resp.data)
      })
    location.reload()
  }

  function filterCategories() {
    let newList = []
    for (let i = 0; i < products.length; i++) {
      newList.push(products[i].category)
    }
    const newSet = new Set(newList)
    newList = Array.from(newSet)
    updateCategories(newList)
  }

  function handleSearch(event) {
    const name = event.target.name
    const value = event.target.value

    let data = {
      ...search,
      [name]: value
    }
    updateSearch(data)
  }

  function filterProductsResults() {
    const filteredProducts = products.filter(product => {
      const title = product.title.toLowerCase()
      const filterText = search.searchbar.toLowerCase()
      return title.includes(filterText) &&
        (search.category === '' || product.category === search.category)
    })
    return filteredProducts
  }


  return <div className="products-page">

    <section id="searchbar">
      <div>
        <input type="text" placeholder="Search products..."
          name="searchbar"
          value={search.searchbar}
          onChange={handleSearch}
        />
      </div>
    </section>

    {filterProductsResults().map((product, index) => {
      return <div className="products-card" key={index}>

        <section>
          <div className="col-sm-4">
            <div className="card" id="card-spacing" >
              <Link to={`/products/${product.id}`} className="card-image">
                <img className="card-img-top" id="product-image" src={product.image} alt="Card image cap" />
              </Link>
              <div className="card-body">
                <h6 className="card-title">{product.title}</h6>
                <p className="card-text">{product.symbol}{product.price.toFixed(2)}</p>
                <p><Rating
                  name="hover-feedback"
                  value={product.rating}
                  precision={0.5}
                /></p>
                <button
                  value={product.id}
                  onClick={event => addToCart(event.target.value)}
                  className="btn btn-danger">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    })}
  </div>
}

export default Products