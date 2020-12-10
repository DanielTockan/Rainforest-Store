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

  console.log(currentData)

  function handleUpdate(event) {

    event.preventDefault()

    const token = localStorage.getItem('token')
    axios.put(`/api/customers/${userId}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })


      .then(res => {
        console.log(res.data)
        props.history.push(`/myaccount/${userId}`)
      })

  }

  console.log(formData)
  console.log(token)

  // function handleImageUpload(event) {
  //   event.preventDefault()

  //   const token = localStorage.getItem('token')

  //   window.cloudinary.createUploadWidget(
  //     {
  //       cloudName: 'dzt94',
  //       uploadPreset: 'skiresortapp',
  //       cropping: true
  //     },
  //     (err, result) => {
  //       if (result.event !== 'success') {
  //         return
  //       }
  //       axios.put(`/api/users/${props.match.params.id}`, { image: result.info.secure_url }, {
  //         headers: { Authorization: `Bearer ${token}` }
  //       })
  //         .then((res) => updateFormData(res.data))
  //     }
  //   ).open()
  // }

  // console.log(formData)

  return <div className="container container-custom">

    <form onSubmit={handleUpdate}>
      <div className="form-group">
        <input
          className="form-control"
          placeholder="Username"
          type="text"
          onChange={handleChange}
          value={formData.username}
          name="username"
          required
        />

      </div>

      <div className="form-group">
        <input
          className="form-control"
          placeholder="Email"
          type="text"
          onChange={handleChange}
          value={formData.email}
          name="email"
          required
        />

      </div>

      <div className="form-group">
        <input
          className="form-control"
          placeholder="Password"
          type="Password"
          onChange={handleChange}
          value={formData.password}
          name="password"
          required
        />

      </div>

      <div className="form-group">
        <button className="btn btn-primary">Submit Changes</button>
      </div>
    </form>

  </div>
}

export default MyDetails