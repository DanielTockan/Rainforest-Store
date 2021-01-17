import React, { useState } from 'react'
import axios from 'axios'
import { getUserId, isCreator } from '../lib/auth'

const Login = (props) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState('')

  function handleChange(event) {

    const data = {
      ...formData,
      [event.target.name]: event.target.value
    }
    setFormData(data)
    setErrors('')
  }

  function handleSubmit(event) {
    event.preventDefault()

    axios.post('/api/login', formData)
      .then(resp => {
        if (resp.data.message === 'No user found with this email' || resp.data.message === 'Incorrect password') {
          window.alert(resp.data.message)
        } else {
          localStorage.setItem('token', resp.data.token)
          props.history.push('/')
        }
      })
  }


  return <div className="login-page">

    <div className="container container-custom">


      <form
        onSubmit={handleSubmit}
      >
        <h1 className=" reg" >Welcome back!</h1>
        <h3 className=" reg" >Please provide your login details</h3>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            name="email"
            required />
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            name="password"
            required />
          {errors && <p style={{ color: 'red' }}>{errors}</p>}
        </div>

        {errors.message && <p id="error" style={{ color: 'black' }}>
          {errors.message}
        </p>}

        <button
          className="btn btn-info">
          Login
        </button>

      </form>
    </div>
  </div>

}

export default Login