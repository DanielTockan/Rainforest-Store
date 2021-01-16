import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const Navbar = (props) => {

  const token = localStorage.getItem('token')
  if (token) {
    const parsedToken = JSON.parse(atob(token.split('.')[1]))

    var finalId = parsedToken.sub
  }

  function handleLogout() {
    localStorage.removeItem('token')
    props.history.push('/products')
  }

  console.log(finalId)

  return <div className="navbar-component">
    <nav className="navbar navbar-expand-md navbar-dark nav-background fixed-top">

      <Link to="/" className="navbar-brand nav-brand text-warning">RainForest Store</Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse text-right" id="navbarResponsive">
        <ul className="navbar-nav ml-auto">

          {!localStorage.getItem('token') && <li className="nav-item ">
            <Link to="/Login" className="nav-link">Sign In</Link>
          </li>}

          {!localStorage.getItem('token') && <li className="nav-item">
            <Link to="/register" className="nav-link">Sign Up</Link>
          </li>}

          {token && <li className="nav-item">
            <Link to={`/myaccount/${finalId}`} className="nav-link">My Account</Link>
          </li>}

          {token && <li className="nav-item">
            <Link to="/mycart" className="nav-link">My Cart</Link>
          </li>}

          {localStorage.getItem('token') && <li className="nav-item">
            <Link to="/" className="nav-link nav-contact"
              onClick={handleLogout}
            >Logout</Link>
          </li>}


        </ul>
      </div>

    </nav>
  </div>
}

export default withRouter(Navbar)