import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import SignIn from './pages/SignIn'
import User from './pages/User'
import Home from './pages/Home'
import store from './utils/store'
import { Provider, useSelector } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  //   <Router>
  //     <Header />
  //     <Routes>
  //       <Route exact path="/" element={<App />} />
  //       <Route path="/sign-in" element={<SignIn />} />
  //       <Route path="/user" element={<User />} />
  //     </Routes>
  //   </Router>
  //   <Footer />
  // </React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
