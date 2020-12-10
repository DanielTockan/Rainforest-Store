import React from 'react'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom'
import './styles/style.scss'

// import Home from './components/Home'
import MyDetails from './components/MyDetails'
import MyOrders from './components/MyOrders'
import MySavedItems from './components/MySavedItems'
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
      <Route exact path="/" component={Products} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/myaccount/:id" component={MyAccount} />
      <Route exact path="/myaccount/:id/edit" component={MyDetails} />
      <Route exact path="/myaccount/:id/saved" component={MySavedItems} />
      <Route exact path="/myaccount/:id/orders" component={MyOrders} />
      <Route exact path="/mycart" component={MyCart} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/products/:id" component={SingleProduct} />
    </Switch>
  </BrowserRouter>
)


export default App