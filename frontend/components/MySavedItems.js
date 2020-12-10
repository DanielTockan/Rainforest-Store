import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/auth'
import Rating from '@material-ui/lab/Rating'


const MySavedItems = () => {

  const [productData, setProductData] = useState([])

  const token = localStorage.getItem('token')
  const userId = getUserId(token)

  useEffect(() => {
    axios.get(`/api/customers/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((resp) => {
        setProductData(resp.data.products)
      })
  }, [])

  console.log(token)

  console.log(typeof (productData))
  console.log(productData)

  return <div>
    <section id="padding-top" className="list">
      <div className="list-container">
        <div>{
          productData.map((product, index) => (
            <div className="tracker" key={index}>
              <Link to={`/products/${product.id}`} ><div className="list-row" >
                <div className="product">
                  <div className="list-details">
                    <div className="volume-1 title-text"> <img src={product.image} alt="" /></div>
                  </div>
                  <div className="volume-2 title-text">{product.title}</div>
                  <div className="volume-3 category-text" >{product.category}</div>
                  <div className="list-text">{product.symbol} {product.price}</div>
                  <div className="list-text-2">{product.rating}</div>
                </div>
                <Rating
                  name="hover-feedback"
                  value={product.rating}
                  precision={0.5}
                />
              </div>
              </Link>
            </div>
          ))
        }</div>
      </div>
    </section>
  </div>
}

export default MySavedItems