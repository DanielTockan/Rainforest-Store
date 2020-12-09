import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/auth'

const MySavedItems = () => {

  const [formData, setFormData] = useState({})
  const [productData, setProductData] = useState([])

  const token = localStorage.getItem('token')
  const userId = getUserId(token)

  useEffect(() => {
    axios.get(`/api/customers/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((resp) => {
        setProductData(resp.data.products)
        setFormData(resp.data)
      })
  }, [])

  console.log(token)

  console.log(typeof (productData))
  console.log(productData)

  return <div>
    <div>{
      productData.map((product, index) => (
        <div className="here" key={index}>
          <img src={product.image} />
          <div>1 {product.title}</div>
          <div>2 {product.category}</div>
          <div>3 {product.symbol} {product.price}</div>
          <div>4 {product.rating}</div>
        </div>
      ))
    }</div>
  </div>
}

export default MySavedItems



//   <div>
//     <section id="home-crypt" className="crypt">
//       <div id="home-container" className="container">
//         {formData.map((saved, index) => {
//           return <div id="home-" className="tracker" key={index}>
//             <div id="home-coin-row" className="coin-row">
//               <div className="coin">
//                 <img src={saved.image} alt="" id="home-symbol" className="symbol" />
//                 <h1 id="home-coin-name" className="coin-name">{saved.title}</h1>
//                 <p id="home-ticker" className="ticker">{saved.category}</p>
//               </div>
//               <div id="home-coin-details" className="coin-details">
//                 <p id="home-coin-price" className="coin-price">£{saved.symbol}</p>
//                 <p id="home-volume" className="volume">£{saved.price}</p>
//                 <p id="home-market-cap" className="market-cap">Mkt Cap: £{saved.rating}</p>
//               </div>
//             </div>
//           </div>
//         })}
//       </div>
//     </section>
//   </div>