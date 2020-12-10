import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/auth'


const SingleAccount = (props) => {

  const [formData, setFormData] = useState({})
  const [text, setText] = useState('')

  const token = localStorage.getItem('token')
  const userId = getUserId(token)

  useEffect(() => {
    axios.get(`/api/customers/${userId}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
      .then((resp) => {
        setFormData(resp.data)
      })
  }, [])

  console.log(token)
  console.log(formData)


  return <div className="section background-image-my-account">
    <h1 className="text-warning title-text-myaccount">Welcome back {formData.username}</h1>
    <div className="row">
      
      <div className="col-sm-6">
        <div className="card card-height">
          <div className="card-body">
            <Link to={`/myaccount/${userId}/orders`}><h5 className="card-title">My Orders</h5></Link>
            <p className="card-text">Keep track of all of your current pending and completed orders, here.</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="card card-height">
          <div className="card-body">
            <Link to={`/myaccount/${userId}/saved`}><h5 className="card-title">My Saved Items</h5></Link>
            <p className="card-text">Remeber those items that you loved but were quite ready to buy, come and check them out!</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="card card-height">
          <div className="card-body">
            <Link to={`/myaccount/${userId}/edit`}><h5 className="card-title">My Details</h5></Link>
            <p className="card-text">Come here to update information relating to your login credentials and username.</p>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div className="card card-height">
          <div className="card-body">
            <Link to={`/users/aboutme/${props.match.params.id}`}><h5 className="card-title">Message Hub</h5></Link>
            <p className="card-text">Do you have any burning questions that you'd like to ask? Please do reach out to a member of our dedicated team.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default SingleAccount