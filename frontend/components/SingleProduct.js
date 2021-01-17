import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Rating from '@material-ui/lab/Rating'
import 'bulma'


const SingleProduct = (props) => {

  const [singleProduct, updateSingleProduct] = useState({})
  const [favourite, updateFavourite] = useState(true)
  const [review, updateReview] = useState('')
  const [reviewField, updateReviewField] = useState('none')
  const [customer, updateCustomer] = useState('')
  const [loading, updateLoading] = useState([])

  const token = localStorage.getItem('token')
  const userId = getUserId(token)
  const productId = props.match.params.id

  useEffect(() => {
    axios.get(`/api/products/${productId}`)
      .then(resp => {
        updateSingleProduct(resp.data)
        updateLoading(false)
      })
  }, [])

  useEffect(() => {
    axios.get(`/api/customers/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateCustomer(resp.data)
        for (let i = 0; i < resp.data.products.length; i++) {
          if (resp.data.products[i].id === parseInt(productId)) {
            updateFavourite('red')
          }
        }
      })
  }, [])

  function addToCart(id) {
    if (!localStorage.getItem('token')) {
      props.history.push('/login')
    }
    axios.put(`/api/products/${productId}/add-to-cart`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        return
      })
  }

  function handleReview(e) {
    const reviewData = e.target.value
    updateReviewField('')
    updateReview(reviewData)
  }

  function submitReview() {
    updateReviewField('none')
    axios.post(`/api/products/${productId}/reviews`, { content: review },
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(resp => {
        axios.get(`/api/products/${productId}`)
          .then(resp => {
            updateSingleProduct(resp.data)
          })
      })
  }

  function handleFavourite() {
    if (favourite === 'red') {
      return updateFavourite('')
    }
    axios.put(`/api/customers/${userId}`, { products: [{ id: productId }] }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    updateFavourite('red')
  }

  if (loading) return <h1>LOADING...</h1>

  return <section id="single-product" className="section single-product">
    <div className="container">
      <div id="product-information" className="columns">
        <div className="centered column is-flex is-justify-content-flex-end">
          <figure >
            <img className="is-rounded mr-6" src={singleProduct.image} alt="" />
          </figure>
        </div>
        <div className="column has-text-white mr-6">
          <h1 className="title is-4 has-text-white">{singleProduct.title}</h1>
          <div id="price-info" className="columns">
            <div className="column">
              <p className="price subtitle is-6 has-text-white">{singleProduct.symbol}{singleProduct.price.toFixed(2)}</p>
            </div>
            <div className="column">
              <p><Rating
                name="hover-feedback"
                value={singleProduct.rating}
                precision={0.5}
              />
              </p>
            </div>
            <div className="column">
              {userId && <FontAwesomeIcon onClick={handleFavourite} icon={faHeart} style={{ color: `${favourite}` }} />}
            </div>
          </div>
          <ol className="s-p-description">
            <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, est.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, voluptas?</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, nesciunt deserunt quas maiores laboriosam porro facere ratione possimus cupiditate minus quisquam ducimus quod assumenda, ab corporis numquam quam quibusdam rerum!</li>
          </ol>
          <div>
            <button value={singleProduct.id}
              onClick={event => addToCart(event.target.value)}
              className="button is-warning s-p-cart">Add to Cart
            </button>
            <a href="#reviews">
              <button className="button"
                onClick={handleReview}>
                Add Review
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="section">
      <div id="reviews" className="container">
        <div className="columns is-multiline is-mobile is-flex is-justify-content-space-around">
          {singleProduct.reviews && singleProduct.reviews.map((review, key) => {
            return <div key={key} className="column is-one-third-desktop is-hald-tablet is-half-mobile">
              <div className="card">
                <div className="card-content review-box">
                  <div className="media">
                    <div className="media-content">
                      <p>@{review.customer.username}</p>
                      <p>{review.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          })}
        </div>
      </div>
      <div id="new-review" className="container">
        <div className='field' style={{ display: reviewField }}>
          <label className="label">Review</label>
          <div className="control">
            <input type="text" placeholder="Write your review..." className="input"
              value={review}
              onChange={handleReview} />
          </div>
          <div className="control">
            <button className=" button is-dark"
              onClick={submitReview}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default SingleProduct