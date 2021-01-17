import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getUserId } from '../lib/auth'

const MyDetails = (props) => {

  const token = localStorage.getItem('token')
  const userId = getUserId(token)

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [currentData, updateCurrentData] = useState({
    username: '',
    email: '',
    password: ''
  })


  const [errors, updateErrors] = useState({
    username: '',
    email: '',
    password: ''
  })

  function handleChange(event) {

    const name = event.target.name

    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }
    const newErrors = {
      ...errors,
      [name]: ''
    }

    updateFormData(data)
    updateErrors(newErrors)

  }

  useEffect(() => {
    axios.get(`/api/customers/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((resp) => {
        updateCurrentData(resp.data)
      })
  }, [])

  function handleUpdate(event) {

    event.preventDefault()

    const token = localStorage.getItem('token')
    axios.put(`/api/customers/${userId}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })


      .then(res => {
        props.history.push(`/myaccount/${userId}`)
      })

  }

  return <div className="register-page">
    <div className="container container-custom">

      <form
        onSubmit={handleUpdate}>
        <h1 className="" >Update your username here...</h1>
        <h3 className="text-danger font-weight-bold">Remember to input your email adress and password so that we know it is you.</h3>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={formData.username}
            placeholder="Username"
            name="username"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            className="form-control"
            onChange={handleChange}
            value={formData.email}
            placeholder="Email"
            name="email"
            required
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            onChange={handleChange}
            value={formData.password}
            placeholder="Password"
            name="password"
            required
          />
          {/* 
    {errors.password && <p id="error" style={{ color: 'red' }}>
      {`There was a problem with your ${errors.password.path}`}
    </p>} */}

        </div>
        <button className="btn btn-success wide">Submit</button>
      </form>

    </div>

  </div>
}

export default MyDetails