import React from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import './styles/style.scss'

import Home from './components/Home'
import MyAccount from './components/MyAccount'
import MyCart from './components/MyCart'
import Navbar from './components/Navbar'
import Products from './components/Products'
import Register from './components/Register'
import SingleProduct from './components/SingleProduct'
import Login from './components/Login'

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/myaccount" component={MyAccount} />
      <Route exact path="/mycart" component={MyCart} />
      <Route exact path="/products" component={Products} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/products/singleproduct" component={SingleProduct} />
    </Switch>
  </BrowserRouter>
)


export default App