import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/auth'

const MySavedItems = () => {

  const [formData, setFormData] = useState({})

  const token = localStorage.getItem('token')
  const userId = getUserId(token)

  useEffect(() => {
    axios.get(`/api/customers/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((resp) => {
        setFormData(resp.data.products)
      })
  }, [])

  console.log(token)
  console.log(formData)

  return <h1>Hi</h1>

  // return <div>
  //   <section id="home-crypt" className="crypt">
  //     <div id="home-container" className="container">
  //       {formData.map((saved, index) => {
  //         return <div id="home-" className="tracker" key={index}>
  //           <div id="home-coin-row" className="coin-row">
  //             <div className="coin">
  //               <img src={saved.placeholder} alt="" id="home-symbol" className="symbol" />
  //               <h1 id="home-coin-name" className="coin-name">{saved.placeholder}</h1>
  //               <p id="home-ticker" className="ticker">{saved.placeholder}</p>
  //             </div>
  //             <div id="home-coin-details" className="coin-details">
  //               <p id="home-coin-price" className="coin-price">£{saved.placeholder}</p>
  //               <p id="home-volume" className="volume">£{saved.placeholder}</p>
  //               <p id="home-market-cap" className="market-cap">Mkt Cap: £{saved.placeholder}</p>
  //             </div>
  //           </div>
  //         </div>

  //       })}
  //     </div>
  //   </section>

  // </div>
}

export default MySavedItems