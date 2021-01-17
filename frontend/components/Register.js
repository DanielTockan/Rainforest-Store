import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = (props) => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
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
    setFormData(data)
    setErrors(newErrors)
  }

  function handleSubmit(event) {
    event.preventDefault()

    axios.post('api/register', formData)
      .then(resp => {
        if (resp.data.errors) {
          setErrors(resp.data.errors)
        } else {
          props.history.push('/login')
        }
      })
  }

  return <div className="register-page">
    <div className="container container-custom">

      <form
        onSubmit={handleSubmit}>
        <h1 className="" >Join Rainforest for your online shopping</h1>
        <h3 className="text-warning">Enjoy a selection of thousands of products, as well as 10% off your first purchase!</h3>
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
        <button className="btn btn-success wide">Join us!</button>
      </form>

    </div>
  </div>
}

export default Register