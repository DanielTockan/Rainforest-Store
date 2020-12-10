import React, { useState, useEffect, Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getUserId } from '../lib/auth'

const Products = (props) => {
  const [products, updateProduct] = useState([])
  const [cart, updateCart] = useState([])
  const [categories, updateCategories] = useState([])
  const [dropdownIsActive, setDropdownIsActive] = useState(false)
  const [search, updateSearch] = useState({
    'searchbar': '',
    'category': ''
  })

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

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

  // if(!products[0].image){
  //   return <h1>Loading</h1>
  // }

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  const carouselImages = [

  ]

  return <div id="products-page"className="section">
    <div id="carousel" className="section">
      {/* <div className="container">
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          // autoPlay={props.deviceType !== "mobile" ? true : false}
          autoPlaySpeed={500}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={1000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          deviceType={props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          <div>
            <p onClick={handleSearch}
          value="Amazon Devices & Accessories"
          name="category">Amazon Devices & Accessories</p>
          </div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
          {categories.map((content, index)=> {
            return <div key={index}>{content}</div>
          })}
        </Carousel>
      </div> */}
    </div>
    <div className="container">
      <div className="columns">
        <div className="column">
          <input type="text" placeholder="Search products..." className="input"
            name="searchbar"
            value={search.searchbar}
            onChange={handleSearch}
          />
        </div>

        <div className="column">
          <div className={`dropdown ${dropdownIsActive ? "is-active" : ""}`}>
            <div className="dropdown-trigger">
              <button className="button" aria-haspopup="true"
                onClick={() => {
                  filterCategories()
                  setDropdownIsActive(!dropdownIsActive)
                }}>
                <span>Categories</span>
              </button>
            </div>
            <div className="dropdown-menu" $ id="dropdown-menu" role="menu">
              <div className="dropdown-content pl-2">
                {categories.map((content, index) => {
                  return <div className="mt-1" key={index}>
                    <button
                      name="category"
                      value={content}
                      onClick={handleSearch}>

                    </button>
                  </div>
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="section">
      <div className="container">
        <div className="columns is-multiline is-mobile">
          {filterProductsResults().map((product, index) => {
            return <div key={index} className="column is-one-third-desktop is-half-tablet is-half-mobile">
              <div className="card">
                <Link to={`/products/${product.id}`} className="card-image">
                  <figure className="image is-4by3">
                    <img src={product.image} alt={product.title} />
                  </figure>
                </Link>
                <div className="card-content">
                  <div className="media">
                    <div className="media-content has-text-centered">
                      <p>{product.title}</p>
                      <p className="price">{product.symbol}{product.price}</p>
                      <p>{product.rating}</p>
                      <button value={product.id}
                        onClick={event => addToCart(event.target.value)}
                        className="button is-warning">Add to Cart
                       </button>
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