import React, { useState } from 'react'
import axios from 'axios'
import { getUserId, isCreator } from '../lib/auth'

const Login = (props) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    message: ''
  })

  function handleChange(event) {
    const data = {
      ...formData,
      [event.target.name]: event.target.value
    }
    setFormData(data)
  }

  function handleSubmit(event) {
    event.preventDefault()

    axios.post('/api/login', formData)
      .then(resp => {
        if (!resp.data.message) {
          setErrors(resp.data)
        } else {
          localStorage.setItem('token', resp.data.token)
          props.history.push('/')
        }
      })
  }
  console.log(props)


  return <div className="background-image-login">

    <div className="container container-custom">
      <form
        onSubmit={handleSubmit}
      >
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
        </div>

        {errors.message && <p id="error" style={{ color: 'black' }}>
          {errors.message}
        </p>}

        <button
          className="btn btn-dark">
          Login
      </button>

      </form>
    </div>
  </div>
}

export default Login