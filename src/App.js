import logo from './logo.svg'
import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignIn from './pages/SignIn'
import User from './pages/User'
import { useSelector, useDispatch } from 'react-redux'
import { selectLogin } from './utils/selector'
import { login } from './features/login'

function App() {
  // const token = useSelector((state) => state.user)
  //ajouter ca dans un use effect
  const token = localStorage.getItem('token')
  const dispatch = useDispatch()
  // if (token) {
  //   dispatch(login())
  // }
  useEffect(() => {
    if (token) {
      dispatch(login())
    }
  }, [dispatch, token])

  const userIsLogin = useSelector(selectLogin)

  if (!userIsLogin) {
    return (
      <React.StrictMode>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
        <Footer />
      </React.StrictMode>
    )
  }
  return (
    <React.StrictMode>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<User />} />
        </Routes>
      </Router>
      <Footer />
    </React.StrictMode>
  )
}

export default App
