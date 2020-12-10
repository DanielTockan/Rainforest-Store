import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'
import { addToCart } from '../lib/addToCart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


const SingleProduct = (props) => {

  const [singleProduct, updateSingleProduct] = useState({})
  const [favourite, updateFavourite] = useState(true)
  const [review, updateReview] = useState('')
  const [reviewField, updateReviewField] = useState('none')
  const [customer, updateCustomer] = useState('')

  const token = localStorage.getItem('token')
  const userId = getUserId(token)
  const productId = props.match.params.id

  useEffect(() => {
    axios.get(`/api/products/${productId}`)
      .then(resp => {
        updateSingleProduct(resp.data)
      })
  }, [])

  useEffect(() => {
    axios.get(`/api/customers/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        updateCustomer(resp.data)
        for (let i = 0; i < resp.data.products.length; i++) {
          console.log(resp.data.products[0].id)
          console.log(parseInt(productId))
          if (resp.data.products[i].id === parseInt(productId)) {
            console.log('hello')
            updateFavourite('blue')
          }
        }
            // if(!resp.data.products) {
            //   return
            // } else {
            //   for (let i= 0; i < resp.data.products.length; i++) {
            //     if (resp.data.products[i].id === productId) {
            //       updateReview('blue')
            //     }
            //   }
            // }
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
    console.log(reviewData)
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
    if (favourite === 'blue') {
      return updateFavourite('')
    }
    axios.put(`/api/customers/${userId}`, { products: [{ id: productId }] }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    updateFavourite('blue')
  }

  return <section id="single-product" className="section">
    <div className="container">
      <div id="product-information" className="columns">
        <div className="centered column">
          <figure className="image">
            <img src={singleProduct.image} alt="" />
          </figure>
        </div>
        <div className="column">
          <h1 className="title is-4 ">{singleProduct.title}</h1>
          <div id="price-info" className="columns">
            <div className="column">
              <p className="price subtitle is-6">{singleProduct.symbol}{singleProduct.price}</p>
            </div>
            <div className="column">
              <p>{singleProduct.rating}</p>
            </div>
            <div className="column">
              {userId && <FontAwesomeIcon onClick={handleFavourite} icon={faHeart} style={{ color: `${favourite}` }} />}
            </div>
          </div>
          <ol>
            <li>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic, est.</li>
            <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, voluptas?</li>
            <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus, nesciunt deserunt quas maiores laboriosam porro facere ratione possimus cupiditate minus quisquam ducimus quod assumenda, ab corporis numquam quam quibusdam rerum!</li>
          </ol>
          <div>
            <button value={singleProduct.id}
              onClick={event => addToCart(event.target.value)}
              className="button is-warning">Add to Cart
            </button>
            <button className="button"
              onClick={handleReview}>
              Add Review
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="section" id="reviews">
      <div className="container">
        <div className="columns is-multiline is-mobile">
          {singleProduct.reviews && singleProduct.reviews.map((review, key) => {
            return <div key={key} className="column is-one-third-desktop is-hald-tablet is-half-mobile">
              <div className="card">
                <div className="card-content">
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
      <div className="container">
        <div className='field' style={{ display: reviewField }}>
          <label className="label">Review</label>
          <div className="control">
            <input type="text" placeholder="Write your review..." className="input"
              value={review}
              onChange={handleReview} />
          </div>
          <div className="control">
            <button className=" button is-primary"
              onClick={submitReview}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  </section>
}

export default SingleProduct