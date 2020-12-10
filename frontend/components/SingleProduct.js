import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getUserId } from '../lib/auth'
import { addToCart } from '../lib/addToCart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


const SingleProduct = (props) => {

  const [singleProduct, updateSingleProduct] = useState({})
  const [favourite, updateFavourite] = useState(true)
  const [reviews, updateReviews] = useState({})

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
    axios.get(`/api/products/${productId}/reviews`)
    .then(resp => {
      updateReviews(resp.data)
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

  function handleComment() {
    updateText('')
    axios.post(`/api/events/${id}/comments`, { text }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(resp => {
        axios.get(`/api/events/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
          .then(resp => updateEvent(resp.data))
      })
  }

function handleFavourite() {
  if (favourite === 'blue') {
    return updateFavourite('')
  }
  updateFavourite('blue')
}

  return <section id="single-product" className="section">
    <div className="container">
      <div id="product-information" className="columns">
        <div className="column">
          <figure className="image">
            <img src={singleProduct.image} alt="" />
          </figure>
        </div>
        <div className="column is-centered">
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
          </div>
        </div>
      </div>
    </div>
    <div className="section" id="reviews">
      <div className="container">
        div.
        <div className="columns is-multiline is-mobile">

        </div>
      </div>
    </div>
  </section>
}

export default SingleProduct